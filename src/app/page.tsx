import Image from "next/image";
import Navbar from "./components/Sidebar";
import prisma from "@/lib/db";
import { redirect } from "next/dist/client/components/navigation";


export default async function Home() {
  redirect('/Projects');  

  return (
    <main className='flex flex-row'>
      <div className="flex flex-col">
      </div>
      
    </main>
  );
}
