import React, { useState, useEffect } from "react";
// import axios from "axios";
// import UploadForm from "../../Components/Upload/UploadForm";
// // import UploadsList from "../../Components/Upload/UploadsList";
// import { BACKEND_URI } from "../../config/contants";
// import { toast } from "react-toastify";
import UploadVideo from "../../Components/Upload/UploadVideo";
// import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"

const Dubbing = () => {
  // const [medias, setMedias] = useState([]);

  // useEffect(() => {
  //   getAllMedias();
  // }, []);

  // const getAllMedias = () => {
  //   axios
  //     .get(`${BACKEND_URI}/api/v1/media/all`)
  //     .then((result) => {
  //       setMedias(result.data);
  //     })
  //     .catch((error) => {
  //       setMedias([]);
  //       console.log(error);
  //       toast("Error happened!");
  //     });
  // };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen py-12 gap-4 bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-4xl font-bold text-center mb-4">Upload Video</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
           Dubbing video is less than 20Mb or 2 min.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <UploadVideo />
       </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dubbing;
