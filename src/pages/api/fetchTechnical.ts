import type { NextApiRequest, NextApiResponse } from "next";
import { technicalData } from "../../../public/mockData";

export default function fetchTechnicalData(
  req: NextApiRequest,
  res: NextApiResponse<TechnicalProps>
) {
  res.status(200).json(technicalData);
}
