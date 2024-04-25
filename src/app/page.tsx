"use client";
import { useState, useEffect } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AttributeCard from "./components/attributeCard";

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
