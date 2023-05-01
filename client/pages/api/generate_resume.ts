import { NextApiRequest, NextApiResponse } from "next";

import axios from "@/services/axios";

const generateResume = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.get(`/printer`, {
    data: req.body
  }).then(res => res.data)
    .catch(err => {
    console.error(err);
    return null;
  })

  const file = await fetch(response)
    .then(res => res.blob())
    .catch(err => {
      console.error(err);
      return null;
    })

  if (!file) {
    return res.status(500).send('Something went wrong!');
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=my_resume.pdf`);
  res.setHeader('Content-Length', file.size);

  res.send(Buffer.from(await file.arrayBuffer()));
}

export default generateResume;
