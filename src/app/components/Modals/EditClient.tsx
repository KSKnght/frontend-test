import { revalidatePath } from 'next/cache';
import { updateClient } from '@/actions/Update';
import { showClient } from '@/actions/read';
import React from 'react'

const EditClient = async ({data}) => {
  const client = await showClient(Number(data));
  return (
    <form action={async (e) =>{'use server'; updateClient(e, client.id); revalidatePath('/Clients')}}>
      <input type="text" name='firstname' placeholder='firstname' defaultValue={client.firstname}/>
      <input type="text" name='middlename' placeholder='middlename' defaultValue={client.middlename}/>
      <input type="text" name='lastname' placeholder='lastname' defaultValue={client.lastname}/>
      <input type="text" name='contactNum' placeholder='contact Number' defaultValue={client.contactNum}/>
      <input type="text" name='emailAdd' placeholder='email Address' defaultValue={client.emailAdd}/>
      <button type='submit'>save changes</button>
    </form>
  )
}

export default EditClient