import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex w-full justify-between bg-slate-700 py-2 text-white ">

        <div className="logo">
            <span className="font-bold text-xl mx-8 ">iTask</span>
        </div>
      <ul className="flex gap-3 mx-9">
        <li className='cursor-pointer hover:font-bold' >Home</li>
        <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
