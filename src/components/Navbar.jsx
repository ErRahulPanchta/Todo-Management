import React from 'react'

const Navbar = () => {
  return (
  <nav className="flex justify-between bg-slate-900 text-white py2 w-[100vw] mx-auto">
    <div className="logo font-bold text-xl mx-8 py-1">
        iTask
    </div>
    <ul className="flex gap-8 py-2 mx-8">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>      
    </ul>
  </nav>
  )
}

export default Navbar