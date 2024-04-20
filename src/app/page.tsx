"use client";
import { useState, useEffect, FC } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import LaptopSharpIcon from "@mui/icons-material/LaptopSharp";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import ExpandLessSharpIcon from "@mui/icons-material/ExpandLessSharp";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
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

const starsArray = new Array(5).fill(null);

const StarRating: FC<StarRatingProps> = ({ rating = 0 }) => {
  return (
    <div className="flex flex-row mx-2">
      {starsArray.map((_, index) => (
        <span key={`star ${index}`} className="text-yellow-400 text-lg">
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

const Overview = () => {
  const [overviewData, setOverviewData] = useState<OverviewProps | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchOverview = async () => {
      const response = await fetch("/api/fetchOverview");
      const data: OverviewProps = await response.json();
      setOverviewData(data);
      setLoading(false);
    };
    fetchOverview();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col p-5">
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot style={{ backgroundColor: "#483D8B" }}>
              <BarChartIcon className="bg-darkBlue" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className="flex flex-col mt-2">
              <h1 className="text-lg font-semibold">Summary</h1>
              <p className="text-tmuted text-sm">{overviewData?.summary}</p>
            </div>
          </TimelineContent>
        </TimelineItem>
        <AttributeCard category="Communication" data={overviewData?.communication}/>
        <AttributeCard category="Problem Solving" data={overviewData?.problemSolving}/>
        <AttributeCard category="Algorithms" data={overviewData?.algo} />
        <AttributeCard category="Coding" data={overviewData?.coding} />
      </Timeline>
    </main>
  );
};

export default Overview;
