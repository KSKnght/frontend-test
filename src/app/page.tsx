import Image from "next/image";
import Navbar from "./components/Sidebar";
import prisma from "@/lib/db";


export default async function Home() {
  

  return (
    <main className='flex flex-row'>
      <div className="flex flex-col">
        <Navbar />
      </div>
      
    </main>
  );
}
