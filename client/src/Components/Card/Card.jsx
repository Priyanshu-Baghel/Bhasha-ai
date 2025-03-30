import React from 'react';
import { useAuth } from '../../store/auth';
import { Link } from "react-router-dom";
import Course_Image from "../../Assets/courses/Course.png";

const Card = () => {

  const { courses } = useAuth();
  console.log(courses);

  return (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {courses.map((curElem, index) => {
        const { course_name, course_description, language, platform } = curElem;
        return (
          <div key={index} className="rounded-md border">
            <img
              src={Course_Image}         
              alt="Course"
              className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
            />
            <div className="p-4">
              <h1 className="inline-flex items-center text-lg font-semibold">{course_name}</h1>
              <p className="mt-3 text-sm text-gray-600">
                {course_description}
              </p>
              <div className="mt-4">
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  #{language}
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  #Hindi
                </span>
                <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                  #Tamil
                </span>
              </div>
              <p className="mt-3 text-medium text-gray-600">
                Platform - {platform}
              </p>
              <Link to="/viewcourse" state={{ course: curElem }}>          
                <button
                  type="button"
                  className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  View Course
                </button>
              </Link>
            </div>
          </div>);
      })}
    </div>
  );
}

export default Card;
