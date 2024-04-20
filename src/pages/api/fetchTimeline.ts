import type { NextApiRequest, NextApiResponse } from "next";
import { transcriptData } from "../../../public/mockData";

export default function fetchHeaderData(
  req: NextApiRequest,
  res: NextApiResponse<{url: string}>
) {
  const url = "/audio.wav"

  const data = {
    url: url,
    transcript: transcriptData,
    coding: 'hello'
  }
  
  res.status(200).json(data);
}
