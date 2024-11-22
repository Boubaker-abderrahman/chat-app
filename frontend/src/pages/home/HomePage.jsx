import MessageContainer from "../../component/messsages/MessageContainer"
import Sidebar from "../../component/sidebar/Sidebar"
import {motion} from 'framer-motion'

const HomePage = () => {
  return (
        <motion.div 
        initial={{opacity:0 , y : 20}}
        animate={{opacity:1 , y : 0}}
        transition={{duration : 0.5}}
        className='max-w-3xl w-full h-[500px]  mx-10 flex   bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-xl overflow-hidden'>
          <Sidebar/>
          <MessageContainer/>
          

        </motion.div>
  )
}

export default HomePage
