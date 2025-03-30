import React, { useEffect } from 'react'
import { useAuth } from '../../store/auth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AdminAuth = (props) => {
  const Component = props.component;
  const user = useAuth();
  console.log(user.user.role);
  const navigate = useNavigate();

  useEffect(() => {

      if(user.user.role !== "admin"){
        // console.log("hello");
        toast.error("Your are not Admin");
        navigate("/");
      }
  }, []); 


  return (
    <>
      <Component />
    </>
  )
}

export default AdminAuth