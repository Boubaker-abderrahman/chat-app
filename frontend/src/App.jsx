
import { Routes , Route, Navigate} from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/login/LoginPage"
import SignUpPage from "./pages/signup/SignUpPage"
import useAuthStore from "./store/auth.store"
import { useEffect } from "react"

const RedirectRoute = ({children})=>{
  
  const {isAuthenticated} = useAuthStore()
  if(isAuthenticated){
    

  return <Navigate to='/' replace/>;}

  return children;
  
}

const ProtectedRoute = ({children})=>{
  
  const {isAuthenticated} = useAuthStore()
  if(!isAuthenticated){
    
  return <Navigate to='/login' replace/>;}

  return children;
  
}
function App() {
  const {checkauth} = useAuthStore()

  useEffect(()=>{
    const fetchUser =  async () =>{
      await checkauth()
    }
    fetchUser()
  },[])
  

  return (
    <>
      <div
        className='min-h-screen bg-gradient-to-br
      from-[#686874] via-[#090979] to-[#41b9d1] flex items-center justify-center relative overflow-hidden'
      >
        
        <Routes>
          <Route path = "/"  element = {
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
            }></Route>
          <Route path = "/login"  element = {
            <RedirectRoute>
              <LoginPage/>
            </RedirectRoute>
            }>

            </Route>
          <Route path = "/signup"  element = {
              
              <RedirectRoute>
                <SignUpPage/>
              </RedirectRoute>
            }>

            </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
