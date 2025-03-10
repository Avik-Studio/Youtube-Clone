import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function Video({ video }) {
  return (
    <div className="w-full p-2 sm:p-3 md:p-4 lg:p-5">
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex flex-col">
          {/* Thumbnail & duration */}
          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 rounded-lg overflow-hidden hover:rounded-none transition-all duration-200">
            <img
              className="h-full w-full object-cover"
              src={video?.thumbnails[0]?.url}
              alt="Video Thumbnail"
            />
            {video?.lengthSeconds && <Time time={video?.lengthSeconds} />}
          </div>

          {/* Channel logo & title */}
          <div className="flex mt-3 space-x-3">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full overflow-hidden border">
                <img
                  className="h-full w-full object-cover"
                  src={video?.author?.avatar[0].url}
                  alt="Channel Avatar"
                />
              </div>
            </div>
            <div className="flex-1">
              <span className="text-sm sm:text-base font-bold line-clamp-2">
                {video?.title}
              </span>
              <span className="flex items-center font-semibold mt-1 text-xs sm:text-sm text-gray-600">
                {video?.author?.title}
                {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-gray-600 ml-1 text-xs sm:text-sm" />
                )}
              </span>
              <div className="flex text-gray-500 text-xs sm:text-sm">
                <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
                <span className="mx-1 text-lg leading-none relative top-[-2px]">·</span>
                <span>{video?.publishedTimeText}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Video;
