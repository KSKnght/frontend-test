import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
// import ClientsCard from '../components/Cards/ClientsCard'
import { getClients } from '@/actionsPrisma/read';
import Link from 'next/link';
import Modal from '../components/Modal';
import { createClient } from '@/actions/Create';
import { revalidatePath } from 'next/cache';
import EditClient from '../components/Modals/EditClient'
import { IoIosAddCircle } from 'react-icons/io';
import { MdEdit } from "react-icons/md";









type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

const AddClient = async () => {
  return ( 
    <form action={async (e) =>{'use server'; createClient(e); revalidatePath('/Clients')}}>
      <div className='flex flex-row justify-evenly space-x-3'>
        <div>
          <p className='text-xs font-bold flex mb-1'>First Name</p>
          <input className='h-6 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                type="text" name='firstname' placeholder=''/>
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Middle Name</p>
          <input className='h-6 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                type="text" name='middlename' placeholder=''/>
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Last Name</p>
          <input className='h-6 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                type="text" name='lastname' placeholder=''/>
        </div>
      </div>
      
      <div className='flex flex-row justify-between space-x-3 mt-3'>
        <div>
          <p className='text-xs font-bold flex mb-1'>Contact Number</p>
          <input  className='h-6 w-72 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                type="text" name='contactNum' placeholder=''/>
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Email Address</p>
          <input  className='h-6 w-72 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                type="text" name='emailAdd' placeholder='e.g. user@email.com'/>
        </div>
      </div>

      <button className='mt-8 text-sm px-4 py-1 bg-pink-600 rounded-lg text-white' type='submit'>Create Client</button>
    </form>
  )

}

const page = async ({searchParams} : SearchParamProps) => {
  const data = await getClients();
  const show = searchParams?.show;
  const edit = searchParams?.edit;
  return (
    <main className='flex'>
      {show && <Modal returnLink={'/Clients'} name={'Add Client'}>
          <AddClient />
        </Modal>}
      {edit && <Modal returnLink={'/Clients'} name={'Edit Client'}>
          <EditClient data={edit} />
        </Modal>}
      <div>
        <Navbar />
      </div>
      <div className='pt-2 h-screen'>
        <div className='pr-20 mb-6 mt-4 space-x-56 flex justify-between'>
          <h1 className='px-10 text-5xl font-bold mt-3 text-pink-600'>CLIENTS</h1>
          <Link className='flex flex-row w-32 rounded-lg px-3 py-1 mt-6 -translate-y-2 text-white bg-pink-600' href={'/Clients/?show=true'}>
            <IoIosAddCircle className='mt-1 mr-1'/>
            Add Client
          </Link>
        </div>
        <Suspense>
          <div className='px-8'>
            <table className='px-8 table-fixed w-full'>
              <thead className='border-b-2 border-slate-200 text-center h-10'>
                <tr className='text-pink-600'>
                  <th>Client Name</th>
                  <th>Email Address</th>
                  <th>Contact Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className=''>
                {data.map((data, i) => {
                  // return <ClientsCard data={data} key={i}/>
                  return (
                    <tr className='text-center h-8' key={i}>
                    <td>
                        {data.lastname + ' ' + data.firstname + ' ' + data.middlename}
                    </td>
                    <td>
                        {data.emailAdd}
                    </td>
                    <td>
                        {data.contactNum}
                    </td>
                    <td>
                      <Link className='hover:text-pink-600 hover:font-bold transition-all ease-out flex flex-row text-sm' href={'/Clients/?edit='+data.id}>
                        <MdEdit className='mt-1 ml-10 mr-1'/>
                        <p >Edit</p>
                      </Link>
                    </td>
                </tr> )
                })}
              </tbody>
            </table>
          </div>


          <div>

          </div>
            



        </Suspense>
      </div>
    </main>
  )
}

export default page