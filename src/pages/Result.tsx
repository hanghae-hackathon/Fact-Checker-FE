import { useFactCheck } from "@/api/factCheck";
import React, { useState } from "react";
import { useQuery } from "react-query";

interface FactCheckData {
    userId: number;
    id: number;
    title: string;
  }

const Result = () => {
    const url= 'https://www.youtube.com/watch?v=hKkjoyO_CzA'
const { data, isLoading, error } = useFactCheck(url);

//   if (isLoading) {
//     console.log("fetching data...");
//   }

//   if (error) {
//     console.log(error);
//   }

return (
    <>
      <ul style={{textAlign : 'left'}}>
        <li>userId : {data?.userId}</li>
        <li>id : {data.id}</li>
        <li>title : {data.title}</li>
      </ul>
    </>
  );

};

export default Result;