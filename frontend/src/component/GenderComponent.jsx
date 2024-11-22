// eslint-disable-next-line react/prop-types
const GenderCheckbox = ({gender,setGender}) => {
	return (
		<div className='flex py-2'>
			<div className="form-control">
                <label className="cursor-pointer label">
                    <input type="checkbox" checked={gender === "female"}  className="checkbox checkbox-info" onClick={()=>setGender("female")}/>
                    <span className="label-text px-2 text-gray-400 font-medium  ">Female</span>
                </label>
            </div>
            <div className="form-control">
            <label className="cursor-pointer label">
                <input type="checkbox" checked= {gender === "male"}  className="checkbox checkbox-info" onClick={()=>setGender("male")}/>
                <span className="label-text px-2 text-gray-400 font-medium ">Male</span>
            </label>
            </div>
		</div>
	);
};
export default GenderCheckbox;