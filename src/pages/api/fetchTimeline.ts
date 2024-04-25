import type { NextApiRequest, NextApiResponse } from "next";
import { transcriptData } from "../../../public/mockData";

export default function fetchTimelineData(
  req: NextApiRequest,
  res: NextApiResponse<TimelineProps>
) {
  const url = "/audio.wav"

  const data = {
    url: url,
    transcript: transcriptData,
  }
  
  res.status(200).json(data);
}
