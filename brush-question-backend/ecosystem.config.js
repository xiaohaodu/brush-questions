module.exports = {
  apps: [
    {
      name: "brush-question-backend", // app name
      script: "./app.js", // 启动执行文件
      watch: true,
      instances: "1", //fork模式下有且仅能有一个
      exec_mode: "fork",
      watch_delay: 1000, // 文件变化后，延迟重启时间
      ignore_watch: ["node_modules"], // 监听忽略路径
    },
  ],
};
