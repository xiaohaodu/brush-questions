# Brush Questions

一个完整的刷题练习平台，包含前后端代码。

## 项目特性

- 完整的前后端分离架构
- Docker 部署支持
- 包含刷题功能和用户管理
- 使用 pnpm monorepo 管理

## 技术栈

### 前端
- Vue 3
- TypeScript

### 后端
- Node.js
- MySQL 数据库

## 环境要求

- Node.js: 16.20.2
- pnpm: 8.8.0

## 安装

```bash
# 安装依赖
pnpm install
```

## 项目结构

```
brush-questions/
├── brush-question-frontend/    # Vue 3 前端项目
├── brush-question-backend/     # 后端服务项目
├── docker/                      # Docker 配置
│   ├── dev/                    # 开发环境配置
│   └── prod/                   # 生产环境配置
├── mysql/                       # MySQL 数据库配置
├── pnpm-workspace.yaml         # pnpm 工作区配置
└── package.json                # 项目依赖
```

## 可用脚本

```bash
# 开发环境部署
pnpm dev-deploy

# 生产环境部署
pnpm prod-deploy

# 构建前端
pnpm build:f

# 构建后端
pnpm build:b

# 构建所有
pnpm build
```

## 部署

项目支持 Docker 部署，配置文件位于 `docker/` 目录：
- `docker/dev/` - 开发环境配置
- `docker/prod/` - 生产环境配置

## License

Private
