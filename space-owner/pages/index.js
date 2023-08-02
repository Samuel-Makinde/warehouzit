import Head from 'next/head';
import { useEffect, useState } from 'react';
import {FaTimes} from 'react-icons/fa'
import {BsFillPersonFill} from 'react-icons/bs'
import {LiaWarehouseSolid} from 'react-icons/lia'
import {BiErrorCircle} from 'react-icons/bi'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebookF} from 'react-icons/fa'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from 'next/link'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const formSchema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  phoneNumber: yup
    .string()
    .required("Please enter your phone number")
    .matches(/^\d{11}$/, "phone number must be exactly 11 digits"),
  email: yup
    .string()
    .required("email can't be empty")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    ),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters and must contain at least a capital letter, a number, and a special character (!@#$%^&*)"
    ),
  cpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export default function Home() {
  const [passwordVisibile, passwordNotVisible] = useState(false);
  const [cpasswordVisibile, passwordNotVisibleC] = useState(false);
  const [selectedrole, setSelectedRole] = useState('spaceseeker')
  const [isFocused, setIsFocused] = useState({ 
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    password: false,
    cpassword: false,});
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

   useEffect(() => {
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("email", "");
    setValue("phoneNumber", "");
    setValue("password", "");
    setValue("cpassword", "");
  }, [setValue]);
 

  const handleFocus = (fieldName) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
  };

  const handleBlur = (fieldName) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [fieldName]: false,
    }));
  };

  const onSubmit = async (data, e) => {
  e.preventDefault();

  try {
    console.log(data);
    const username = data.firstName + '.' + data.lastName.charAt(0).toLowerCase();
    const response = await axios.post(`https://warehouzitserver.onrender.com/api/v1/auth/register`, {
      username: username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phoneNumber,
      role: selectedrole,
      password: data.password
    });
    toast.success('Registration successful!');
  } catch (error) {
    toast.error('Registration failed. Please try again later.');
  }
};

  const togglePassword = () => {
    passwordNotVisible((prevState) => !prevState);
  };

  const toggleCPassword = () => {
    passwordNotVisibleC((prevState) => !prevState);
  };

  return (
    <main className='w-full h-full flex justify-center px-4' >
      <div className='w-full sm:w-[500px] h-full  '>
        <div className='w-full h-full py-4 px-4 bg-[#4C7031]  text-white flex justify-between'>
          <h1 className=' text-3xl  '> Hello, Welcome</h1>
          <FaTimes size={28} />
        </div>

        
        <div className='w-10/12 h-full flex flex-col justify-center mx-auto mt-[30px]'>
          <div className='w-full h-full flex font-semibold text-[24px]'>
              <Link href='/Login'>
                  <button className='ml-[20px] text-[#BABEC3]'>Login</button>
              </Link>
              <button  className='ml-[20px] text-[#4C7031] border-b-[2px] border-b-[#4C7031]'>Register</button>
          </div>
          
            <div className='w-full h-full flex justify-between mt-[30px]'>
              <button className='w-5/12 h-full text-[#BABEC3] bg-[#E9ECEE]  border-[2px] border-[#4C7031] flex py-2 px-2 justify-center items-center cursor-pointer'
              onClick={() => setSelectedRole('spaceseeker')}
              > 
              <BsFillPersonFill size={24} className='mr-[10px] text-center' /> Space Seeker</button>

              <button className="w-5/12 h-full border-[2px] border-[#4C7031] bg-[#4C7031] text-white flex py-2 px-2 justify-center items-center cursor-pointer" disabled="disabled"> <LiaWarehouseSolid size={24} className='mr-[10px]'/> Space owner</button>
            </div>

            {/* Form value and attribute */}
          <form className='w-full h-full'
          onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full mt-[40px]'>
              <div className={`relative w-full  `}>
                  <label
                    className={`absolute left-[30px] text-[16px] 
                      transform ${
                          isFocused.firstName || watch("firstName")  ? 'translate-y-0 -top-4 text-[#4C7031]  font-semibold z-10' : '-translate-y-1/2 top-1/2 text-[#d0d0d0]'
                            } transition-all duration-200 pointer-events-none bg-white px-2 ${errors.firstName ? 'text-red-700  -top-0': 'text-[#4C7031]'}`}
                    htmlFor="firstname"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className={`h-[60px] w-full   rounded-[5px] pl-[30px] ${
                      isFocused.firstName ? 'border-[2px] border-[#4C7031] outline-none' : 'z-10 border-[1px] border-[#A2ACB5] outline-none'
                    } ${errors.firstName ? ' border-[2px] border-[#D72C0D]': 'border-[2px] border-[#4C7031] outline-none'}`}
                    name="firstName"
                    {...register("firstName")}
                    onFocus={() => handleFocus("firstName")}
                    onBlur={() => handleBlur("firstName")}
                  />
              </div>

              <small className="text-[#D72C0D] text-[14px] font-medium">
                {errors.firstName ? (
                  <div className="flex items-center text-red-600">
                      <BiErrorCircle className="mr-2" />
                      {errors.firstName.message}
                  </div>
                  ) : null}
              </small> 
            </div>

          <div className='w-full mt-[40px]'>
              <div className={`relative w-full  `}>
                  <label
                    className={`absolute left-[30px] text-[16px] transform ${
                          isFocused.lastName || watch("lastName")  ? 'translate-y-0 -top-4 text-[#4C7031] font-semibold z-10' : '-translate-y-1/2 top-1/2 text-[#d0d0d0]'
                            } transition-all duration-200 pointer-events-none bg-white px-2 ${errors.lastName ? 'text-red-700  -top-0': 'text-[#4C7031]'}`}
                    htmlFor="lastname"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className={`h-[60px] w-full   rounded-[5px] pl-[30px] ${
                      isFocused.lastName ? 'border-[2px] border-[#4C7031] outline-none' : 'z-10 border-[1px] border-[#A2ACB5] outline-none'
                    } ${errors.lastName ? ' border-[2px] border-[#D72C0D]': 'border-[2px] border-[#4C7031] outline-none'}`}
                    name="lastName"
                    {...register("lastName")}
                    onFocus={() => handleFocus("lastName")}
                    onBlur={() => handleBlur("lastName")}
                  />
              </div>
                <small className="text-[#D72C0D] text-[14px] font-medium">
                  {errors.lastName ? (
                    <div className="flex items-center text-red-600">
                      <BiErrorCircle className="mr-2" />
                        {errors.lastName.message}
                    </div>
                    ) : null}
                </small>
          </div>

          <div className='w-full mt-[40px]'>
              <div className="relative w-full  ">
                  <label
                    className={`absolute left-[30px] text-[16px] transform ${
                          isFocused.email || watch("email")  ? 'translate-y-0 -top-4 text-[#4C7031] font-semibold z-10' : '-translate-y-1/2 top-1/2 text-[#d0d0d0]'
                            } transition-all duration-200 pointer-events-none bg-white px-2 ${errors.email ? 'text-red-700  -top-0': 'text-[#4C7031]'}`}
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`h-[60px] w-full   rounded-[5px] pl-[30px] ${
                      isFocused.email ? 'border-[2px] border-[#4C7031] outline-none' : 'z-10 border-[1px] border-[#A2ACB5] outline-none'
                    } ${errors.email ? ' border-[2px] border-[#D72C0D]': 'border-[2px] border-[#4C7031] outline-none'}`}
                    name="email"
                    {...register("email")}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                  />
              </div>
              <small className="text-[#D72C0D] text-[14px] font-medium">
                {errors.email ? (
                  <div className="flex items-center text-red-600">
                    <BiErrorCircle className="mr-2" />
                    {errors.email.message}
                  </div>
                ) : null}
              </small> 
          </div>

          <div className='w-full mt-[40px]'>
              <div className="relative w-full  ">
                  <label
                    className={`absolute left-[30px] text-[16px] transform ${
                          isFocused.phoneNumber || watch("phoneNumber")  ? ' -top-4 text-[#4C7031] font-semibold z-10' : '-translate-y-1/2 top-1/2 text-[#d0d0d0]'
                            } transition-all duration-200 pointer-events-none bg-white px-2 ${errors.phoneNumber ? 'text-red-700  -top-0': 'text-[#4C7031]'}`}
                    htmlFor="phonenumber"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phonenumber"
                    className={`h-[60px] w-full   rounded-[5px] pl-[30px] ${
                      isFocused.phoneNumber ? 'border-[2px] border-[#4C7031] outline-none' : 'z-10 border-[1px] border-[#A2ACB5] outline-none'
                    } ${errors.phoneNumber ? ' border-[2px] border-[#D72C0D]': 'border-[2px] border-[#4C7031] outline-none'}`}
                    name="phoneNumber"
                    {...register("phoneNumber")}
                    onFocus={() => handleFocus("phoneNumber")}
                    onBlur={() => handleBlur("phoneNumber")}
                  />
              </div>
              <small className="text-[#D72C0D] text-[14px] font-medium">
                {errors.phoneNumber ? (
                <div className="flex items-center text-red-600">
                  <BiErrorCircle className="mr-2" />
                    {errors.phoneNumber.message}
                </div>
                ) : null}
              </small> 
          </div>

          <div className='w-full mt-[40px]'>
              <div className="relative w-full  ">
                  <label
                    className={`absolute left-[30px] text-[16px] transform ${
                          isFocused.password || watch("password")  ? ' -top-4 text-[#4C7031] font-semibold z-10' : '-translate-y-1/2 top-1/2 text-[#d0d0d0]'
                            } transition-all duration-200 pointer-events-none bg-white px-2 ${errors.password ? 'text-red-700  -top-0': 'text-[#4C7031]'}`}
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type={passwordVisibile ? "text" : "password"}
                    id="password"
                    className={`h-[60px] w-full   rounded-[5px] pl-[30px] ${
                      isFocused.password ? 'border-[2px] border-[#4C7031] outline-none' : 'z-10 border-[1px] border-[#A2ACB5] outline-none'
                    } ${errors.password ? ' border-[2px] border-[#D72C0D]': 'border-[2px] border-[#4C7031] outline-none'}`}
                    name="password"
                    {...register("password")}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                  />
                  <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute top-1/3 right-[20px] bg-transparent border-none text-[#878484] text-[24px]"
                >
                  {passwordVisibile ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> }
                </button>
              </div>
              <small className="text-[#D72C0D] text-[14px] font-medium">
                {errors.password ? (
                  <div className="flex items-center text-red-600">
                    <BiErrorCircle className="mr-2" />
                    {errors.password.message}
                  </div>
                    ) : null}
              </small> 
          </div>

          <div className='w-full mt-[40px]'>
              <div className="relative w-full  ">
                  <label
                    className={`absolute left-[30px] text-[16px] transform ${
                          isFocused.cpassword || watch("cpassword")  ? ' -top-4 text-[#4C7031] font-semibold z-10' : '-translate-y-1/2 top-1/2 text-[#d0d0d0]'
                            } transition-all duration-200 pointer-events-none bg-white px-2  ${errors.cpassword ? 'text-red-700  -top-0': 'text-[#4C7031]'}`}
                    htmlFor="cpassword"
                  >
                    Comfirm Password
                  </label>
                  <input
                    type={cpasswordVisibile ? "text" : "password"}
                    id="cpassword"
                    className={`h-[60px] w-full   rounded-[5px] pl-[30px] ${
                      isFocused.cpassword ? 'border-[2px] border-[#4C7031] outline-none' : 'z-10 border-[1px] border-[#A2ACB5] outline-none'
                    } ${errors.cpassword ? ' border-[2px] border-[#D72C0D] ': 'border-[2px] border-[#4C7031] outline-none'}`}
                    name="cpassword"
                    {...register("cpassword")}
                    onFocus={() => handleFocus("cpassword")}
                    onBlur={() => handleBlur("cpassword")}
                  />
                  <button
                  type="button"
                  onClick={toggleCPassword}
                  className="absolute top-1/3 right-[20px] bg-transparent border-none text-[#878484] text-[24px]"
                >
                  {cpasswordVisibile ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              <small className="text-[#D72C0D] text-[14px] font-medium">
                {errors.cpassword ? (
                <div className="flex items-center text-red-600">
                  <BiErrorCircle className="mr-2" />
                    {errors.cpassword.message}
                </div>
                ) : null}
              </small> 
          </div>

          {/* terms of service */}
          <div className='w-full h-full flex mt-[50px] text-gray-600'>
            <input type="checkbox" name="terms" id="terms" className='mt-[2px] cursor-pointer' />
            <p className='ml-[20px] text-[12px] sm:text-[16px]'>i agreed to the terms of services</p>
          </div>
          

          {/* Submit button  */}
            <input type="submit" className='w-full h-[60px] flex items-center justify-center bg-[#4C7031] text-white mt-[40px] text-[22px] cursor-pointer rounded-[5px]' value="Register" />
          </form>

          
          <div className="w-full flex items-center mt-[30px] ">
              <div className="flex-1 h-[1px] border-[1px] border-b-gray-800"></div>
              <p className="mx-4 text-gray-600">Or continue with</p>
              <div className="flex-1 border-[1px] border-b-gray-800"></div>
          </div>

          {/* third party registration method */}
          <div className='w-full flex justify-center mt-[30px]'>
            <div className='h-[40px] w-[40px] bg-gradient-to-t from-pink-200 to-blue-200 flex items-center justify-center rounded-[5px] mr-[20px] cursor-pointer'>
              <FcGoogle size={20} />
            </div>

            <div className='h-[40px] w-[40px] bg-blue-200 flex items-center justify-center rounded-[5px] cursor-pointer'>
            <FaFacebookF size={20} className='bg-blue-700 text-white'/>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}