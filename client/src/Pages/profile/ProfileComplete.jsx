import React, { useEffect, useState } from "react";
import SummaryApi from "../../Utils/Utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const ProfileComplete = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user._id);

  const [formData, setFormData] = useState({
    user_id: "",
    college: "",
    branch: "",
    year: "",
    language: "",
    interest: "",
    linkdin: "",
    github: "",
    others: "",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_id: user._id,
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.profile.url, {
        method: SummaryApi.profile.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Profile Status : ", data.message);
        toast(data.message);
        setFormData({
          user_id: "",
          college: "",
          branch: "",
          year: "",
          language: "",
          interest: "",
          linkdin: "",
          github: "",
          others: "",
        });
        navigate("/profile");
      } else {
        console.log("Network error");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="px-5 py-5 lg:mt-5 md:px-40 w-full">
      <h1 className="text-md lg:text-xl font-medium px-3 border-b pb-3">
        Complete Your Profile
      </h1>
      <form onSubmit={handleSubmit} className="py-5">
        <div className="w-full flex flex-wrap gap-5 px-3 items-center">
          <div className="my-2 lg:w-1/3 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <input
                type="text"
                name="college"
                className="focus:outline-none text-neutral-600 font-medium placeholder:text-gray-400 placeholder:font-medium w-full px-3 py-2"
                placeholder="Enter Your College"
                value={formData.college}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="my-2 lg:w-1/2 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <select
                name="branch"
                className="focus:outline-none text-neutral-600 text-gray-700 font-medium w-full px-3 py-2"
                value={formData.branch}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Your Branch
                </option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                <option value="IT">IT</option>
              </select>
            </div>
          </div>
          <div className="my-2 lg:w-1/3 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <select
                name="year"
                className="focus:outline-none text-neutral-600 font-medium w-full px-3 py-2"
                value={formData.year}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Your Year
                </option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>
          <div className="my-2 lg:w-1/2 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <select
                name="language"
                className="focus:outline-none text-neutral-600 font-medium w-full px-3 py-2"
                value={formData.language}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Your Language
                </option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Tamil">Tamil</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Kannada">Kannada</option>
                <option value="Odia">Odia</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Assamese">Assamese</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>
          </div>
          <div className="my-2 lg:w-1/3 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <select
                name="interest"
                className="focus:outline-none text-neutral-600 font-medium w-full px-3 py-2"
                value={formData.interest}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Your Interest
                </option>
                <option value="MERN Stack">MERN Stack</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Science">Data Science</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Non-Technical">Non-Technical</option>
              </select>
            </div>
          </div>
          <div className="my-2 lg:w-1/2 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <input
                type="text"
                name="linkdin"
                className="focus:outline-none text-neutral-600 font-medium placeholder:text-gray-400 placeholder:font-medium w-full px-3 py-2"
                placeholder="LinkedIn Profile Link"
                value={formData.linkdin}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="my-2 lg:w-1/2 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <input
                type="text"
                name="github"
                className="focus:outline-none text-neutral-600 font-medium placeholder:text-gray-400 placeholder:font-medium w-full px-3 py-2"
                placeholder="GitHub Profile Link"
                value={formData.github}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="my-2 lg:w-1/3 bg-clip-border rounded-xl w-full bg-white text-gray-700 shadow-md">
            <div className="p-4">
              <input
                type="text"
                name="others"
                className="focus:outline-none text-neutral-600 font-medium placeholder:text-gray-400 placeholder:font-medium w-full px-3 py-2"
                placeholder="Other Link"
                value={formData.others}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileComplete;
