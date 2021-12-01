import express from "express";
import axios, { AxiosError } from "axios";
import { Request, Response } from "express";
import { coinbaseClient } from "../integration/coinbaseClient";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import {
  CoinbaseUser,
  ExchangeRates,
  UserResponse,
} from "../types/coinbase.types";
import { isValidCurrencyCode } from "../common/validators";

const router = express();

const handleError = (error: AxiosError | any, res: Response) => {
  if (axios.isAxiosError(error)) {
    console.log(error.message);
  } else {
    console.log(error);
  }
  res.status(500).send();
};

router.get("/user", async (req: Request, res: Response) => {
  try {
    const coinbaseResponse = await coinbaseClient.getCounbaseUser();
    const userResponse: UserResponse = coinbaseResponse.data;
    const user: CoinbaseUser = userResponse.data;
    res.status(200).send(user);
  } catch (err: AxiosError | any) {
    handleError(err, res);
  }
});

router.get("/exchange-rates", async (req: Request, res: Response) => {
  const currencyCode: string = String(req.query.currency);
  if (!isValidCurrencyCode(currencyCode)) {
    res.status(StatusCodes.BAD_REQUEST).send({error: 'Invalid or missing currency code'});
  }
  try {
    const exchangeRatesResponse = (
      await coinbaseClient.getExchangeRates(currencyCode)
    ).data;
    const exchangeRates: ExchangeRates = exchangeRatesResponse.data;
    res.status(200).send(exchangeRates);
  } catch (err: AxiosError | any) {
    handleError(err, res);
  }
});

export = router;
