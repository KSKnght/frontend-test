'use server';
import { supabase } from "@/lib/supabase";

export async function duplicateClientCheck(first, last, middle, email, contact) {
    const { data, error } = await supabase
      .rpc('duplicate_client_check', {
        first,
        last,
        middle,
        email,
        contact,
      });
  
    if (error) {
      console.error('Error calling duplicate_client_check:', error);
      return { error: error.message };
    }
  
    return data;
  }