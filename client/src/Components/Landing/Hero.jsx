import React from 'react';
import Parrot from '../../Assets/Logo/parrot.png';
import Logo from '../../Assets/Logo/Logo.png'
import { Link } from 'react-router-dom';
import {useAuth} from "../../store/auth"
import { NavLink } from 'react-router-dom';

const Hero = () => {

  const { isLoggedIn, user } = useAuth();
  console.log(user);

  return (

    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
            <span>
              <img src={Logo} width="50" height="30" alt=''/>
            </span>
          <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
            <div className="rounded-full bg-white p-1 px-2">
              <p className="text-sm font-medium">We&apos; Learning</p>
            </div>
            <p className="text-sm font-medium">Join our team &rarr;</p>
          </div>
          <h1 className="mt-8 text-l font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            Bhasha.AI: <br/>
            Bharat ki shaan, har Bhasha ek samaan.
          </h1>
          <p className="mt-8 text-lg text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur modi blanditiis
            dolores quasi eaque explicabo!
          </p>
          <form action="" className="mt-8 flex items-start space-x-2">
          { isLoggedIn ? 
            <>
              { user.role === "admin" ?
              <>
              <div className="hidden lg:block">
              <NavLink
                to="/admin">
                <button
                    type="button"
                    className="rounded-md lg:ml-3 bg-primary px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                  Dashboard
                </button>
              </NavLink>
            </div> 
             <div className="hidden lg:block">
              <NavLink
                to="/profile">
                <button
                    type="button"
                    className="rounded-md lg:ml-3 bg-primary px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Profile
                </button>
              </NavLink>
            </div> 
            </>
              :
              <>
              <div className="hidden lg:block">
              <NavLink
                to="/profile">
                <button
                    type="button"
                    className="rounded-md lg:ml-3 bg-primary px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Profile
                </button>
              </NavLink>
            </div> 
            </>
            }
            </> 
          : <>
            <div>
                <Link to="/signin">
                  <button
                    type="button"
                    className="rounded-md bg-primary px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Sign In
                  </button>
                  </Link>
              </div>

              <div>
                <Link to='/signup'>
                  <button
                    type="button"
                    className="rounded-md border border-black px-8 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Sign Up
                  </button>
                  </Link>
              </div>
          </>
          
          }
              
            </form>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <img
            // className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[600px] xl:aspect-[16/9]"
            src= {Parrot} 
            className="aspect-[3/4] bg-white object-cover lg:aspect-[4/3] lg:h-[600px] xl:aspect-[16/9]"
            // src="https://plus.unsplash.com/premium_photo-1679079456783-5d862f755557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjQ3fHxtYW4lMjB3aXRoJTIwbGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt="Parrot"
          />

        </div>
      </div>
    </div>
  )
}

export default Hero