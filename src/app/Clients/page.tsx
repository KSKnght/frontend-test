import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
import ClientsCard from '../components/Cards/ClientsCard'
import { getClients } from '@/actions/read';
import Link from 'next/link';
import Modal from '../components/Modal';
import { createClient } from '@/actions/Create';
import { revalidatePath } from 'next/cache';
import EditClient from '../components/Modals/EditClient'

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

const AddClient = async () => {
  return ( 
    <form action={async (e) =>{'use server'; createClient(e); revalidatePath('/Clients')}}>
      <input type="text" name='firstname' placeholder='firstname'/>
      <input type="text" name='middlename' placeholder='middlename'/>
      <input type="text" name='lastname' placeholder='lastname'/>
      <input type="text" name='contactNum' placeholder='contact Number'/>
      <input type="text" name='emailAdd' placeholder='email Address'/>
      <button type='submit'>submit</button>
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
      <div>
        <div>
          <Link href={'/Clients/?show=true'}>Add Client</Link>
        </div>
        <Suspense>
          <div className='p-5'>
            <ul>
              {data.map((data, i) => {
                return <li key={i}><ClientsCard data={data}/></li>
              })}
            </ul>
          </div>
        </Suspense>
      </div>
    </main>
  )
}

export default page