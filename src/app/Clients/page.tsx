// src/app/Clients/page.tsx

import React, { Suspense } from 'react';
import Navbar from '../components/Sidebar';
import { getClients } from '@/actionsSupabase/read';
import Link from 'next/link';
import Modal from '../components/Modal';
import AddClientForm from '../components/Modals/AddClientForm'; // Import the new component
import EditClient from '../components/Modals/EditClient';
import { IoIosAddCircle } from 'react-icons/io';
import { MdEdit } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

const page = async ({ searchParams }: SearchParamProps) => {
  const data = await getClients();
  const show = searchParams?.show;
  const edit = searchParams?.edit;

  return (
    <main className='flex'>
      {show && <Modal returnLink={'/Clients'} name={'Add Client'}>
          <AddClientForm />
        </Modal>}
      {edit && <Modal returnLink={'/Clients'} name={'Edit Client'}>
          <EditClient data={edit} />
        </Modal>}
      <div>
        <Navbar />
      </div>
      <div className='pt-2 h-screen'>
        <div className='px-[3rem] mb-6 mt-4 space-x-56 flex justify-between'>
          <h1 className='text-5xl font-bold mt-3 text-pink-600'>CLIENTS</h1>
          <Link className='flex flex-row w-32 rounded-lg px-3 py-1 mt-6 -translate-y-2 text-white bg-pink-600' href={'/Clients/?show=true'}>
            <IoIosAddCircle className='mt-1 mr-1'/>
            Add Client
          </Link>
        </div>
        <Suspense>
          <div className='mt-8 px-[3rem]'>
            <Table className='w-full table-fixed'>
              <TableCaption>A list of your clients.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='font-bold text-slate-600 w-[25rem]'>Client Name</TableHead>
                  <TableHead className='font-bold text-slate-600 w-[25rem]'>Email Address</TableHead>
                  <TableHead className='font-bold text-slate-600'>Contact Number</TableHead>
                  <TableHead className='font-bold text-slate-600 text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((client, i) => (
                  <TableRow key={i}>
                    <TableCell className='w-[25rem]'>
                      {client.lastname + ' ' + client.firstname + ' ' + client.middlename}
                    </TableCell>
                    <TableCell>{client.emailAdd}</TableCell>
                    <TableCell>{client.contactNum}</TableCell>
                    <TableCell className='text-right'>
                      <Link className='hover:text-pink-600 transition-all ease-out flex flex-row justify-end text-sm' href={'/Clients/?edit=' + client.id}>
                          <MdEdit className='mt-1 ml-10 mr-1'/>
                          <p>Edit</p>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Suspense>
      </div>
    </main>
  );
}

export default page;
