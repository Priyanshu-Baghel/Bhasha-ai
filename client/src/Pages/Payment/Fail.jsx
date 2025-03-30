import React,{useEffect} from 'react'
import Payment_Fail from '../../Assets/Payment/Fail.gif'
import { toast } from 'react-toastify';

const Fail = () => {

  useEffect(() => {
    toast.error("Payment Failed")
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={Payment_Fail} width={"450px"} height={"150px"} 
        alt="Payment Failed" 
      />
      <div className="bg-black px-10 py-2.5 text-white text-xl font-semibold rounded ">
        Payment Failed
      </div>
      <div className="grid w-full justify-center lg:mt-4 items-center gap-1.5">
        </div>  
      </div>

  );
};

export default Fail;


