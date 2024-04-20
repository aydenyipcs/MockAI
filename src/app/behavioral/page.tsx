"use client";
import React, { useEffect, useState } from "react";
import AudioPlayer from "../components/audioPlayer";
import AudioTranscript from "../components/audioTranscript";

const Behavioral = () => {
  const [data, setData] = useState<TimelineProps | null>(null);
  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch("/api/fetchTimeline");
        if (!response.ok) {
          throw new Error(`HTTP error`);
        }
        const data:TimelineProps = await response.json();
        setData(data);
      } catch (err) {
        console.error("Failed to fetch timeline", err);
      }
    };
    fetchAudio();
  }, []);

  return (
    <main className="flex flex-row flex-1 min-h-0 ml-10">
      {data?.transcript && (
        <AudioTranscript
          transcript={data?.transcript}
          setTime={setTime}
          duration={duration}
        />
        )}
        {data?.url && (
          <div className="flex flex-col w-24 flex-shrink-0">
            <AudioPlayer
              url={data.url}
              time={time}
              duration={duration}
              setDuration={setDuration}
            />
          </div>
        )}
    </main>
  );
};

export default Behavioral;
