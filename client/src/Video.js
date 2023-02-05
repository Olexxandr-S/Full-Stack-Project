import React from "react";

function Video({ video }) {
  const url = video.url.replace("watch?v=", "embed/");
  return (
    <iframe
      title={video.title}
      height={"185"}
      width={"330"}
      src={url}
      alt={`video ${video.title}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    />
  );
}

export default Video;
