import React from 'react';
import { getClients } from '@/actionsSupabase/read';
import ClientsPage from './ClientsPage'

export const revalidate = 0

// Fetch data and render the main component
const page = async ({ searchParams }: { searchParams: Record<string, string> | null | undefined }) => {
  const clients = await getClients();
  return <ClientsPage clients={clients} searchParams={searchParams} />;
}

export default page;
