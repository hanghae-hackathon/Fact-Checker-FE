import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: "https://172.190.90.75",
  withCredentials: false,
});

function interceptorResponseFulfilled(res: AxiosResponse) {
  return res.status >= 200 && res.status < 300
    ? res.data
    : Promise.reject(res.data);
}

instance.interceptors.response.use(interceptorResponseFulfilled);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}

export function post<T>(url: string, data: unknown): Promise<T> {
  return instance
    .post<unknown, AxiosResponse<T>>(url, data)
    .then((response) => {
      return response.data;
    });
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T, T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
