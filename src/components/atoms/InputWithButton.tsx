import { postGetResult } from "@/hooks/query/useFactCheck";
import { responseType } from "@/hooks/query/useFactCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { TEXT } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import "./index.css";

// const mock = {
//   code: "success",
//   percentage: 71,
//   subject: "서울 도심 까마귀 출현",
//   summary:
//     "서울에서 까마귀가 민간인을 공격하는 사건은 사실입니다. 최근 서울 도심에서 까마귀가 사람을 공격하는 사례가 늘어나고 있으며, 이는 주로 까마귀의 새끼들이 둥지를 떠나는 시기인 5월에서 6월 사이에 발생하는 것으로 보고됩니다. 전문가들은 이 기간 동안 까마귀가 새끼를 보호하려는 본능 때문에 사람을 위협으로 느껴 공격성을 보일 수 있다고 설명합니다.주민들은 이러한 공격성 때문에 공포를 느끼고 있으며, 일부 지역에서는 까마귀 출몰 구역에 안전선을 설치해 주민 출입을 통제하기도 했습니다.",
//   news: [
//     {
//       link: "https://www.ytn.co.kr/_ln/0103_202405291506066773",
//       title: "까마귀 습격' 잇단 제보...서울 한복판서 공격당해 [앵커리포트]",
//     },
//     {
//       link: "https://news.nate.com/view/20240529n01764",
//       title: "[제보는Y] 강남 한복판에서 '까마귀 습격'...\"번식기 영향\"",
//     },
//     {
//       link: "https://namu.wiki/w/%EA%B9%8C%EB%A7%88%EA%B7%80",
//       title: "까마귀",
//     },
//     {
//       link: "https://science.ytn.co.kr/program/view.php?mcd=0082&key=202405291115040451",
//       title: "[제보는Y] 강남 한복판에서 '까마귀 습격'...\"번식기 영향\"",
//     },
//     {
//       link: "https://www.newsis.com/view/?id=NISX20240529_0002752574",
//       title: '"새가 사람 공격한다"…도심 한복판서 까마귀 습격',
//     },
//     {
//       link: "https://www.fnnews.com/news/202405290956099131",
//       title: "강남 한복판 걷다 '뒤통수' 쪼였다..'까마귀 습격'에 무대책",
//     },
//     {
//       link: "http://news.sbs.co.kr/news/endPage.do?news_id=N1007666969",
//       title:
//         "\"나도 길 가다 당했다\" 쏟아진 제보…'까마귀 공격' 급증 - SBS 뉴스",
//     },
//   ],
// };

export function InputWithButton() {
  const contextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<responseType | null>(null);

  const handleGetResult = async () => {
    try {
      setIsLoading(true);
      const data = await postGetResult(contextRef.current.value);
      //       setResult(mock);
      setIsLoading(false);
      setResult(data);
    } catch (error) {
      console.error("Error fetching result:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mt-10 mb-10">
        가짜뉴스 탐지 AI 서비스
      </h1>

      <div className="flex w-full max-w-sm items-center space-x-2 mt-10 mb-10">
        <Input
          type="text"
          placeholder={TEXT.INPUT_PLACEHOLDER}
          className="fact-input"
          ref={contextRef}
        />
        <Button
          type="submit"
          className="fact-button"
          onClick={() => handleGetResult()}
        >
          검사
        </Button>
      </div>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="mb-4">검색 결과</CardTitle>
            <CardDescription className="max-w-lg">
              <p className="py-1 text-lg">
                {" "}
                <span style={{ fontWeight: "bold", color: "blue" }}>
                  {result.subject}
                </span>
                의 사실 정확도는{" "}
                <span style={{ fontWeight: "bold", color: "red" }}>
                  {result.percentage}%
                </span>
                입니다.
              </p>
              <p className="py-1 text-sm text-left">{result.summary}</p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CardTitle className="mb-4">뉴스 출처</CardTitle>
            <ul className="text-left">
              {result.news.map((source, index) => (
                <li key={index} className="py-1">
                  <a
                    href={source.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {isLoading && <div className="lds-dual-ring"></div>}
    </div>
  );
}
