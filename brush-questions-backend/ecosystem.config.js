module.exports = {
    apps: [{
        name: "BrushQuestion", // app name
        script: "./app.js", // 启动执行文件
        watch: true,
        instances: "max",
        exec_mode: "cluster",
        watch_delay: 1000, // 文件变化后，延迟重启时间
        ignore_watch: ['node_modules'] // 监听忽略路径
    }]
};