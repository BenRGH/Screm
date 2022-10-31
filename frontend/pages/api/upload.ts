// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from "formidable";

type IResponseData = {
  name: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse //<Data>
) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (!fields.collection || !files) {
      return res.status(400).json({ data: 'Data not found' });
    }

    uploadFile(files.file);

    return res.status(201).json({ data: `Collection: ${fields.collection} - Files: ${Object.keys(files).length}` });
  });
}

const uploadFile = async (file: any) => {

};
