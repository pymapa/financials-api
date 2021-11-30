import express from "express";
import axios, { AxiosError } from "axios";
import { Request, Response } from "express";
import { coinbaseClient } from "../integration/coinbaseClient";
import { CoinbaseUser } from "../types/coinbase.types";

const router = express();

router.get("/user", async (req: Request, res: Response) => {
  try {
    const data = await coinbaseClient.getCounbaseUser();
    const user: CoinbaseUser = data.data
    console.log(user);
    res.status(200).send();
  } catch (err: AxiosError | any) {
    if (axios.isAxiosError(err)) {
      console.log(err.message);
      console.log(err.config);
    } else {
      console.log(err)
    }
    res.status(500).send();
  }
});

// export const coinbaseController = {
//   getAuthentication: async (req: Request, res: Response) => {
//     try {
//       const data = await coinbaseClient.getAuthInfo();
//       console.log(data.name)
//       res.send(data);
//     } catch (err: AxiosError | any) {
//       if (axios.isAxiosError(err)) {
//         console.log(err.message)
//         console.log(err.config)
//       }
//       res.status(500).send();
//     }
//   }
// }

export = router;
