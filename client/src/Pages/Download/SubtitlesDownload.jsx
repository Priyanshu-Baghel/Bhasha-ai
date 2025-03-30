import React, { useState } from 'react';
import Loader from './loader/Loader';
import Dub_Image from '../../Assets/Download/Dubwithus.gif'
import './generate_button/generateButton.css';
import './button_download/button_download.css';
import SummaryApi from '../../Utils/Utils';

const SubtitlesDownload = () => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    // const [result, setResult] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    

    const timeoutDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.subtitles.url);
            if (response.ok) {
                const blob = await response.blob();
                const fileUrl = URL.createObjectURL(blob);
                setFileUrl(fileUrl);
            } else {
                console.error('Failed to fetch file');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const handleButtonClick = () => {
        if (!loading) {
            fetchData();
        }
    };

    return (
        <div>
            {loading ? (
                <div>
                    <Loader />
                    <div className='flex items-center justify-center lg:mt-4 lg:mb-6 px-5 py-2.5 text-black text-xl font-semibold rounded'>
                        <div>If dubbing is completed video will be available here and video will be send on email.</div>
                    </div>
                </div>
            ) : fileUrl ? (
                <div className="flex flex-col items-center justify-center">
                    {fileUrl && (
                        <div>

                            <div className='flex items-center justify-center lg:mt-4 lg:mb-6 px-5 py-2.5 text-black text-3xl font-semibold rounded'>
                                <div>File Preview</div>
                            </div>
                            <div>
                            <embed src={fileUrl} width="500" height="350" type="application/pdf" />
                            </div>
                            <div className='mt-8 flex flex-col items-center justify-center'>
                            <a href={fileUrl} download>
                                <div class="button" data-tooltip="Size: 20Mb">
                                <div class="button-wrapper">
                                <div class="text">Download</div>
                                    <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg>
                                    </span>
                                </div>
                                </div>
                            </a>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                <div className="flex flex-col items-center justify-center">
                <img
                    src={Dub_Image} width={"450px"} height={"150px"}
                    alt="Dubbing the video"
                />
                
                <button className="bg-black text-white hover:bg-gray-900 py-3 px-6 rounded mt-6" onClick={handleButtonClick}>
                    Lets Generate with us
                </button>
                </div>    
                </div>
            )}
        </div>
    );
};

export default SubtitlesDownload;
