import { Bookmark, UserRound } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth'; // Adjust the import path as needed
import { toast } from 'react-toastify';
import SummaryApi from '../../Utils/Utils';


const ProfileCard = () => {
  const { user, courses } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  
  useEffect(() => {
    const getProfileData = async () => {
    if (!user._id) return;
    try {
      const response = await fetch(SummaryApi.getProfile.url, {
        method: SummaryApi.getProfile.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user._id }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.msg !== "no profile found") {
          setProfile(data.msg);
        } 
      }
    }catch (error) {
      console.error("Error fetching profile", error);
    }
  };
  getProfileData();
  }, [user])

  console.log(profile);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-4 lg:p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">45</p>
                <p className="text-gray-400">No. video</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">{courses.length}</p>
                <p className="text-gray-400">Course</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">0</p>
                <p className="text-gray-400">Wishlist</p>
              </div>
            </div>
            <div className="relative">
              <div className="md:w-48 md:h-48 w-40 h-40 bg-neutral-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-neutral-700">
                  <UserRound className="w-28 h-28" />
              </div>
            </div>
            <div className="flex justify-center sm:justify-between mt-32 md:mt-0 md:justify-evenly w-full flex-wrap items-center gap-3">
              <NavLink to='/download'>
                <button className="text-white text-sm py-2 px-4 md:w-[10rem] sm:w-1/4 uppercase rounded bg-black hover:bg-black/80 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Listed Video
                </button>
              </NavLink>
              <NavLink to='/complete_profile'>
                <button className="text-black py-2 px-4 md:w-[10rem] flex items-center w-full uppercase rounded border border-black hover:bg-border/80 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  <span className="mx-2 text-sm">Update Profile</span>
                </button>
              </NavLink>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-bold text-gray-700">
              {user.username}
            </h1>
            <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-700 text-center font-light lg:px-16">
              Bhasha.ai is a state-of-the-art multilingual AI Dubbing voice designed to cater to the diverse linguistic 
              needs of users around the globe. Leveraging advanced natural language processing (NLP) capabilities, 
              Bhasha.ai excels in generating high-quality, contextually relevant content in multiple languages, 
              making it an indispensable tool for writers, businesses, and organizations
            </p>
          </div>
            <p className="font-light text-gray-600 mt-3">
              {user.address}
            </p>
            <p className="mt-8 text-l font-light text-gray-500">
              Card details: 23** **** **** **12
            </p>
            <h1 className="mt-4 text-xl font-medium text-gray-500">
              email: {user.email}
            </h1>
          </div>
          <div className="grid grid-cols-1 mt-4 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl"> College</p>
                <p className="text-gray-400">{profile.college}</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">Branch</p>
                <p className="text-gray-400">{profile.branch}</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">Year</p>
                <p className="text-gray-400">{profile.year} year</p>
              </div>
            </div>
            <div className="grid grid-cols-2 text-center order-last md:order-second mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">Language</p>
                <p className="text-gray-400">{profile.language}</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">Interest</p>
                <p className="text-gray-400">{profile.interest}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 text-center order-last md:order-last mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl"> LinkedIn</p>
                <p className="text-gray-400">{profile.linkdin}</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">Others</p>
                <p className="text-gray-400">{profile.others}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
