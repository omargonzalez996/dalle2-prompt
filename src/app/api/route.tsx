import { Configuration } from "openai";

export const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
