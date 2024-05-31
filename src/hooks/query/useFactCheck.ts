import { post } from "@/api/client.ts";

export type responseType = {
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

export const postGetResult = (youtubeUrl: string): Promise<responseType> => {
  return post("/get-result", { url: youtubeUrl });
};
