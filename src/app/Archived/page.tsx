import { getClients, getProjectsArchived } from '@/actionsSupabase/read';
import Navbar from '../components/Sidebar';
import Link from 'next/link';
import Modal from '../components/Modal';
import { EditProject} from '../components/Modals/crudForms';
import ProjectsList from '../components/ProjectsList';
import { HiDocumentText } from "react-icons/hi2";
import { FaFilter, FaTimes } from "react-icons/fa"; // Import FaTimes for the "X" icon
import { HiPlusCircle } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddProjectForm from '../components/Modals/AddProjectForm';
import { IoArchiveSharp } from "react-icons/io5";
import { ToastContainer } from 'react-toastify';

export const revalidate = 0;

type SearchParamProps = {
    searchParams: { search?: string; show?: string; edit?: string };
};

export default async function ProjectsPage({ searchParams }: SearchParamProps) {
    const searchTerm = searchParams.search || ''; // Get the search term from URL parameters
    const display = await getProjectsArchived(); // Fetch all projects
    
    // Filter projects based on search term
    const filteredProjects = (display ?? []).filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
        <main className='flex'>
            <div>
                <Navbar />
            </div>
            <div className='h-screen w-full'>
                <div className='mb-5 space-x-56 flex justify-between border-b py-5'>
                    <div className='flex flex-row ml-10 -translate-y-1'>
                        <IoArchiveSharp className='w-8 h-8 mr-3 translate-y-[1rem] text-pink-600' />
                        <h1 className='text-4xl font-black mt-3 text-pink-600'>ARCHIVE</h1>
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
                    </div>
                </div>

                <ProjectsList ProjectsData={filteredProjects ?? []} />
                <ToastContainer position='bottom-right'/>
            </div>
        </main>
    );
}
