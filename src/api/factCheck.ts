import { useQuery } from "react-query";

// export const useFactCheck = () => {
//   const url = 'https://jsonplaceholder.typicode.com/todos/1';
//   return useQuery("factCheck", () =>
//     fetch(url).then((res) => {
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return res.json();
//     })
//   );
// };

export const useFactCheck = (userInput: string) => {
  const url = "http://172.190.90.75:5000/get-result";
  const data = { url: userInput };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  // Invoke useQuery inside a React component function
  return useQuery("factCheck", async () => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
