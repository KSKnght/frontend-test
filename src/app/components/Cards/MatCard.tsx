'use client'
import React from 'react'

const MatCard = ({data}) => {

  return (
    <div 
    className='text-xs h-6 content-center justify-start bg-slate-100 hover:bg-slate-200'
    onClick={e => {
        const name= document.getElementById('name') as HTMLInputElement;
        const unit = document.getElementById('unit') as HTMLInputElement;
        unit.value = data.unit;
        name.value = data.name;
        
    }}>
        {data.name}
    </div>
  )
}

export default MatCard