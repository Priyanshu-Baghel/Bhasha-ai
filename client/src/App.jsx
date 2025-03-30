import React from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from './Components/Commons/Navbar';
import Footer from './Components/Commons/Footer';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Landing from './Pages/Landing/Landing';
import Card from './Components/Card/Card';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import Error from './Pages/Error/Error';
import Dubbing from './Pages/Uploads/Dubbing';
import Download from './Pages/Download/Download';
import Admin from './Pages/Admin/Admin';
import ProfileCard from './Pages/profile/ProfileCard';
import ProfileComplete from './Pages/profile/ProfileComplete';
import UploadCards from './Components/Card/UploadCards';
import Payment from './Pages/Payment/Payment';
import Success from './Pages/Payment/Success';
import Fail from './Pages/Payment/Fail';
import ViewCourse from './Pages/Courses/ViewCourse';
import VideoUpload from './Components/Upload/UploadVideo';
import UploadVideo from './Components/Upload/UploadVideo';
import Subtitles from './Pages/Uploads/Subtitles';
import Notes from './Pages/Uploads/Notes';
import Youtube from './Pages/Uploads/Youtube';
import SubtitlesDownload from './Pages/Download/SubtitlesDownload';
import GetUser from './Components/Admin/GetUser';
import GetCourse from './Components/Admin/GetCourse';
import GetMessage from './Components/Admin/GetMessage';
import EditUser from "./Components/Admin/EditUser";
import ProtectedRoute from './Pages/Auth/ProtectedRoute';
import AddCourseForm from './Components/Admin/AddCourseForm';
import AdminAuth from './Pages/Admin/AdminAuth';
import GetAllVideos from './Pages/Download/GetAllVideos';
// import Youtube from './Pages/Download/Youtube';



const App = () => {
  return (
    <>
    
      <Navbar />
        
          <Routes>
            {/* <Switch> */}
            {/* Non-private routes*/}
            <Route path='/' element={<Landing />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contact' element={<Contact />}/>
            <Route path='*' element={<Error/> } />

            {/* User routes */}
            <Route path='/signin' element={<SignIn />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/complete_profile' element={<ProtectedRoute Component = {ProfileComplete} />} />
            <Route path='/profile' element={<ProtectedRoute Component = {ProfileCard} />} />


            {/* Courses routes */}
            <Route path="/courses" element={<Card />}/>
            <Route path='/viewcourse' element={ <ViewCourse />} />


            {/* video routes */}
            <Route path='/dubbing' element={<Dubbing />}/>
            <Route path='/subtitles'element={<Subtitles />}/>
            <Route path='notes' element={<Notes />} />
            <Route path='/upload' element={<UploadCards />} />
            <Route path="/youtube" element={<Youtube />} />
            <Route path='/download' element={<ProtectedRoute Component = {Download} />}/>
            <Route path="/getAllVideos" element={<GetAllVideos />} />
            
            {/* Subtitles*/}
            <Route path="/subtitles_download" element={<ProtectedRoute Component = {SubtitlesDownload} />}/>

            {/* Payment Routes  */}
            <Route path='/payment' element = {<ProtectedRoute Component = {Payment} />} />
            <Route path='/payment_success' element= {<ProtectedRoute Component = {Success} />} />
            <Route path='/payment_failed' element= {<ProtectedRoute Component = {Fail }/>} />


            {/* Chatbot */}

            {/* <Route path='/chatbot' element={<Chatbot />} /> */}
            

            {/* Admin Routes */}

            <Route path='/admin' element={<AdminAuth component = {Admin} />} />
            <Route path='/admin/getAllUser' element={<AdminAuth component = {GetUser} /> } />
            <Route path='/admin/getAllCourse' element={<AdminAuth component = {GetCourse} />} />
            <Route path='/admin/getAllMessage' element={<AdminAuth component = {GetMessage} />} />
            <Route path='/admin/editUser' element={<AdminAuth component = {EditUser} />} />
            <Route path='/admin/addCourse'element={<AdminAuth component = {AddCourseForm} />} />


            {/* </Switch> */}

          </Routes>
        
      <Footer />
    </>
  );
}

export default App;
