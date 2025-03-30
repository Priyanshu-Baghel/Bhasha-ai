import React from 'react'
import UploadVideo from '../../Components/Upload/UploadVideo'
import UploadSubtitles from '../../Components/Upload/UploadSubtitles'

const Subtitles = () => {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen py-12 gap-4 bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-4xl font-bold text-center mb-4">Upload Video</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
           Subtitles video is less than 20Mb or 2 min.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <UploadSubtitles />
       </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Subtitles