import { postGetResult } from "@/hooks/query/useFactCheck";
import { responseType, responseDataType } from "@/hooks/query/useFactCheck";
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

export function InputWithButton() {
  const contextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<responseDataType | null>(null);

  const handleGetResult = async () => {
    try {
      setResult(undefined);
      setIsLoading(true);
      const data = await postGetResult(contextRef.current.value);
      setIsLoading(false);
      setResult(data?.result);
    } catch (error) {
      console.error("Error fetching result:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mt-10 mb-10">
        가짜뉴스 탐지 AI 서비스
      </h1>

      <div className="flex w-full max-w-xl items-center space-x-2 mt-10 mb-10">
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
                <span style={{ fontWeight: "bold", color: "cadetblue" }}>
                  {result.subject}
                </span>
                의 사실 정확도는{" "}
                <span style={{ fontWeight: "bold", color: "indianred" }}>
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
