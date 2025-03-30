import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate, Link} from "react-router-dom"
import Doc from "./Document/Doc";
import { useAuth } from "../../store/auth";
import SummaryApi from "../../Utils/Utils";

const UploadVideoYoutube = () => {
    
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if(!isLoggedIn){
    toast("User is Not Logged In")
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

  const [responseMsg, setResponseMsg] = useState({
    status: "",
    message: "",
    error: "",
  });
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [gender, setGender] = useState("")
  const [link, setLink] = useState("")
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

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", name);
    data.append("source", source);
    data.append("destination", destination);
    data.append("gender", gender);
    data.append("link", link);

    axios
      .post(SummaryApi.youtube.url, data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setResponseMsg({
            status: response.data.status,
            message: response.data.message,
          });
          document.querySelector("#videoForm").reset();
          setName("");
          setGender("");
          setDestination("");
          setLink("")
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
              name="source" id="source" onChange={(e) => setSource(e.target.value)}
              disabled = {!isLoggedIn}
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
        <label htmlFor="Link"
          className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Youtube Link{'  '}</label>
          <input 
            type="text"
            name="link"
            id="link"
            disabled = {!isLoggedIn}
            className="form-control flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setLink(e.target.value)}
            />
        <br />
        <button 
          className="w-full bg-black text-white hover:bg-gray-900 py-3 px-6 rounded mt-6" 
          disabled = {!isLoggedIn}
          type="submit">
            Upload
          </button>
          <section class="flex lg:mt-6 justify-center items-center">
           <div className="flex lg:mt-8">
            <Link to='/dubbing'>
                <Doc />
            </Link>
            </div>
          </section>
            </div>
          </form>   
          </>
  );
};


export default UploadVideoYoutube;
