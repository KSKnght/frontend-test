'use server';

import { revalidatePath } from "next/cache";

export async function reloadPage(link: string) {
    revalidatePath(link);
}