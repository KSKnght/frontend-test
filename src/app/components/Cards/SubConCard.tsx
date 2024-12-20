'use client'
import React from 'react'

const SubConCard = ({data}) => {
  return (
    <div 
    className='text-xs h-6 content-center justify-start bg-slate-100 hover:bg-slate-200' 
    onClick={e => {
        const name = document.getElementById('clientName') as HTMLInputElement;
        name.value = data.Name;
    }}>
        {data.Name}
    </div>
  )
}

export default SubConCard