'use server';

import prisma from "../lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// all soft deletes (just updates)

export async function deleteProject(id: Number) {

}

export async function deletePhase(id: Number) {
    
}

export async function deleteMaterials(id: Number) {
    
}