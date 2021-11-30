import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Crypto from "crypto";
import { CoinbaseUser } from "../types/coinbase.types";

const baseURL = "https://api.coinbase.com";

const apiKey = process.env.COINBASE_API_KEY || "";
const apiSecret = process.env.COINBASE_API_SECRET || "";

const getSignature = (
  req: AxiosRequestConfig,
  timeStamp: Number,
  secret: string
) => {
  const message = timeStamp + req.method! + '/v2/user' + (req.data || '');
  return Crypto.createHmac("sha256", secret).update(message).digest("hex");
};

const getSecurityHeaders = (request: AxiosRequestConfig): {} => {
  const timeStamp = Math.floor(Date.now() / 1000);
  const signature = getSignature(request, timeStamp, apiSecret)
  return {
    "CB-ACCESS-KEY": apiKey,
    "CB-ACCESS-SIGN": signature,
    "CB-ACCESS-TIMESTAMP": timeStamp,
  };
};

export const coinbaseClient = {

  getCounbaseUser: (): Promise<AxiosResponse<CoinbaseUser>> => {
    const request: AxiosRequestConfig = {};
    request.url = baseURL + "/v2/user";
    request.method = "GET";
    request.headers = {
      "Accept": "application/json",
      "Content-type": "application/json",
      ...getSecurityHeaders(request)
    };
    return axios.get(request.url, request);
  },
};
