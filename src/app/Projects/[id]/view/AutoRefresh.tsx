'use client';

import React, { useEffect } from 'react'
import { supabase } from '@/lib/supabase';
import { reloadPage } from '@/actionsSupabase/reload';

const AutoRefresh = ({id}) => {
    const link = '/Projects/'+id+'/view';
    useEffect(() => {
        const channel = supabase.channel("realtime project").on("postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "*",
          },
          async (payload) => {
           await reloadPage(link);

          }
        )
        .subscribe();
    
        return () => {
          supabase.removeChannel(channel)
        }
      }, [supabase])

    // useEffect(() => {
    //     const channel = supabase.channel("realtime project").on("postgres_changes",
    //       {
    //         event: "*",
    //         schema: "public",
    //         table: "phase",
    //       },
    //       async (payload) => {
    //        await reloadPage(link);

    //       }
    //     )
    //     .subscribe();
    
    //     return () => {
    //       supabase.removeChannel(channel)
    //     }
    //   }, [supabase])

    // useEffect(() => {
    //     const channel = supabase.channel("realtime project").on("postgres_changes",
    //       {
    //         event: "*",
    //         schema: "public",
    //         table: "phaseTasks",
    //       },
    //       async (payload) => {
    //        await reloadPage(link);

    //       }
    //     )
    //     .subscribe();
    
    //     return () => {
    //       supabase.removeChannel(channel)
    //     }
    //   }, [supabase])

    // useEffect(() => {
    //     const channel = supabase.channel("realtime project").on("postgres_changes",
    //       {
    //         event: "*",
    //         schema: "public",
    //         table: "_phaseTaskstosubCon",
    //       },
    //       async (payload) => {
    //        await reloadPage(link);

    //       }
    //     )
    //     .subscribe();
    
    //     return () => {
    //       supabase.removeChannel(channel)
    //     }
    //   }, [supabase])

    // useEffect(() => {
    //     const channel = supabase.channel("realtime project").on("postgres_changes",
    //       {
    //         event: "*",
    //         schema: "public",
    //         table: "taskMat",
    //       },
    //       async (payload) => {
    //        await reloadPage(link);

    //       }
    //     )
    //     .subscribe();
    
    //     return () => {
    //       supabase.removeChannel(channel)
    //     }
    //   }, [supabase])

  return (
    <div>

    </div>
  )
}

export default AutoRefresh