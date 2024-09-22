'use client';

import Link from 'next/link';
import React from 'react'

const ClientsCard = ({data}) => {
  return (
    <div className=' bg-slate-400 m-1 p-4 flex flex-row'>
        <h1>
            {data.lastname + ' ' + data.firstname + ' ' + data.middlename}
        </h1>
        <h2>
            {data.emailAdd}
        </h2>
        <h2>
            {data.contactNum}
        </h2>
        <Link href={'/Clients/?edit='+data.id}>Edit</Link>
    </div>
  )
}

export default ClientsCard