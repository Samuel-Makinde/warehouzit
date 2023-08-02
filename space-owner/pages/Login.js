import { useState, useEffect } from 'react';
import Link from 'next/link'
import {FaTimes} from 'react-icons/fa'
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import {LiaWarehouseSolid} from 'react-icons/lia'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebookF} from 'react-icons/fa'
import { useForm } from "react-hook-form";


const LoginPage = () => {
    const [passwordVisibile, passwordNotVisible] = useState(false);
    const [isFocused, setIsFocused] = useState({ 
    email: false,
    password: false,
    });
    const {watch, register, setValue} = useForm()

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

    useEffect(() => {
        setValue("email", "");
        setValue("password", "");
    }, [setValue]);

    const togglePassword = () => {
        passwordNotVisible((prevState) => !prevState);
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
                <button  className='ml-[20px] text-[#4C7031] border-b-[2px] border-b-[#4C7031]'>Login</button>
                <Link href='/'>
                    <button className='ml-[20px] text-[#BABEC3] '>Register</button>
                </Link>
            </div>

            <div className='w-full h-full flex justify-between mt-[30px]'>
                <button className='w-5/12 h-full text-[#BABEC3] bg-[#E9ECEE]  border-[2px] border-[#4C7031] flex py-2 px-2 justify-center items-center cursor-pointer'
                onClick={() => setSelectedRole('spaceseeker')}
                > 
                    <BsFillPersonFill size={24} className='mr-[10px] text-center' /> Space Seeker</button>

                <button className="w-5/12 h-full border-[2px] border-[#4C7031] bg-[#4C7031] text-white flex py-2 px-2 justify-center items-center cursor-pointer" disabled="disabled"> <LiaWarehouseSolid size={24} className='mr-[10px]'/> Space owner</button>
            </div>

            <form className='w-full h-full'>
                <div className='w-full mt-[40px]'>
                    <div className="relative w-full  ">
                        <label
                            className={`absolute left-[30px] text-[16px] transform ${
                                isFocused.email || watch("email")  ? 'translate-y-0 -top-4 text-[#4C7031] font-semibold z-10' : '-translate-y-1/2 top-1/2 text-[#d0d0d0]'
                            } transition-all duration-200 pointer-events-none bg-white px-2 '}`}
                            htmlFor="email"
                            >
                            Email address
                        </label>

                        <input
                        type="email"
                        id="email"
                        className={`h-[60px] w-full   rounded-[5px] pl-[30px] ${
                            isFocused.email ? 'border-[2px] border-[#4C7031] outline-none' : 'z-10 border-[1px] border-[#A2ACB5] outline-none'
                        } `}
                        name="email"
                        {...register("email")}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email")}
                        />
                    </div>
                </div>

                <div className='w-full mt-[40px]'>
                    <div className="relative w-full  ">
                        <label
                            className={`absolute left-[30px] text-[16px] transform ${
                                isFocused.password || watch("password")  ? ' -top-4 text-[#4C7031] font-semibold z-10' : '-translate-y-1/2 top-1/2 text-[#d0d0d0]'
                                } transition-all duration-200 pointer-events-none bg-white px-2 '}`}
                            htmlFor="password"
                            >
                            Password
                        </label>
                        <input
                            type={passwordVisibile ? "text" : "password"}
                            id="password"
                            className={`h-[60px] w-full   rounded-[5px] pl-[30px] ${
                            isFocused.password ? 'border-[2px] border-[#4C7031] outline-none' : 'z-10 border-[1px] border-[#A2ACB5] outline-none'
                            } `}
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
                </div>

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
  );
};

export default LoginPage;