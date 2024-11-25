import React from 'react'


const ExtendProject = (data, projID) => {
  return (
    <div>
      <form>
        <div className='flex flex-row space-x-6'>
            <div>
                <p className='text-xs font-bold flex mb-1'>Start Date</p>
                <input type='date' className='`h-6 w-auto flex border focus:outline-pink-600 rounded-lg pl-1 text-sm'></input>
            </div>
            <div>
                <p className='text-xs font-bold flex mb-1'>End Date</p>
                <input type='date' className='`h-6 w-auto flex border focus:outline-pink-600 rounded-lg pl-1 text-sm'></input>
            </div>
        </div>
        <button 
          className={`mt-8 text-sm px-4 py-1 rounded-lg text-white bg-pink-600`}
          type="submit"
          >
            Extend Project
        </button>
      </form>
    </div>
  )
}

export default ExtendProject
