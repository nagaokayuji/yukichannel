import {useEffect, useMemo, useRef} from "react";
import Hls from "hls.js";

const Player = ({ src }) => {
  const isSupportBrowser = useMemo(() => Hls.isSupported(), []);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isSupportBrowser && videoRef.current) {
      var hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      return () => {
        hls.removeAllListeners();
        hls.stopLoad();
      };
    } else {
      try {
        if (videoRef.current) {
          videoRef.current.src = src;
        }
      } catch (e) {
        console.warn(e);
      }
    }
    return () => { };
    // eslint-disable-next-line
  }, [src]);
  return (
    <>
      <div className="content">
        {isSupportBrowser ? (
          <div className="videoContainer">
            <video ref={videoRef} className="video" controls muted></video>
          </div>
        ) : (
          <div className="notSupportBrowser">
            <video
              ref={videoRef}
              className="video"
              controls
                playsInline
            ></video>
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
