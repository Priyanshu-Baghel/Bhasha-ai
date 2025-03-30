import { useEffect, useState } from 'react';
import React from 'react'
import { Plus, Users, MonitorPlay, MessageCircleMore, BookCopy} from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <>
          <div className="p-4 max-w-7xl mx-auto ">
            <div className="flex items-center justify-between border-b-2 flex-wrap ">
              <h1 className="text-xl lg:w-1/2  my-3 pb-3 px-2 font-bold ">
                Bhasha.ai Team  Members
              </h1>
              <h2 className="text-extrabold text-xl px-2">ADMIN PORTAL</h2>
            </div>
            <div className="mt-12"> 
              <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-neutral-600 to-neutral-400 text-white shadow-neutral-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clip-rule="evenodd"
                      ></path>
                      <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                      Total User
                    </p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      300
                    </h4>
                  </div>
                  <div className="border-t border-blue-gray-50 p-4">
                    <p className=" antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 flex justify-between  items-center">
                      <strong className="text-gray-600"> Total Students</strong>
                      <button className="px-2 font-medium py-1  bg-gray-200 text-gray-500 hover:bg-gray-300 text-sm rounded-md">
                        View
                      </button>
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-600 to-purple-400 text-white shadow-purple-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <BookCopy />
                  </div>
                  <div className="p-4 text-right">
                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                      Total Courses
                    </p>
                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      2,300
                    </h4>
                  </div>
                  <div className="border-t border-blue-gray-50 p-4">
                    <p className="antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600  flex justify-between  items-center">
                      <strong className="text-gray-600"> Total Courses</strong>
                      <button className="px-2 font-medium py-1 bg-gray-200 text-gray-500 hover:bg-gray-300 text-sm rounded-md">
                        View
                      </button>
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                      Total Sub-admins
                    </p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      10
                    </h4>
                  </div>
                  <div className="border-t border-blue-gray-50 p-4">
                    <p className=" antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 flex justify-between  items-center">
                      <strong className="text-gray-600">Team Members</strong>
                      <button className="px-2 font-medium py-1 bg-gray-200 text-gray-500 hover:bg-gray-300 text-sm rounded-md">
                        View
                      </button>
                    </p>
                  </div>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                      Total Assigned Professors
                    </p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                      20
                    </h4>
                  </div>
                  <div className="border-t border-blue-gray-50 p-4">
                    <p className=" antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600  flex justify-between  items-center">
                      <strong className="text-gray-600">Professors</strong>
                      <button className="px-2 font-medium py-1 bg-gray-200 text-gray-500 hover:bg-gray-300 text-sm rounded-md">
                        View
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              {/* 

                    Button Section For Get Data

               */}
               <form action="" className="my-8 flex justify-center gap-2 items-center">
                <div className="flex justify-center items-center mx-4">
                  <Link to="/admin/getAllUser" >
                    <button
                    type="button"
                    className="bg-clip-border rounded-xl gap-2 px-7 py-2.5 overflow-hidden bg-gradient-to-tr from-neutral-600 to-neutral-400 text-white shadow-neutral-500/40 shadow-lg grid place-items-center"
                  >
                    <Users />
                    Get All User's Detail
                  </button>
                  </Link>
                </div>
                <div className="flex justify-center items-center">
                  <Link to="/admin/getAllCourse" >
                  <button
                    type="button"
                    className="bg-clip-border rounded-xl gap-2 px-7 py-2.5 overflow-hidden bg-gradient-to-tr from-purple-600 to-purple-400 text-white shadow-purple-500/40 shadow-lg  grid place-items-center"
                  >
                    <MonitorPlay />
                    Get All Course's Detail
                  </button>
                  </Link>
                </div>
                <div className="flex justify-center items-center mx-4">
                  <Link to="/admin/getAllMessage">
                  <button
                    type="button"
                    className="bg-clip-border rounded-xl gap-2 overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg px-7 py-2.5 grid place-items-center"
                  >
                    <MessageCircleMore />
                    Get All Messages
                  </button>
                  </Link>
                </div>
                <div className="justify-center items-center mx-4">
                  <Link to="/admin/addCourse">
                  <button
                    type="button"
                    className="bg-clip-border items-center gap-2 px-7 py-2.5 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg grid place-items-center"
                  >
                    <Plus />
                    Add New Course's
                  </button>
                  </Link>
                </div>
              </form>

            </div>
          </div>
        </>
    )
    };
    




export default Admin;