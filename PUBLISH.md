# 📦 发布到 NPM 指南

## 发布前准备

### 1. 更新项目信息

在发布前，请确保更新以下信息：

#### package.json
```json
{
  "author": {
    "name": "你的真实姓名",
    "email": "你的邮箱@example.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/你的用户名/n8n-nodes-meow.git"
  },
  "homepage": "https://github.com/你的用户名/n8n-nodes-meow#readme",
  "bugs": {
    "url": "https://github.com/你的用户名/n8n-nodes-meow/issues"
  }
}
```

#### README.md
- 更新所有包含 `yourusername` 的链接
- 确保所有示例和链接都是正确的

### 2. 运行检查

运行发布前检查：

```bash
npm run check-publish
```

这会检查：
- ✅ 必要文件是否存在
- ✅ package.json 配置是否正确
- ✅ 构建文件是否生成
- ⚠️  个人信息是否已更新

### 3. 构建项目

```bash
npm run build
```

确保 `dist/` 目录下有正确的构建文件：
- `dist/nodes/MeoW/MeoW.node.js`
- `dist/credentials/MeoWApi.credentials.js`
- `dist/nodes/MeoW/meow.svg`

## 发布步骤

### 1. 登录 NPM

如果还没有 npm 账户，先注册：
```bash
npm adduser
```

如果已有账户，登录：
```bash
npm login
```

### 2. 检查包名是否可用

```bash
npm view n8n-nodes-meow
```

如果返回 404，说明包名可用。如果已存在，需要修改包名。

### 3. 发布

#### 首次发布

```bash
npm publish
```

#### 后续版本发布

更新版本号：
```bash
npm version patch  # 补丁版本 (0.1.0 -> 0.1.1)
npm version minor  # 次要版本 (0.1.0 -> 0.2.0)
npm version major  # 主要版本 (0.1.0 -> 1.0.0)
```

然后发布：
```bash
npm publish
```

## 发布后验证

### 1. 检查 NPM 页面

访问 https://www.npmjs.com/package/n8n-nodes-meow 确认包已发布。

### 2. 测试安装

在另一个目录测试安装：
```bash
mkdir test-install
cd test-install
npm init -y
npm install n8n-nodes-meow
```

### 3. 在 n8n 中测试

1. 在 n8n 项目中安装你的包
2. 重启 n8n
3. 检查节点是否出现在节点列表中
4. 测试节点功能

## 版本管理策略

### 语义化版本 (SemVer)

- **MAJOR** (主版本): 不兼容的 API 更改
- **MINOR** (次版本): 向后兼容的功能新增
- **PATCH** (补丁版本): 向后兼容的错误修复

### 建议的版本规划

- `0.1.0` - 初始发布
- `0.1.x` - 错误修复
- `0.2.0` - 新功能添加
- `1.0.0` - 稳定版本

## 常见问题

### Q: 发布失败，提示权限错误？
A: 确保已登录 npm 账户，且有发布权限。

### Q: 包名已被占用？
A: 修改 package.json 中的 name 字段，选择一个唯一的名称。

### Q: 发布后在 n8n 中看不到节点？
A: 检查 package.json 中的 n8n 配置是否正确，确保路径指向正确的构建文件。

### Q: 如何撤回已发布的版本？
A: 使用 `npm unpublish package-name@version`，但只能在发布后 24 小时内撤回。

## 发布清单

发布前请确认：

- [ ] 已更新 package.json 中的个人信息
- [ ] 已更新 README.md 中的链接
- [ ] 运行 `npm run build` 成功
- [ ] 运行 `npm run lint` 无错误
- [ ] 运行 `npm run check-publish` 通过
- [ ] 已登录 npm 账户
- [ ] 包名可用且符合规范
- [ ] 版本号符合语义化版本规范

完成上述检查后，就可以安全地发布到 npm 了！
