import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	IDataObject,
} from 'n8n-workflow';

export class MeoW implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MeoW 通知',
		name: 'meoW',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["requestMethod"]}} 请求',
		description: '发送 MeoW 通知消息',
		defaults: {
			name: 'MeoW 通知',
		},
		icon: 'file:meow.svg',
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'meoWApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: '请求方法',
				name: 'requestMethod',
				type: 'options',
				options: [
					{
						name: 'GET',
						value: 'GET',
					},
					{
						name: 'POST',
						value: 'POST',
					},
				],
				default: 'GET',
				description: '选择 HTTP 请求方法',
			},
			{
				displayName: '标题 (可选)',
				name: 'title',
				type: 'string',
				default: '',
				placeholder: '消息标题',
				description: '可选的消息标题',
			},
			{
				displayName: '消息类型',
				name: 'msgType',
				type: 'options',
				options: [
					{
						name: '文本',
						value: 'text',
						description: '纯文本消息',
					},
					{
						name: 'HTML',
						value: 'html',
						description: 'HTML 格式消息',
					},
				],
				default: 'text',
				description: '消息内容类型',
			},
			{
				displayName: '消息内容',
				name: 'message',
				type: 'string',
				default: '',
				placeholder: '请输入消息内容',
				description: '要发送的消息内容',
				required: true,
			},
			{
				displayName: 'HTML 高度',
				name: 'htmlHeight',
				type: 'number',
				default: 200,
				placeholder: '200',
				description: 'HTML 消息的显示高度 (像素)',
				displayOptions: {
					show: {
						msgType: ['html'],
					},
				},
			},
			{
				displayName: '链接 URL (可选)',
				name: 'url',
				type: 'string',
				default: '',
				placeholder: 'https://example.com',
				description: '可选的跳转链接',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		const credentials = await this.getCredentials('meoWApi');
		const baseUrl = credentials.baseUrl as string;
		const nickname = credentials.nickname as string;

		for (let i = 0; i < items.length; i++) {
			try {
				const requestMethod = this.getNodeParameter('requestMethod', i) as string;
				const title = this.getNodeParameter('title', i) as string;
				const message = this.getNodeParameter('message', i) as string;
				const msgType = this.getNodeParameter('msgType', i) as string;
				const htmlHeight = msgType === 'html' ? this.getNodeParameter('htmlHeight', i) as number : 200;
				const url = this.getNodeParameter('url', i) as string;

				let responseData: IDataObject;

				if (requestMethod === 'GET') {
					// 构建 GET 请求的 URL
					let requestUrl = `${baseUrl}/${encodeURIComponent(nickname)}`;
					
					if (title) {
						requestUrl += `/${encodeURIComponent(title)}`;
					}
					
					requestUrl += `/${encodeURIComponent(message)}`;

					// 构建查询参数
					const queryParams: string[] = [];
					if (url) {
						queryParams.push(`url=${encodeURIComponent(url)}`);
					}
					if (msgType !== 'text') {
						queryParams.push(`msgType=${msgType}`);
					}
					if (msgType === 'html' && htmlHeight !== 200) {
						queryParams.push(`htmlHeight=${htmlHeight}`);
					}

					if (queryParams.length > 0) {
						requestUrl += `?${queryParams.join('&')}`;
					}

					const options = {
						method: 'GET' as const,
						url: requestUrl,
						json: true,
					};

					responseData = await this.helpers.httpRequest(options);
				} else {
					// POST 请求
					let requestUrl = `${baseUrl}/${encodeURIComponent(nickname)}`;
					
					if (title) {
						requestUrl += `/${encodeURIComponent(title)}`;
					}

					// 构建查询参数
					const queryParams: string[] = [];
					if (msgType !== 'text') {
						queryParams.push(`msgType=${msgType}`);
					}
					if (msgType === 'html' && htmlHeight !== 200) {
						queryParams.push(`htmlHeight=${htmlHeight}`);
					}

					if (queryParams.length > 0) {
						requestUrl += `?${queryParams.join('&')}`;
					}

					// 构建请求体
					const body: IDataObject = {
						msg: message,
					};

					if (title) {
						body.title = title;
					}

					if (url) {
						body.url = url;
					}

					const options = {
						method: 'POST' as const,
						url: requestUrl,
						body,
						json: true,
					};

					responseData = await this.helpers.httpRequest(options);
				}

				returnData.push(responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: (error as Error).message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
