import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  console.log(req.method);

  res.json({ ok: true });
};

export default handler;
