// GetMessage.js
import React, { useState, useEffect } from 'react';
import SummaryApi from '../../Utils/Utils';
import { useAuth } from '../../store/auth';

const GetMessage = () => {
    const [messages, setMessages] = useState([]);
    const user = useAuth();

    useEffect(() => {
      const fetchMessages = async () => {
        try {
            const response = await fetch(SummaryApi.Admin.getAllMessages.url); // Assuming your backend API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMessages(data); // Update state with fetched messages
        } catch (error) {
            console.error('Error:', error);
            // Handle error state or show error message
        }
    };
        fetchMessages();
    }, []);

    

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 className="text-lg font-semibold">User's Message</h2>
                    <p className="mt-1 text-sm text-gray-700">
                        This is a list of all User Messages.
                    </p>
                </div>
                <div>
                    <button
                        type="button"
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Add new User
                    </button>
                </div>
            </div>
            <div className="mt-6 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                        >
                                            User's Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                        >
                                            Messages
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                        >
                                            Phone No.
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-center text-sm font-normal text-gray-700"
                                        >
                                            Send <br /> Acknowledgement Email
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {messages.map((message) => (
                                        <tr key={message._id}>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{message.name}</div>
                                                        <div className="text-sm text-gray-700">{message.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-12 py-4">
                                                <div className="text-sm text-gray-900 ">{message.message}</div>
                                            </td>
                                          <td className="whitespace-nowrap px-4 py-4">
                                              {message.subscriptionActive ? (
                                                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                      Active
                                                  </span>
                                              ) : (
                                                  <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                                      Inactive
                                                  </span>
                                              )}
                                          </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                {message.phone}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                                                <button className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                                                    Send
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GetMessage;
