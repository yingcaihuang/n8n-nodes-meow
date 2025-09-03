# MeoW n8n 节点使用示例

## 基本设置

### 1. 添加凭据
在 n8n 中添加 MeoW API 凭据：
- 凭据类型：MeoW API
- 昵称：你的用户昵称（例如：JohnDoe）
- API 地址：https://api.chuckfang.com

### 2. 创建工作流
创建一个新的工作流，添加 MeoW 节点。

## 使用场景示例

### 场景 1：发送系统监控告警

当系统出现异常时发送告警通知：

```json
{
  "requestMethod": "POST",
  "title": "系统告警",
  "message": "服务器 CPU 使用率超过 90%，请及时处理！",
  "msgType": "text",
  "url": "https://monitor.example.com/dashboard"
}
```

### 场景 2：发送任务完成通知

当定时任务完成时发送通知：

```json
{
  "requestMethod": "POST",
  "title": "任务完成",
  "message": "<h3>数据备份任务已完成</h3><p>备份时间：{{$now}}</p><p>状态：<span style='color:green'>成功</span></p>",
  "msgType": "html",
  "htmlHeight": 250
}
```

### 场景 3：发送电商订单通知

当有新订单时发送通知：

```json
{
  "requestMethod": "POST",
  "title": "新订单",
  "message": "收到新订单：订单号 {{$json.orderId}}，金额 {{$json.amount}} 元",
  "msgType": "text",
  "url": "https://admin.shop.com/orders/{{$json.orderId}}"
}
```

### 场景 4：发送富文本报表

发送包含图表和格式化内容的报表：

```json
{
  "requestMethod": "POST",
  "title": "日报",
  "message": "<div style='padding:10px'><h2>今日数据报表</h2><ul><li>访问量：1,234</li><li>新用户：56</li><li>转化率：3.2%</li></ul><p style='color:#666'>更多详情请点击查看</p></div>",
  "msgType": "html",
  "htmlHeight": 300,
  "url": "https://analytics.example.com/daily-report"
}
```

## 工作流集成示例

### 与 HTTP 请求节点结合

1. HTTP 请求节点 → 获取数据
2. IF 条件节点 → 判断数据是否符合条件
3. MeoW 节点 → 发送通知

### 与计划触发器结合

1. 计划触发器 → 每小时执行一次
2. 数据库查询节点 → 检查待处理任务
3. MeoW 节点 → 发送任务状态通知

### 与 Webhook 结合

1. Webhook 触发器 → 接收外部事件
2. 数据处理节点 → 格式化数据
3. MeoW 节点 → 发送事件通知

## 最佳实践

### 1. 消息内容优化
- 保持消息简洁明了
- 使用有意义的标题
- 重要信息放在前面

### 2. HTML 消息使用建议
- 合理设置 htmlHeight 参数
- 使用内联样式确保显示效果
- 避免过于复杂的 HTML 结构

### 3. 错误处理
- 在工作流中启用"出错时继续"选项
- 添加错误处理分支
- 记录发送失败的情况

### 4. 性能考虑
- 避免频繁发送大量消息
- 合理设置触发频率
- 考虑使用批量处理

## 常见问题

### Q: 消息发送失败怎么办？
A: 检查昵称是否正确，API 地址是否可访问，消息内容是否符合要求。

### Q: HTML 消息显示不正常？
A: 确保使用内联样式，避免外部 CSS 引用，检查 HTML 语法是否正确。

### Q: 如何调试节点？
A: 在工作流中启用详细日志，查看节点执行结果和错误信息。
