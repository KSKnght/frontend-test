import { getProjects } from '@/actionsSupabase/read';
import Navbar from '../components/Sidebar';
import Link from 'next/link';
import Modal from '../components/Modal';
import EditProject from '../components/Modals/EditProject';
import ProjectsList from '../components/ProjectsList';
import { HiDocumentText } from "react-icons/hi2";
import { FaFilter, FaTimes } from "react-icons/fa"; // Import FaTimes for the "X" icon
import { HiPlusCircle } from "react-icons/hi";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { supabase } from '@/lib/supabase'
import ProjectsList from '../components/ProjectsList'



type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
  };

const AddProject = async () => {
    const clients = await getClients()

    return (
        <form action={async (e) => {'use server'; await createProject(e); redirect('/Projects');}}>
            <div className='flex flex-row justify-between space-x-3'>
                <div className="grid w-full gap-1.5">
                    <Label className='font-bold text-xs flex'>Project Name</Label>
                    <Input type='text' name='name' />
                </div>
                <div>
                    <p className='subHeader'>Project Type</p>
                    <select className='inputSubHeader inputSubHeader:focus w-[10rem]'
                        defaultValue={'Select'} name='type'>
                            <option value={'Select'} disabled={true}>Select type</option>
                            <option value={'BUILD'}>Build</option>
                            <option value={'DESIGN_BUILD'}>Design + Build</option>
                            <option value={'DESIGN'}>Design</option>
                    </select>
                </div>
                <div>
                    <p className='subHeader'>Start Date</p>
                    <input className='inputSubHeader inputSubHeader:focus w-[10rem]' type="date" name='startDate'/>
                </div>
            </div>
            
            <div className='flex flex-row justify-between space-x-3 mt-3'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className='font-bold text-xs flex'>Project Address</Label>
                    <Input type='text' name='address' className='w-80' />
                </div>
                <div>
                    <p className='subHeader'>Client</p>
                    <select className='inputSubHeader inputSubHeader:focus w-[10rem]' defaultValue={'Select'} name='id'>
                        <option value={'Select'} disabled={true}>Select Client</option>
                        {clients.map((clients, i) => {
                            return <option key={i} value={clients.id}>{clients.lastname + ', ' + clients.firstname+ ' ' + clients.middlename}</option>
                        })}
                    </select>
                </div>
                <div>
                    <p className='subHeader'>End Date</p>
                    <input className='inputSubHeader inputSubHeader:focus w-[10rem]' type="date" name='endDate'/>
                </div>
            </div>
            
            <button className='submitButton' name='submit' type='submit'>
                Create Project
            </button>
        </form>
    )
}


const page = async ({searchParams} : SearchParamProps) => {
    const display = await getProjects();
    const show = searchParams?.show;
    const edit = searchParams?.edit;
    

 
  
  return (
        <main className='flex'>
            {showModal && (
                <Modal returnLink={'/Projects'} name={'Add Project'}>
                    <AddProjectForm />
                </Modal>
            )}
            {editModal && (
                <Modal returnLink={'/Projects'} name={'Edit Project'}>
                    <EditProject data={editModal} />
                </Modal>
            )}
            <div>
                <Navbar />
            </div>
            <div className='h-screen w-full'>
                <div className='mb-5 space-x-56 flex justify-between border-b py-5'>
                    <div className='flex flex-row ml-10 -translate-y-1'>
                        <HiDocumentText className='w-8 h-8 mr-3 translate-y-[1rem] text-pink-600' />
                        <h1 className='text-4xl font-black mt-3 text-pink-600'>PROJECTS</h1>
                    </div>
                    <div className='flex flex-row space-x-4 items-center pr-11'>
                        <div className='flex flex-row space-x-1 items-center'>
                            <div>
                                <button className='p-[13px] bg-slate-100 hover:bg-slate-200 rounded-lg'>
                                    <FaFilter className='text-slate-600' />
                                </button>
                            </div>

                            <div className="relative">
                                <form method="GET" action="/Projects" className="flex items-center">
                                    <Input name="search" placeholder='Search Project...' className='w-[40rem]' defaultValue={searchTerm}/>
                                    {searchTerm && (
                                        <Link
                                            href="/Projects"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            aria-label="Clear search"
                                        >
                                            <FaTimes />
                                        </Link>
                                    )}
                                </form>
                            </div>
                        </div>
                        <Button asChild className='bg-pink-600 hover:bg-pink-700'>
                            <Link href='/Projects/?show=true'>
                                <HiPlusCircle />
                                Create Project
                            </Link>
                        </Button>
                    </div>
                </div>

                <ProjectsList ProjectsData={filteredProjects ?? []} />
                <ToastContainer position='bottom-right'/>
            </div>
        </main>
    );
}
