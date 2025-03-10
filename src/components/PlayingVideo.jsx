import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/rapidapi";
import ReactPlayer from "react-player";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestedVideo from "./SuggestedVideo";
import { BsFillCheckCircleFill } from "react-icons/bs";

function PlayingVideo() {
  const [video, setVideo] = useState();
  const [realatedVideo, setRelativeVideo] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideo();
  }, [id]);

  const fetchVideoDetails = () => {
    fetchData(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
    });
  };
  
  const fetchRelatedVideo = () => {
    fetchData(`video/related-contents/?id=${id}`).then((res) => {
      setRelativeVideo(res);
    });
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] mt-16 px-4 md:px-6">
      <div className="w-full max-w-[1580px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-2 md:px-4 py-3 lg:py-6">
          <div className="h-[200px] sm:h-[300px] md:h-[450px] lg:h-[550px] xl:h-[700px] w-full">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              height="100%"
              width="100%"
              controls
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-11 w-11 rounded-full overflow-hidden">
                <img className="h-full w-full object-cover" src={video?.author?.avatar[0]?.url} alt="Author"/>
              </div>
              <div className="flex flex-col">
                <div className="text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-gray-500 text-xs ml-1" />
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all">
                Subscribe
              </button>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-4">
              <div className="flex items-center justify-center h-10 px-4 rounded-3xl bg-gray-200">
                <AiOutlineLike className="text-lg mr-2" />
                {`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}
              </div>
              <div className="flex items-center justify-center h-10 px-4 rounded-3xl bg-gray-200">
                {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl mt-4 text-sm">
            {video?.description}
          </div>
          <div className="flex gap-x-4 font-semibold rounded-xl mt-4 text-lg">
            {video?.stats?.comments} <p>Comments</p>
          </div>
        </div>
        <div className="flex flex-col px-2 md:px-4 py-6 h-[calc(100vh-4.625rem)] overflow-y-scroll lg:w-[350px] xl:w-[400px]">
          {realatedVideo?.contents?.map((item, index) => (
            item?.type === "video" && <SuggestedVideo key={index} video={item?.video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayingVideo;