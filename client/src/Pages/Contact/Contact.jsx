'use client'
import {React, useState} from 'react'
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import ContactImage from "../../Assets/contact us/Contact.gif"
import SummaryApi from '../../Utils/Utils';

const defaultContactFromData = {
    username: "",
    email: "",
    phone: "",
    message: "",
}

const Contact = () => {
    
    const [contact, setContact] = useState(defaultContactFromData);

    const [userData, setUserData] = useState(true);

    const {user} = useAuth();

    if(userData && user){
      setContact({
        username:user.username,
        email:user.email,
        phone: "",
        message:"",
      });

      setUserData(false);
    }

    const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;
   
      setContact({
       ...contact,
       [name]:value,
      })
   }

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.contact.url,{
        method:SummaryApi.contact.method,
        headers:{ 
          'Content-Type':"application/json"
        },
        body:JSON.stringify(contact),
      });

      if(response.ok){
        setContact(defaultContactFromData);
        const data = await response.json();
        console.log(data);
        toast("Message send");
      }
    } catch (error) {
      toast("Message not send");
      console.log(error);
    }
  }

    return (
        <div>
          <div className="mx-auto max-w-7xl px-4">
            {/* Hero Map */}
            <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
              <div className="mx-auto max-w-max rounded-full border bg-gray-50 p-1 px-3">
                <p className="text-center text-xs font-semibold leading-normal md:text-sm">
                  Share your thoughts
                </p>
              </div>
              <p className="text-center text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
                Love to hear from you
              </p>
              <p className="mx-auto max-w-4xl text-center text-base text-gray-600 md:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veritatis voluptates
                neque itaque repudiandae sint, explicabo assumenda quam ratione placeat?
              </p>
            </div>
            <div className="mx-auto max-w-7xl py-12 md:py-24">
              <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
                {/* contact from */}
                <div className="flex items-center justify-center">
                  <div className="px-2 md:px-12">
                    <p className="text-2xl font-bold text-gray-900 md:text-4xl">Get in touch</p>
                    <p className="mt-4 text-lg text-gray-600">
                      Our friendly team would love to hear from you.
                    </p>
                    <form className="mt-8 space-y-4">
                      <div className="grid w-full  items-center gap-1.5">
                        <div className="grid w-full  items-center gap-1.5">
                          <label
                            className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="username"
                          >
                            Username
                          </label>
                          <input
                            // className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                            type="text"
                            name='username'
                            placeholder="Full Name"
                            id="username"
                            required
                            autoComplete='off'
                            value = {contact.username}
                            onChange={handleInput}
                          />
                        </div>
                      </div>
                      <div className="grid w-full  items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          // className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          // className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          type="email"
                          id='email'
                          required
                          name='email'
                          autoComplete="off"
                          placeholder="Email"
                          value={contact.email}
                          onChange={handleInput}
                        />
                      </div>
                      <div className="grid w-full  items-center gap-1.5">
                        <label
                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="phone_number"
                        >
                        Phone number
                        </label>
                        <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="tel"
                        id="phone"
                        name='phone'
                        required
                        autoComplete='off'
                        placeholder="Phone number"
                        value={contact.phone}
                        onChange={handleInput}
                        />
                        </div>
                      <div className="grid w-full  items-center gap-1.5">
                        <label
                          className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="message"
                        >
                          Message
                        </label>
                        <textarea
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                          id="message"
                          placeholder="Leave us a message"
                          cols={10}
                          name='message'
                          required
                          value={contact.message}
                          onChange={handleInput}
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
                <img
                  alt="Contact us"
                  className="hidden max-h-full w-full rounded-lg object-cover lg:block"
                  src={ContactImage}
                   />
              </div>
            </div>
          </div>
          <hr className="mt-6" />
        </div>
      )
    }


    
    export default Contact;