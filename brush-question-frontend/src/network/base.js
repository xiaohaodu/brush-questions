//base用于管理接口域名
//域名统一管理

const base = {
  url: process.env.NODE_ENV === "production" ? "api" : "http://127.0.0.1:8090",
};

export default base;
