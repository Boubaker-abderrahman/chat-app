import {motion} from 'framer-motion'
import Input from '../../component/Input'
import { Mail, Lock } from "lucide-react";
import { useState } from 'react';
import useAuthStore from '../../store/auth.store';
import { Link } from 'react-router-dom';


const LoginPage = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const {login}= useAuthStore()

    

    const handelLogin = async (e)=>{
        e.preventDefault()
        await login(username,password)
        

    }


  return (
    <motion.div 
    initial={{opacity : 0 , y : 20}}
    animate = {{opacity : 1 , y : 0}}
    transition = {{duration : 0.5}}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
        <div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#090979] to-[#41b9d1] text-transparent bg-clip-text'>
					Welcome Back
				</h2>
                <form onSubmit={handelLogin}>
                    <Input
                    icon={Mail}
                    placeholder = "username "
                    type= "text"
                    value= {username}
                    onChange={(e)=>setUsername(e.target.value)}

                    />
                    <Input
                    icon={Lock}
                    placeholder = "password "
                    type= "password"
                    value= {password}
                    onChange={(e)=>setPassword(e.target.value)}

                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='w-full py-3 px-4 bg-gradient-to-r to-cyan-400 from-blue-600  text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                      type='submit'
                      //disabled={isLoading}
                    >
                                  LogIn
                    </motion.button>
                    <p className='text-sm text-center text-gray-400 mt-4 ' >
                          Don&apos;t have an account?{" "}
                          <Link to='/signup' className='text-blue-600 hover:underline'>
                            Sign up
                          </Link>
                        </p>



                </form>

        </div>



    </motion.div>
  )
}

export default LoginPage
