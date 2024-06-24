import React from 'react'
const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-around items-center px-4 h-14 py-5">

        <div className="logo font-bold text-2xl">
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>

        </div>
        <ul>
          <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul>
        <button className='flex justify-center h-10 w-32 items-center gap-2 hover:bg-green-700  hover:border-black hover:rounded-full'>
          <img width={30} src="icons/github-alt.svg" alt="github" />
          <span className='font-bold'>GitHub</span>
        </button>
      </div>

    </nav>
  )
}

export default Navbar
