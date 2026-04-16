// ============================================
// YOUTUBE PLAYER COMPONENT
// YouTube iFrame Player với API control
// ============================================

import { useEffect, useRef, useState } from 'react';

export default function YouTubePlayer({ videoId, startTime, endTime, onReady, onStateChange, className }) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (!containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          start: Math.floor(startTime || 0),
          end: Math.floor(endTime || 0),
        },
        events: {
          onReady: (event) => {
            setIsReady(true);
            if (onReady) onReady(event);
          },
          onStateChange: (event) => {
            if (onStateChange) onStateChange(event);
          },
        },
      });
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Expose player methods globally
  useEffect(() => {
    if (isReady && playerRef.current) {
      // Always store player reference globally for seekToTime to work
      window.currentYTPlayer = playerRef.current;
    }
  }, [isReady]);

  return (
    <div className={className}>
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
}

// Helper functions to control player
export const seekToTime = (time) => {
  if (window.currentYTPlayer && window.currentYTPlayer.seekTo) {
    window.currentYTPlayer.seekTo(time, true);
    window.currentYTPlayer.playVideo();
  }
};

export const playVideo = () => {
  if (window.currentYTPlayer && window.currentYTPlayer.playVideo) {
    window.currentYTPlayer.playVideo();
  }
};

export const pauseVideo = () => {
  if (window.currentYTPlayer && window.currentYTPlayer.pauseVideo) {
    window.currentYTPlayer.pauseVideo();
  }
};
