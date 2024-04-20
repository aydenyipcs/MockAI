import type { NextApiRequest, NextApiResponse } from "next";
import { overviewData } from "../../../public/mockData";

export default function fetchHeaderData(
  req: NextApiRequest,
  res: NextApiResponse<OverviewProps>
) {
  res.status(200).json(overviewData);
}
