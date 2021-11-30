import { Request, Response } from 'express';

const getIndex = async(req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Yeah bitches!!'
  })
}

export default {getIndex}