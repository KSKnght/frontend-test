DECLARE
    -- Variables for phase and project status
    task RECORD;
    phase_status "progessField";
    project_status "progessField";
    complete_phase_count INT;
    not_started_phase_count INT;
BEGIN
    -- First, update the status of phaseTasks based on progress and deadline
    FOR task IN
        SELECT "id", "deadline", "progress", "phaseID", "status"
        FROM "phaseTasks"
        WHERE "isDeleted" = FALSE
    LOOP
        -- If progress is TRUE, mark the phaseTask as COMPLETED regardless of the deadline
        IF task."progress" = TRUE THEN
            UPDATE "phaseTasks"
            SET "status" = 'COMPLETED'
            WHERE "id" = task."id";
        
        -- If progress is FALSE and the task is overdue, mark it as OVERDUE
        ELSIF task."progress" = FALSE AND task."deadline" < NOW() THEN
            UPDATE "phaseTasks"
            SET "status" = 'OVERDUE'
            WHERE "id" = task."id";
        END IF;
    END LOOP;
    
    -- Now, update the status of each parent phase based on its tasks
    FOR task IN
        SELECT "phaseID"
        FROM "phaseTasks"
        WHERE "isDeleted" = FALSE
        GROUP BY "phaseID"
    LOOP
        -- Calculate the status of the phase based on its task statuses and progress
        SELECT 
            CASE 
                -- If any task is overdue, phase is OVERDUE
                WHEN EXISTS (SELECT 1 FROM "phaseTasks" WHERE "phaseID" = task."phaseID" AND "status" = 'OVERDUE' AND "isDeleted" = FALSE) THEN 'OVERDUE'
                -- If all tasks are completed, phase is COMPLETE
                WHEN NOT EXISTS (SELECT 1 FROM "phaseTasks" WHERE "phaseID" = task."phaseID" AND "progress" = FALSE AND "isDeleted" = FALSE) THEN 'COMPLETE'
                -- If some tasks are in progress or incomplete, phase is IN_PROGRESS
                WHEN EXISTS (SELECT 1 FROM "phaseTasks" WHERE "phaseID" = task."phaseID" AND "progress" = TRUE) 
                  AND EXISTS (SELECT 1 FROM "phaseTasks" WHERE "phaseID" = task."phaseID" AND "progress" = FALSE) THEN 'IN_PROGRESS'
                ELSE 'NOT_STARTED'
            END
        INTO phase_status
        FROM "phaseTasks"
        WHERE "phaseID" = task."phaseID"
        LIMIT 1;
        
        -- Update the phase status based on the calculated status
        UPDATE "phase"
        SET "progress" = phase_status
        WHERE "id" = task."phaseID";
    END LOOP;

    -- Now, update the status of the parent project based on the statuses of its phases
 -- Now, update the status of the parent project based on the statuses of its phases
    FOR task IN
        SELECT "projectID"
        FROM "phase"
        WHERE "isDeleted" = FALSE
        GROUP BY "projectID"
    LOOP
        -- Calculate the counts for COMPLETE and NOT_STARTED phases
        SELECT COUNT(*) INTO complete_phase_count
        FROM "phase"
        WHERE "projectID" = task."projectID" AND "progress" = 'COMPLETE' AND "isDeleted" = FALSE;
        
        SELECT COUNT(*) INTO not_started_phase_count
        FROM "phase"
        WHERE "projectID" = task."projectID" AND "progress" = 'NOT_STARTED' AND "isDeleted" = FALSE;
        
        -- Determine project status based on the phases
        SELECT 
            CASE 
                -- If any phase is overdue, project is OVERDUE
                WHEN EXISTS (SELECT 1 FROM "phase" WHERE "projectID" = task."projectID" AND "progress" = 'OVERDUE' AND "isDeleted" = FALSE) THEN 'OVERDUE'
                -- If both COMPLETE and NOT_STARTED phases exist, project is IN_PROGRESS
                WHEN complete_phase_count > 0 AND not_started_phase_count > 0 THEN 'IN_PROGRESS'
                -- If all phases are COMPLETE, project is COMPLETE
                WHEN NOT EXISTS (SELECT 1 FROM "phase" WHERE "projectID" = task."projectID" AND "progress" != 'COMPLETE' AND "isDeleted" = FALSE) THEN 'COMPLETE'
                -- If any phase is IN_PROGRESS, project is IN_PROGRESS
                WHEN EXISTS (SELECT 1 FROM "phase" WHERE "projectID" = task."projectID" AND "progress" = 'IN_PROGRESS' AND "isDeleted" = FALSE) THEN 'IN_PROGRESS'
                -- If all phases are NOT_STARTED, project is NOT_STARTED
                ELSE 'NOT_STARTED'
            END
        INTO project_status
        FROM "phase"
        WHERE "projectID" = task."projectID"
        LIMIT 1;

        -- Update the project status based on the calculated status
        UPDATE "project"
        SET "progress" = project_status
        WHERE "id" = task."projectID";
    END LOOP;

END; $$ LANGUAGE plpgsql;