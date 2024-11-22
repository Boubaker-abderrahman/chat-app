import {create} from 'zustand'
import axios from 'axios'

axios.defaults.withCredentials = true;

 const useAuthStore = create((set)=>({
    isAuthenticated :false,
    user : null,
    error : null,
    isLoading : false,

    login : async (username,password)=>{
        set({error : null ,  isLoading : true})
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login",{username,password})
            if(!res){
                set({error : res.data.message ,  isLoading : false})
                return;}
            set({user : res.data.user, error : null ,  isLoading : false,isAuthenticated: true})

        } catch (error) {
            console.log(error.response.data?.message )
            set({error : error.response.data?.message || "Internal message in login -auth.store" ,  isLoading : false})
            
        }
    },
    
    signup : async (username,password,confirmedPass,fullName,email,gender)=>{
        set({error : null ,  isLoading : true})
        try {
            const res = await axios.post("http://localhost:5000/api/auth/signup",{username,password,confirmedPass,fullName,email,gender})
            if(!res){throw new Error("Failed Fetch ")}
            set({user : res.data, error : null ,  isLoading : false,isAuthenticated: true})

        } catch (error) {
            console.log(error.response.data?.error || "Error In signIn")
            set({error : error.response.data?.error || "Internal message in sigup -auth.store" ,  isLoading : false})
        }
    },

    logout : async ()=>{
        set({error : null ,  isLoading : true})
        try {
            const res = await axios.post("http://localhost:5000/api/auth/logout")
            if(!res){throw new Error("Failed Logout ")}
            set({user : null, error : null ,  isLoading : false,isAuthenticated: false})

        } catch (error) {
            console.log(error.response.data?.message)
            set({error : error.response.data?.message|| "Internal message in logout -auth.store" ,  isLoading : false})
        }
    },
    checkauth : async ()=>{
        set({error : null ,  isLoading : true})
        try {
            const res = await axios.post("http://localhost:5000/api/auth/check-auth")
            if(!res){throw new Error("Failed checking auth ")}
            set({user : res.data, error : null ,  isLoading : false,isAuthenticated: true})

        } catch (error) {
            console.log(error.response.data?.message)
            set({error : error.response.data?.message|| "Internal message in logout -auth.store" ,  isLoading : false})
        }
    },



})
)

export default useAuthStore

