import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Crypto from "crypto";
import { ExchangesResponse, UserResponse } from "../types/coinbase.types";

const baseURL = "https://api.coinbase.com";
const client = axios.create({ baseURL: baseURL });

const apiKey = process.env.COINBASE_API_KEY || "";
const apiSecret = process.env.COINBASE_API_SECRET || "";

const getSignature = (
  req: AxiosRequestConfig,
  timeStamp: Number,
  secret: string
) => {
  const path = req.url?.replace(baseURL, "");
  const message = timeStamp + req.method! + path + (req.data || "");
  return Crypto.createHmac("sha256", secret).update(message).digest("hex");
};

const getHeaders = (request: AxiosRequestConfig): {} => {
  const timeStamp = Math.floor(Date.now() / 1000);
  const signature = getSignature(request, timeStamp, apiSecret);
  return {
    Accept: "application/json",
    "Content-type": "application/json",
    "CB-ACCESS-KEY": apiKey,
    "CB-ACCESS-SIGN": signature,
    "CB-ACCESS-TIMESTAMP": timeStamp,
  };
};

export const coinbaseClient = {
  getCounbaseUser: (): Promise<AxiosResponse<UserResponse>> => {
    const request: AxiosRequestConfig = {};
    request.url = "/v2/user";
    request.method = "GET";
    request.headers = getHeaders(request);
    return client.get(request.url, request);
  },

  getExchangeRates: (
    currency: string
  ): Promise<AxiosResponse<ExchangesResponse>> => {
    const request: AxiosRequestConfig = {
      url: "/v2/exchange-rates?currency=" + currency,
      method: "GET",
    };
    request.headers = getHeaders(request);
    return client.get(request.url!, request)
  },
};
