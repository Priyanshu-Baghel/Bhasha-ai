import React from "react";
import { BACKEND_URI } from "../../config/contants";

const UploadsList = ({ medias }) => {
  return (
    <div className="lg:mr-5 lg:mt-10">
      <div className="col-md-12 ">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th width="200" >Name</th>
              <th>Videos</th>
            </tr>
          </thead>
          <tbody>
            {medias &&
              medias.map((media) => {
                return (
                  <tr>
                    <th width="200">{media.name}</th>
                    <td>
                      {media.videos.map((video) => {
                        return (
                          <video
                            preload="auto"
                            width="320"
                            height="240"
                            controls
                          >
                            <source src={`${BACKEND_URI}${video}`} />
                            ;Your browser does not support the video tag.
                          </video>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadsList;
