import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../../config/contants";
import { Delete, DeleteIcon, UploadIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }

    formdata.append("name", name);

    axios
      .post(`${PYTHON_BACKEND_URI}/`, formdata)
      .then((success) => {
        getAllMedias();
        toast("Submitted successfully");
        navigate('/download');
      })
      .catch((error) => {
        console.log(error);
        toast("Error happened!");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="rounded-md ">
          <br />
          <label htmlFor="name" >Name{'  '}</label>
          <input 
            type="text"
            name="name"
            id="name"
            className="form-control flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setName(e.target.value)}
          />
        <br />
        <div>
          <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">MP4 or MKV (MAX. 20MB)</p>
                </div>
                <input  name="videos"
                    id="dropzone-file"
                    type="file" 
                    className=" form-control"
                    multiple
                    accept=".mp4, .mkv"
                    onChange={(e) => {
                  setVideos(e.target.files);
                }} />
            </label>
        </div> 
        </div>
        <br />
        {/* <div className="form-group">
          <input  
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mp4, .mkv"
            onChange={(e) => {
              setVideos(e.target.files);
            }}
          />
         
          </div> */}
           <button 
          className="w-full bg-black text-white hover:bg-gray-900 py-3 px-6 rounded mt-6" 
          type="submit">
            Upload
          </button>
          </div>
      </form>
      
    </>
  );
};

export default UploadForm;
