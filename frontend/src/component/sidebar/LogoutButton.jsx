import { LogOut } from "lucide-react";
import useAuthStore from "../../store/auth.store";

const LogoutButton = () => {
    const {logout , isLoading} = useAuthStore()

    const handelClick = async ()=>{
        await logout()
    }
	return (
		<div className='mt-auto'>
			{!isLoading ? (
				<LogOut  className='w-6 h-6 text-white cursor-pointer' onClick={handelClick} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;