import { useRef } from "react";
import moment from "moment";

function formatTime(secs: number) {
  return moment.utc(secs * 1000).format("mm:ss");
}

const AudioTranscript = ({
  transcript,
  setTime,
  duration,
}: TranscriptProps) => {
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const position = scrollTop / (scrollHeight - clientHeight);
    const currTime = position * transcript[transcript.length - 1].time;
    setTime(currTime);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-row w-full mt-5">
        <h1 className="italic w-1/2 text-center text-xl font-semibold border-b-2 mr-5">
          Interview
        </h1>
        <h1 className="italic w-1/2 text-center text-xl font-semibold border-b-2 ml-5">
          AI Suggestions
        </h1>
      </div>
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col w-full overflow-y-auto no-scrollbar"
        onScroll={handleScroll}
      >
        {transcript.map((transcript, index) => (
          <div key={index} className="flex flex-row">
            <div className="flex-1 w-1/2 p-5 border-r-2">
              <p className="text-sm text-tmuted italic">{formatTime(transcript.time)}</p>
              <p
                className={`font-semibold ${
                  transcript.speaker === "Interviewer"
                    ? "text-primary"
                    : transcript.feedback
                    ? "text-red-500"
                    : "text-lightBlue"
                }`}
              >
                {transcript.text}
              </p>
            </div>
            <div className="flex-1 w-1/2 p-5">
              {transcript.feedback && (
                <>
                  <p className="font-semibold mt-5">
                    {transcript.feedback.suggestion}
                  </p>
                  <br></br>
                  <p className="italic">{transcript.feedback.explanation}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioTranscript;
