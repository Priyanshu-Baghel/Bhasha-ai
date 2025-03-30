import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import { toast } from 'react-toastify'
import Login from "../../Assets/signin/login.gif"
import SummaryApi from '../../Utils/Utils'

const SignIn = () => {

  const { storeTokenInLS} = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

const handleInput = (e) => {
   let name = e.target.name;
   let value = e.target.value;

   setUser({
    ...user,
    [name]:value,
   })
} 

const handleSubmit = async (e) => {
  e.preventDefault();
    console.log(user);
    try {
    const response = await fetch(SummaryApi.signIN.url, {
        method: SummaryApi.signIN.method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    });
    
    console.log(response);
    if(response.ok){
      toast("Login Successfully")
      const res_data = await response.json();
      console.log("res_data", res_data);
      storeTokenInLS(res_data.token); // stored the token in localhost
      setUser({
        email:"",
        password: "",
      });
      navigate("/");
    }else{
      toast("User Not Exist")
    }
  } catch (error) {
    toast("Invalid Credentials")
    console.log("login",error);
  }
  }


  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <NavLink to='/signup'
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </NavLink>
            </p>
            <form action="/" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="" className="text-base font-medium text-gray-900">
                    {' '}
                    Email address{' '}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      id='email'
                      required
                      name='email'
                      autoComplete="off"
                      placeholder="Email"
                      value={user.email}
                      onChange={handleInput}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="" className="text-base font-medium text-gray-900">
                      {' '}
                      Password{' '}
                    </label>
                    <NavLink 
                      to='/contact'
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      {' '}
                      Forgot password?{' '}
                    </NavLink>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      name='password'
                      id='password'
                      autoComplete='off'
                      required
                      value={user.password}
                      onChange={handleInput}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Get started <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src={Login}
            alt=""
          />
        </div>
      </div>
    </section>
  )
}

export default SignIn;