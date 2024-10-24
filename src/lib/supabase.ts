import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// const cookieStore = cookies()

// export const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
//     {
//         cookies: {
//           getAll() {
//             return cookieStore.getAll()
//           },
//           setAll(cookiesToSet) {
//             try {
//               cookiesToSet.forEach(({ name, value, options }) =>
//                 cookieStore.set(name, value, options)
//               )
//             } catch {
//               // The `setAll` method was called from a Server Component.
//               // This can be ignored if you have middleware refreshing
//               // user sessions.
//             }
//           },
//         },
//       }
// )

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
)