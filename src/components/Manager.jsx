import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([])
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, [])
  const copyText = (text) => {
    toast(`🦄 ${text} Copied to Clipboard!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      });
    navigator.clipboard.writeText(text)
  }
  

  const showpassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/eye-slash-solid.svg")) {
      ref.current.src = "icons/eye-solid.svg"
      passwordRef.current.type = "password"
    } else {
      ref.current.src = "icons/eye-slash-solid.svg"
      passwordRef.current.type = "text"
    }

  }
  const savePassword = () => {
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
    console.log([...passwordArray, {...form, id: uuidv4()}])
    setform({ site: "", username: "", password: "" })
    toast("🦄 Password saved successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      });
  }
  const deletePassword = (id) => {
    let ask = confirm("Do you really want to delete it?")
    if(ask){
      toast("🦄 Password deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      setPasswordArray(passwordArray.filter(item => item.id !== id ))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id )))
    }
  }
  const editPassword = (id) => {
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item => item.id !== id ))
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <><ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition="Bounce"/>
    {/* Same as */}
    <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-300 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="container h-atuo w-atuo transform bg-green-300 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">


      <div className="mycontainer">
        <h1 className='text-4xl font-bold text-center'> <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
        </h1>
        <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>
        <div className="py-1 flex flex-col p-4 items-center text-black">
          <input onChange={handleChange} name='site' value={form.site} className='border rounded-full border-green-500 w-full p-4 py-1' type="text" placeholder='Enter Website URL' />
          <div className="flex w-full p-4 justify-between gap-8">
            <input onChange={handleChange} name='username' value={form.username} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" placeholder='Enter user name' />
            <div className="relative">
              <input ref={passwordRef} onChange={handleChange} name='password' value={form.password} className='rounded-full border border-green-500 w-full p-4 py-1' type="password" placeholder='Enter Password' />
              <span className="absolute top-2 right-2 cursor-pointer" onClick={showpassword}>
                <img ref={ref} className='' width={20} src="icons/eye-solid.svg" alt="img" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='font-bold text-xl flex justify-center items-center gap-2 bg-green-400 rounded-full w-fit px-4 py-2 hover:bg-green-300 border border-green-900'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && <table className='table-auto w-full rounded-md overflow-hidden'>
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-green-200'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex justify-center items-center gap-1 '>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div><img width={20} src="icons/copy-solid.svg" alt="copy-img" onClick={()=>{copyText(item.site)}}/></div>
                    </div>
                  </td>
                  <td className=' py-2 border border-white text-center'>
                    <div className='flex justify-center items-center gap-1'>
                      <span>{item.username}</span>
                      <div><img width={20} src="icons/copy-solid.svg" alt="copy-img" onClick={()=>{copyText(item.username)}}/></div>
                    </div>
                  </td>
                  <td className='py-2 border border-white text-center'>
                    <div className='flex justify-center items-center gap-1'>
                      <span>{item.password}</span>
                      <div><img width={20} src="icons/copy-solid.svg" alt="copy-img" onClick={()=>{copyText(item.password)}}/></div>
                    </div>
                  </td>
                  <td className='flex justify-center items-center gap-3 py-2 border border-white text-center'>
                    <span className=''>
                      <img onClick={()=>{editPassword(item.id)}} width={20} src="icons/pen-to-square-solid.svg" alt="edit" />
                    </span>                
                    <span className=''>
                      <img onClick={()=>{deletePassword(item.id)}} width={20} src="icons/trash-solid.svg" alt="delete" />
                    </span>
                  </td>

                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
      </div>
    </>
  )
}
export default Manager
