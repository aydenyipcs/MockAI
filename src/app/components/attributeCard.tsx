"use client";
import { useState, FC } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import LaptopSharpIcon from "@mui/icons-material/LaptopSharp";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const emoji = {
    Communication: <KeyboardVoiceIcon className="bg-cyan" />,
    "Problem Solving": <EmojiObjectsOutlinedIcon className="bg-yellow" />,
    Algorithms: <CalculateOutlinedIcon className="bg-midGreen" />,
    Coding: <LaptopSharpIcon className="bg-onyx" />,
  };
  const backgroundColor = {
    Communication: "#008B8B",
    "Problem Solving": "#bb8c17",
    Algorithms: "#004953",
    Coding: "#353839",
  };

const starsArray = new Array(5).fill(null);

const StarRating: FC<StarRatingProps> = ({ rating = 0 }) => {
  return (
    <div className="flex flex-row mx-2">
      {starsArray.map((_, index) => (
        <span key={`star ${index}`} className="text-black-500 text-lg">
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};



const AttributeCard: FC<AttributeCardProps> = ({ category, data }) => {
    const [expanded, setExpanded] = useState<Boolean>(false);
  
    const handleExpansion = () => {
      setExpanded((prev) => !prev);
    };
    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            style={{ backgroundColor: `${backgroundColor[category]}` }}
          >
            {emoji[category]}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className="flex flex-row mt-2.5">
            <h1 className="text-lg font-semibold">{category}</h1>
            <StarRating rating={data?.rating} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row rounded-2xl text-tmuted text-sm">
              <div className="flex flex-col flex-1 justify-center">
                {data?.strengths.map((strength, index) => (
                  <p key={`str ${index}`} className="italic">+ {strength}</p>
                ))}
              </div>
              <div className="my-1"></div>
              <div className="flex flex-col flex-1">
                {data?.weaknesses.map((weakness, index) => (
                  <p key={`weak ${index}`} className="italic">- {weakness}</p>
                ))}
              </div>
              <div className="flex items-center">
                <ExpandMoreSharpIcon
                  className="hover:cursor-pointer"
                  style={{
                    transition: "transform 0.3s",
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  onClick={() => handleExpansion()}
                />
              </div>
            </div>
            <div
              className={`transiton-all duration-500 overflow-hidden ${
                expanded ? "max-h-96" : "max-h-0"
              }`}
            >
              <hr className="my-2 border-t-2 border-grey-300" />
              <p className="text-sm text-tmuted">{data?.feedback}</p>
            </div>
          </div>
        </TimelineContent>
      </TimelineItem>
    );
  };

  export default AttributeCard;