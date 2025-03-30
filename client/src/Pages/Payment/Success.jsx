import React, { useEffect, useState } from 'react';
import Payment_Image from '../../Assets/Payment/Success.png';
import { toast } from 'react-toastify';
import { useAuth } from '../../store/auth';
import SummaryApi from '../../Utils/Utils';
// import { useHistory } from 'react-router-dom';

const Success = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  // const history = useHistory();

  useEffect(() => {
    const processPayment = async () => {
      const paymentDetails = {
        userId: user._id,
        subscription_name: 'Basic', // Example subscription name
        subscription_price: 500, // Example subscription price
      };

      try {
        const response = await fetch(SummaryApi.subscription.url, {
          method: SummaryApi.subscription.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentDetails),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
          toast.success('Payment Successful!');
          setLoading(false);
        } else {
          const error = await response.json();
          console.error('Error:', error);
          // toast.error('Payment failed. Please try again.');
          // history.push('/payment-failure'); // Redirect on failure
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        toast.error('Payment failed. Please try again.');
        // history.push('/payment-failure'); // Redirect on failure
      }
    };

    processPayment();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        src={Payment_Image}
        width="450px"
        height="150px"
        alt="Payment Success"
      />
      <div className="bg-black px-10 py-2.5 text-white text-xl font-semibold rounded mt-4">
        Payment Successful
      </div>
    </div>
  );
};

export default Success;
