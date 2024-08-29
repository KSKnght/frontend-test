import Image from "next/image";
import Navbar from "./components/Navbar";
import prisma from "@/lib/db";


export default async function Home() {
  

  return (
    <main>
      <div className="flex flex-col">
        <Navbar />
      </div>
      
    </main>
  );
}
