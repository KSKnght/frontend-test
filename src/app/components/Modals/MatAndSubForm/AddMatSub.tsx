import React, { useState } from 'react'
import MaterialsForm from './MaterialsForm'
import SubForm from './SubForm'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { unit } from '@prisma/client';

const MatList = ({ tasks }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xs font-bold mb-2">Materials List</h3>
      <div className="relative bg-slate-300 h-[21.2rem] flex items-center justify-center">
        {tasks.length ? (
          <div className="h-[21.2rem] overflow-y-auto w-full"> {/* Set fixed height and make it scrollable */}
            {tasks.map((mat, i) => (
              <Table className="w-full table-fixed" key={`mat-list-${i}`}>
                <TableBody>
                  <TableRow className="text-center bg-slate-100 hover:bg-slate-200">
                    <TableCell className="text-xs py-1.5 px-2 leading-tight">{mat.materials.name}</TableCell>
                    <TableCell className="text-xs py-1.5 px-2 leading-tight">{mat.qty + ' ' + mat.unit}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </div>
        ) : (
          <div>
            <div className="w-[16rem] bg-slate-50 h-[21.2rem] flex items-center justify-center">
              <p className="text-xs text-gray-500 italic">No materials added.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const SubConList = ({ subcon }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-xs font-bold mb-2">Subcontractors List</h3>
      <div className="relative bg-slate-300 h-[21.2rem] flex items-center justify-center">
        {subcon.length ? (
          <div className="h-[21.2rem] overflow-y-auto w-full"> {/* Set fixed height and make it scrollable */}
            <ul>
              {subcon.map((sub, i) => (
                <Table className="w-full table-fixed" key={`subcon-list-${i}`}>
                  <TableBody>
                    <TableRow className="text-center bg-slate-100 hover:bg-slate-200">
                      <TableCell className="text-xs py-1.5 px-2 leading-tight">{sub.B.Name}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <div className="w-[16rem] bg-slate-50 h-[21.2rem] flex items-center justify-center">
              <p className="text-xs text-gray-500 italic">No subcontractors added.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



const AddMatSub = async ({data, state, projID, subCon, mat, status, matUsed, subUsed}) => {
  const isActive = (buttonState) => state === buttonState;

  return (
    <div>
        <div className='justify-center space-x-5 mb-2 -translate-y-2'>
            <Link className={`text-xs font-bold py-1 px-3 border rounded-lg ${isActive('Mat') ? 'bg-pink-600 text-white border-pink-600' : 'text-slate-400 border hover:border-slate-500 hover:text-slate-500'}`} href={'/Projects/'+projID+'/view?viewtask='+data+'&state=Mat'}>Materials</Link>
            <Link className={`text-xs font-bold py-1 px-3 border rounded-lg ${isActive('Sub') ? 'bg-pink-600 text-white border-pink-600' : 'text-slate-400 border hover:border-slate-500 hover:text-slate-500'}`} href={'/Projects/'+projID+'/view?viewtask='+data+'&state=Sub'}>Subcontractors</Link>
        </div>
        {status != 'COMPLETED' ? 
        <div>
            {state === 'Mat' && <MaterialsForm materials={mat} taskID={data} projID={projID}/>}
            {state === 'Sub' && <SubForm subCon={subCon} taskID={data} projID={projID}/>}
        </div> 
        : 
        <div>
          {state === 'Mat' && <MatList tasks={matUsed} />}
          {state === 'Sub' && <SubConList subcon={subUsed} />}
        </div>
        }
    </div>
  )
}

export default AddMatSub