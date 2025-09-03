# 安装和构建指南

## 前置要求

- Node.js 14+ 
- npm 或 yarn
- n8n 实例

## 安装步骤

### 1. 安装依赖

```bash
cd n8n-nodes-meow
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 在 n8n 中使用

#### 方法一：本地开发
将构建后的文件复制到你的 n8n 自定义节点目录。

#### 方法二：发布到 npm
```bash
npm publish
```

然后在你的 n8n 项目中安装：
```bash
npm install n8n-nodes-meow
```

### 4. 重启 n8n

重启你的 n8n 实例以加载新节点。

## 开发指南

### 目录结构说明

```
n8n-nodes-meow/
├── credentials/           # 凭据配置
│   └── MeoWApi.credentials.ts
├── nodes/                # 节点实现
│   └── MeoW/
│       ├── MeoW.node.ts  # 主节点文件
│       └── meow.svg      # 节点图标
├── dist/                 # 构建输出（构建后生成）
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
├── gulpfile.js          # 构建脚本
├── .eslintrc.js         # 代码检查配置
├── .prettierrc.json     # 代码格式化配置
└── README.md            # 项目说明
```

### 修改节点

1. 修改 `nodes/MeoW/MeoW.node.ts` 文件
2. 运行 `npm run build` 重新构建
3. 重启 n8n 实例

### 代码风格

运行代码格式化：
```bash
npm run format
```

运行代码检查：
```bash
npm run lint
```

## 故障排除

### 常见问题

1. **构建失败**
   - 确保安装了所有依赖
   - 检查 TypeScript 版本兼容性

2. **节点未显示在 n8n 中**
   - 确保已重启 n8n 实例
   - 检查 package.json 中的 n8n 配置
   - 验证构建文件是否存在于 dist 目录

3. **凭据配置问题**
   - 检查昵称是否包含斜杠
   - 验证 API 地址格式是否正确

### 调试技巧

1. 在节点代码中添加 console.log 输出
2. 查看 n8n 的控制台日志
3. 使用浏览器开发者工具检查网络请求
