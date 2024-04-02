'use client';
import Link from 'next/link';

import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"

function NavBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-slate-200 shadow-md dark:bg-gray-800">
      <Link className="flex items-center gap-2" href="#">
        <span className="text-lg font-semibold">Challenges</span>
      </Link>
      <div className="hidden md:flex gap-4">
        <Link 
          className="text-lg font-medium bg-textViolet text-white hover:bg-white border hover:text-textViolet" href="#">
          <Button>Logout</Button>
        </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid w-[200px] p-4">
            <Link className="text-lg font-medium hover:underline underline-offset-4" href="#">
              Logout
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}



// const NavBar = () => {
//   return (
//     <div className="navbar bg-slate-200 shadow-md">
//       <div className="flex-1 text-black">
//         <Link href={"/"} className="btn btn-ghost text-xl">Dashboard</Link>
//       </div>
//       <div className="flex-none">
//           <div role="button" className="btn btn-primary text-white">
//             Logout
//           </div>
//       </div>
//   </div>
//   );
// };

export default NavBar;
