"use client";

import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioPlayer = ({
  url,
  time,
  duration,
  setDuration,
}: AudioProps) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>();

  const waveformWidth = window.innerHeight * 0.7;

  useEffect(() => {
    if (url && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        normalize: true,
        waveColor: "#7db9e8",
        progressColor: "#0047ab",
        cursorWidth: 0,
        barWidth: 2,
        barHeight: 3,
        height: "auto",
        width: waveformWidth,
      });

      wavesurfer.current.load(url);

      wavesurfer.current.on("ready", () => {
        const duration = wavesurfer.current?.getDuration();
        if (duration) setDuration(duration);
      });

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
          wavesurfer.current = null;
        }
      };
    }
  }, [url]);

  useEffect(() => {
    if (wavesurfer.current && time && duration) {
      const percentage = time / duration;
      wavesurfer.current.seekTo(percentage);
    }
  }, [time]);

  return (
    <div className="flex-1 h-auto w-full mt-12 relative overflow-hidden">
      <div
        ref={waveformRef}
        className="transform rotate-90 origin-top-left translate-x-full absolute top-0 left-[-30px] w-full"
      />
    </div>
  );
};

export default AudioPlayer;