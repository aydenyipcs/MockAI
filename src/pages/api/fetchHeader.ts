import type { NextApiRequest, NextApiResponse } from "next";
import {headerData} from '../../../public/mockData'

export default function fetchHeaderData(
  req: NextApiRequest,
  res: NextApiResponse<HeaderProps>
) {
  res.status(200).json(headerData);
}
