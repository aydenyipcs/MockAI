"use client";

import React, { useEffect, useRef, useState } from "react";
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

      // wavesurfer.current.on("audioprocess", () => {
      //   const currTime = wavesurfer.current?.getCurrentTime();
      //   if(currTime) setTime(currTime);
      // });

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

  // const handlePlay = () => {
  //   wavesurfer.current?.playPause()
  //   const playing = wavesurfer.current?.isPlaying()
  //   if(playing !== undefined) setIsPlaying(playing);
  // };

  // const handleSliderStart = () => {
  //   if (wavesurfer.current) {
  //     wavesurfer.current.pause();
  //     setIsPlaying(false);
  //   }
  // };

  // const handleSliderEnd = () => {
  //   if (wavesurfer.current) {
  //     wavesurfer.current.play();
  //     setIsPlaying(true);
  //   }
  // };

  // const handleSlider = (event: ChangeEvent<HTMLInputElement>) => {
  //   const time = Number(event.target.value);
  //   if (wavesurfer.current && duration) {
  //     wavesurfer.current?.seekTo(time / duration);
  //     setTime(time);
  //   }
  // };

  return (
    <div className="flex-1 h-auto w-full mt-12 relative overflow-hidden">
      <div
        ref={waveformRef}
        className="transform rotate-90 origin-top-left translate-x-full absolute top-0 left-[-30px] w-full"
      />
      {/* <div className="flex flex-row w-full justify-center items-center h-4">
        <button onClick={handlePlay}>
          {isPlaying ? <PauseSharpIcon /> : <PlayArrowSharpIcon />}
        </button>
        <input
          type="range"
          value={time}
          onMouseUp={handleSliderEnd}
          onMouseDown={handleSliderStart}
          onInput={handleSlider}
          step="0.01"
          min={0}
          max={duration}
          className="w-4/5"
        ></input>
        <p className="text-tmuted ml-2 italic">{`${formatTime(
          time ? time : 0
        )} / ${formattedDuration}`}</p>
      </div> */}
    </div>
  );
};

export default AudioPlayer;
