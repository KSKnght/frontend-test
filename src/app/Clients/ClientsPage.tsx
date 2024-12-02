'use client';

import React, { useState, Suspense, useEffect }  from 'react'
import Navbar from '../components/Sidebar';
import Link from 'next/link';
import Modal from '../components/Modal';
import AddClientForm from '../components/Modals/AddClientForm';
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
import { HiUser } from "react-icons/hi";
import { reloadPage } from '@/actionsSupabase/reload';
import { supabase } from '@/lib/supabase';


// type SearchParamProps = {
//   show?: boolean;
//   edit?: string;
// };

const ClientsPage = ({ clients, searchParams }: { clients: any[], searchParams: Record<string, string> | null | undefined }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const show = searchParams?.show;
  const edit = searchParams?.edit;

  useEffect(() => {
    const channel = supabase.channel("realtime project").on("postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "client",
      },
      async (payload) => {
       await reloadPage('/Clients');
       await reloadPage('/Clients?show=true');
       await reloadPage('/Clients?edit=true');
      }
    )
    .subscribe();

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])
  

  // Filtered data based on search term
  const filteredClients = clients.filter((client) =>
    `${client.lastname} ${client.firstname} ${client.middlename}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const nameA = `${a.lastname} ${a.firstname}`.toLowerCase();
    const nameB = `${b.lastname} ${b.firstname}`.toLowerCase();
    if (sortOrder === 'asc') {
      return nameA > nameB ? 1 : -1;
    } else {
      return nameA < nameB ? 1 : -1;
    }
  });

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
        <div className='px-[3rem] mb-5 space-x-56 flex justify-between border-b py-3'>
          <div className='flex flex-row -translate-y-1'>
            <HiUser className='w-8 h-8 mr-3 translate-y-[1rem] text-pink-600'/>
            <h1 className='text-4xl font-black mt-3 text-pink-600'>CLIENTS</h1>
          </div>
          <div className='flex flex-row'>
              <div className='px-[3rem] mb-3'>
                <input
                  type='text'
                  placeholder='Search clients...'
                  className='w-[40rem] px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-pink-600'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Link className='flex flex-row w-32 rounded-lg px-3 py-2 mt-5 -translate-y-5 text-white bg-pink-600' href={'/Clients/?show=true'}>
                <IoIosAddCircle className='mt-1 mr-1'/>
                Add Client
              </Link>
          </div>

        </div>
        

        <Suspense>
          <div className='mt-8 px-[3rem] overflow-auto' style={{ maxHeight: 'calc(103vh - 200px)' }}>
            <Table className='w-full table-fixed'>
              <TableCaption>
                {filteredClients.length > 0 
                  ? 'A list of your clients.'
                  : 'No clients matched.'}
              </TableCaption>
              <TableHeader>
                <TableRow className='font-bold text-slate-600 w-[25rem] cursor-pointer'>  
                  <TableHead
                    className="font-bold text-slate-600 w-[25rem] cursor-pointer"
                    onClick={() =>
                      setSortOrder((prevOrder) =>
                        prevOrder === 'asc' ? 'desc' : 'asc'
                      )
                    }
                  >
                    Client Name {sortOrder === 'asc' ? '↑' : '↓'}
                  </TableHead>
                  <TableHead className='font-bold text-slate-600 w-[25rem]'>Email Address</TableHead>
                  <TableHead className='font-bold text-slate-600'>Contact Number</TableHead>
                  <TableHead className='font-bold text-slate-600 text-right'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client, i) => (
                  <TableRow key={i}>
                    <TableCell className='w-[25rem]'>
                      {client.lastname + ', ' + client.firstname + ' ' + client.middlename + '.'}
                    </TableCell>
                    <TableCell>{client.emailAdd}</TableCell>
                    <TableCell>{client.contactNum}</TableCell>
                    <TableCell className='text-left'>
                      <Link className='hover:text-pink-600 transition-all ease-out flex flex-row justify-left text-sm' href={'/Clients/?edit=' + client.id}>
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

export default ClientsPage