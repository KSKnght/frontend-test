'use client';

import { useRouter } from 'next/navigation';
import React, { Fragment } from 'react'

const Button = () => {
    const router = useRouter()
  return (
    <Fragment>
      <div>
        <button onClick={()=> {}}>Back</button>
      </div>
      <div>
        
      </div>
    </Fragment>
  )
}

export default Button