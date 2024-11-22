import { Search } from "lucide-react"

const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
			<input type='text' placeholder='Search…' className='input  h-10 input-bordered rounded-full ' />
			<button type='submit' className='btn btn-circle bg-transparent   text-white'>
				<Search className='w-4 h-4 outline-none' />
			</button>
	</form>
  )
}

export default SearchInput
