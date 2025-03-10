import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function SuggestedVideo({ video }) {
  return (
    <div className="w-full p-2 sm:p-3 md:p-4">
      <Link to={`/video/${video?.videoId}`}>
        <div className="flex mb-3">
          {/* Thumbnail & duration */}
          <div className="relative h-24 sm:h-28 md:h-32 lg:h-20 xl:h-24 w-40 sm:w-44 md:w-48 lg:w-32 xl:w-40 rounded-xl overflow-hidden hover:rounded-none transition-all duration-200">
            <img
              className="h-full w-full object-cover rounded-lg"
              src={video?.thumbnails[0]?.url}
              alt="Video Thumbnail"
            />
            {video?.lengthSeconds && <Time time={video?.lengthSeconds} />}
          </div>

          {/* Video Details */}
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm sm:text-base md:text-lg lg:text-xs xl:text-sm font-bold line-clamp-2">
              {video?.title}
            </span>
            <span className="text-xs sm:text-sm md:text-base lg:text-[10px] xl:text-[12px] font-semibold mt-2 flex items-center">
              {video?.author?.title}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="text-gray-600 ml-1 text-xs sm:text-sm md:text-base" />
              )}
            </span>
            <div className="flex text-xs sm:text-sm md:text-base lg:text-[10px] xl:text-[12px] font-semibold truncate overflow-hidden">
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
              <span className="mx-1 text-lg leading-none relative top-[-2px]">·</span>
              <span className="truncate">{video?.publishedTimeText}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SuggestedVideo;