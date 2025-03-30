import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate, Link} from "react-router-dom";
import { useAuth } from "../../store/auth";
import SummaryApi from "../../Utils/Utils";

const UploadVideo = () => {

   const { isLoggedIn } = useAuth();

  useEffect(() => {

    const showToast = () => {
      toast('Please log in to access this feature.');
    };

    if(!isLoggedIn){
        showToast();
  }
  }, [isLoggedIn]);

    // Language data
    const languages = {
    empty : "",
    af: 'afrikaans', sq: 'albanian', am: 'amharic', ar: 'arabic', hy: 'armenian',
    az: 'azerbaijani', eu: 'basque', be: 'belarusian', bn: 'bengali', bs: 'bosnian',
    bg: 'bulgarian', ca: 'catalan', ceb: 'cebuano', ny: 'chichewa', 'zh-cn': 'chinese (simplified)',
    'zh-tw': 'chinese (traditional)', co: 'corsican', hr: 'croatian', cs: 'czech', da: 'danish',
    nl: 'dutch', en: 'english', eo: 'esperanto', et: 'estonian', tl: 'filipino', fi: 'finnish',
    fr: 'french', fy: 'frisian', gl: 'galician', ka: 'georgian', de: 'german', el: 'greek',
    gu: 'gujarati', ht: 'haitian creole', ha: 'hausa', haw: 'hawaiian', iw: 'hebrew', he: 'hebrew',
    hi: 'hindi', hmn: 'hmong', hu: 'hungarian', is: 'icelandic', ig: 'igbo', id: 'indonesian',
    ga: 'irish', it: 'italian', ja: 'japanese', jw: 'javanese', kn: 'kannada', kk: 'kazakh',
    km: 'khmer', ko: 'korean', ku: 'kurdish (kurmanji)', ky: 'kyrgyz', lo: 'lao', la: 'latin',
    lv: 'latvian', lt: 'lithuanian', lb: 'luxembourgish', mk: 'macedonian', mg: 'malagasy',
    ms: 'malay', ml: 'malayalam', mt: 'maltese', mi: 'maori', mr: 'marathi', mn: 'mongolian',
    my: 'myanmar (burmese)', ne: 'nepali', no: 'norwegian', or: 'odia', ps: 'pashto',
    fa: 'persian', pl: 'polish', pt: 'portuguese', pa: 'punjabi', ro: 'romanian', ru: 'russian',
    sm: 'samoan', gd: 'scots gaelic', sr: 'serbian', st: 'sesotho', sn: 'shona', sd: 'sindhi',
    si: 'sinhala', sk: 'slovak', sl: 'slovenian', so: 'somali', es: 'spanish', su: 'sundanese',
    sw: 'swahili', sv: 'swedish', tg: 'tajik', ta: 'tamil', te: 'telugu', th: 'thai',
    tr: 'turkish', uk: 'ukrainian', ur: 'urdu', ug: 'uyghur', uz: 'uzbek', vi: 'vietnamese',
    cy: 'welsh', xh: 'xhosa', yi: 'yiddish', yo: 'yoruba', zu: 'zulu'
  };


  const [video, setVideo] = useState([]);
  const [responseMsg, setResponseMsg] = useState({
    status: "",
    message: "",
    error: "",
  });
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [gender, setGender] = useState("")
  const navigate = useNavigate();

  // file validation
  const fileValidate = (file) => {
    if (file.type === "video/mp4") {
      setResponseMsg({ error: "" });
      return true;
    } else {
      setResponseMsg({ error: "File type allowed only .mp4" });
      return false;
    }
  };

  // video onchange handler
  const handleChange = (e) => {
    const videosArray = [];
    for (let i = 0; i < e.target.files.length; i++) {
      if (fileValidate(e.target.files[i])) {
        videosArray.push(e.target.files[i]);
      }
    }
    setVideo(videosArray);
  };

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    video.forEach((file) => {
      data.append("files[]", file);
    });

    data.append("name", name);
    data.append("source", source);
    data.append("destination", destination);
    data.append("gender", gender);

    axios
      .post(SummaryApi.upload.url, data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setResponseMsg({
            status: response.data.status,
            message: response.data.message,
          });
          setTimeout(() => {
            setVideo([]);
            setResponseMsg({});
          }, 10000);
          document.querySelector("#videoForm").reset();
          setName("");
          setGender("");
          setDestination("");
        }
        toast("Successfully Uploaded");
        navigate('/download');
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        }
      });
  };

  return (
    <>
          <form onSubmit={submitHandler} encType="multipart/form-data" id="videoForm">
          <div className="rounded-md ">
          <br />
          <div className="lg:mt-4 grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
            <div className="grid w-full  items-center gap-1.5">
          <label htmlFor="name"
          className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Name{'  '}</label>
          <input 
            type="text"
            name="name"
            id="name"
            disabled = {!isLoggedIn}
            className="form-control flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="grid w-full  items-center gap-1.5">
        <label htmlFor="source" 
        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >Voice Gender{'  '}</label>
          <select 
              name="gender" id="gender" onChange={(e) => setGender(e.target.value)}
              disabled = {!isLoggedIn}
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                <option value="empty"></option>
                <option value="man">Man</option>
                <option value="women">Women</option>
              </select>
        </div>
        </div>
        <div className="lg:mt-4 grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
        <div className="grid w-full  items-center gap-1.5">
        <label htmlFor="source" 
        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >Source Language{'  '}</label>
          <select 
              disabled = {!isLoggedIn}
              name="source" id="source" onChange={(e) => setSource(e.target.value)}
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                {Object.keys(languages).map((code) => (
                    <option key={code} value={code}>
                        {languages[code]}
                    </option>
                ))}
              </select>
        </div>
        <div className="grid w-full  items-center gap-1.5">
        <label htmlFor="destination" 
        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >Destination Language{'  '}</label>
            <select  
              name="destination" id="destination" onChange={(e) => setDestination(e.target.value)}
              disabled = {!isLoggedIn} 
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                {Object.keys(languages).map((code) => (
                    <option key={code} value={code}>
                        {languages[code]}
                    </option>
                ))}
              </select>
        </div>
        </div>
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
                <input  name="video"
                    id="dropzone-file"
                    type="file" 
                    className="form-control"
                    multiple
                    disabled = {!isLoggedIn}
                    accept=".mp4, .mkv"
                    onChange={handleChange} />
                  <span className="text-danger">{responseMsg.error}</span>
                  </label>       
                </div>
              </div>
              <br />
              <button 
          className="w-full bg-black text-white hover:bg-gray-900 py-3 px-6 rounded mt-6" 
          disabled = {!isLoggedIn}
          type="submit">
            Upload
          </button>
          <section class="flex lg:mt-6 justify-center items-center">
            <Link to='/youtube'>
            <button
              href="/"
              class="group flex justify-center p-2 rounded-md drop-shadow-xl bg-[#CD201F] from-gray-800 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 576 512"
                stroke-width="0"
                fill="currentColor"
                stroke="currentColor"
              >
                <path
                  d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                ></path>
              </svg>
              <span
                class="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
              >
                Youtube
              </span>
            </button>
            </Link>
          </section>
            </div>
          </form>   
          </>
  );
};

export default UploadVideo;

