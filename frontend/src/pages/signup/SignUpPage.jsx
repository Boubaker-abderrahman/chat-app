import { useState } from "react"
import {motion} from 'framer-motion'
import Input from "../../component/Input"
import { CircleUserRound, Lock, Mail, UserRound } from "lucide-react"
import GenderCheckbox from "../../component/GenderComponent"
import useAuthStore from "../../store/auth.store"
import { Link } from "react-router-dom"

const SignUpPage = () => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [confirmedPass,setConfirmedPass] = useState("")
  const [fullName,setFullName] = useState("")
  const [email,setEmail] = useState("")
  const [gender,setGender] = useState("")

  const {signup , error , isLoading} = useAuthStore()

  const handelSubmit = async (e)=>{
    e.preventDefault()
    await signup(username,password,confirmedPass,fullName,email,gender)

  }



  return (
  
    <motion.div 
    initial={{opacity : 0 , y : 20}}
    animate = {{opacity : 1 , y : 0}}
    transition = {{duration : 0.5}}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
        <div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#090979] to-[#41b9d1] text-transparent bg-clip-text'>
					Create an Account
				</h2>
                <form onSubmit={handelSubmit}>
                    <Input
                    icon={UserRound}
                    placeholder = "fullname "
                    type= "text"
                    value= {fullName}
                    onChange={(e)=>setFullName(e.target.value)}

                    />
                    <Input
                    icon={CircleUserRound}
                    placeholder = "username "
                    type= "text"
                    value= {username}
                    onChange={(e)=>setUsername(e.target.value)}

                    />
                    <Input
                    icon={Mail}
                    placeholder = "email "
                    type= "email"
                    value= {email}
                    onChange={(e)=>setEmail(e.target.value)}

                    />
                    <Input
                    icon={Lock}
                    placeholder = "password "
                    type= "password"
                    value= {password}
                    onChange={(e)=>setPassword(e.target.value)}

                    />
                    <Input
                    icon={Lock}
                    placeholder = "confirm your password "
                    type= "password"
                    value= {confirmedPass}
                    onChange={(e)=>setConfirmedPass(e.target.value)}

                    />
                    <GenderCheckbox gender={gender} setGender={setGender} />

                    {error && <div className="h-4 py-4 mb-2 text-sm text-red-500 font-bold relative -top-4 "> {error}</div>}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='w-full py-3 px-4 bg-gradient-to-r to-cyan-400 from-blue-600  text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        type='submit'
                        disabled={isLoading}
                      >
                                  Sign Up
                    </motion.button>
                    <p className='text-sm text-center text-gray-400 mt-4 ' >
                          Already have an account?{" "}
                          <Link to='/login' className='text-blue-600 hover:underline'>
                            Log In
                          </Link>
                        </p>



                </form>

        </div>



    </motion.div>
  )
  
}

export default SignUpPage
