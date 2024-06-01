import { post } from "@/api/client.ts";

export type responseType = {
  result: responseDataType;
};
export type responseDataType = {
  code: string;
  percentage: number;
  subject: string;
  summary: string;
  news: newsListType[];
};
export type newsListType = {
  title: string;
  link: string;
};

export const postGetResult = async (
  youtubeUrl: string,
): Promise<responseType> => {
  return await post("/get-result", { url: youtubeUrl });
};
