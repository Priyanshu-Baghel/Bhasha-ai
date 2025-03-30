import {React, useEffect, useState} from 'react'
import UploadsList from '../../Components/Upload/UploadsList'
import axios from "axios";
import { BACKEND_URI } from "../../config/contants";
import {toast} from 'react-toastify'

const GetAllVideos = () => {
    const [medias, setMedias] = useState([]);

  useEffect(() => {
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URI}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        toast("Error happened!");
      });
  };

  return (
    <>
        <div className="mx-auto max-w-2xl lg:mt-4 lg:md-6 lg:text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Download video
          </h2>
          <p className="mt-4 Lg:md-30 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, assumenda
          </p>
        </div>
        <UploadsList medias={medias}/>
    </>
  )
}


export default GetAllVideos;