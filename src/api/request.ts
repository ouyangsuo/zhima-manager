import axios from "axios";

const instance = axios.create({
  // baseURL: "https://lekuzhima.club",
  baseURL: "/api",
  timeout: 3000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers["Authorization"] = `Bearer this is my token`;
    return config;
  },

  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },

  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/* 处理错误 */
const handleErr = (when, err) => {
  console.log();
  console.log("====================");
  console.log("err occured when", when);
  console.log(err);
  console.log("====================");
  console.log();
};

/* 通用CRUD */
export async function doGet(url, conf) {
  try {
    const ret = await instance.get(url, conf);
    return ret;
  } catch (error) {
    handleErr(`doGet@${url}`, error);
  }
}

export async function doPost(url, data, conf) {
  try {
    const ret = await instance.post(url, data, conf);
    return ret;
  } catch (error) {
    handleErr(`doPost@${url}`, error);
  }
}

export function doDelete(url, conf) {
  return instance.delete(url, conf);
}

export function doPut(url, data, conf) {
  return instance.put(url, data, conf);
}
