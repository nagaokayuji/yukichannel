import React, { useEffect, useMemo, useRef } from "react";
import Hls from "hls.js";

const Player = ({ src }) => {
  const isSupportBrowser = useMemo(() => Hls.isSupported(), []);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isSupportBrowser) {
      var hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      return () => {
        hls.removeAllListeners();
        hls.stopLoad();
      };
    } else {
      try {
        videoRef.current.src = src;
        videoRef.current.play();
      } catch (e) {
        console.warn(e);
      }
    }
    // eslint-disable-next-line
  }, [src]);
  return (
    <>
      <div className="content">
        {isSupportBrowser ? (
          <div className="videoContainer">
            <video ref={videoRef} className="video" controls></video>
          </div>
        ) : (
          <div className="notSupportBrowser">
            <video ref={videoRef} className="video"></video>
          </div>
        )}
      </div>
      <style>{`
        .video {
          width: 100%;
          height: auto;
        }
      `}</style>
    </>
  );
};

export default Player;
