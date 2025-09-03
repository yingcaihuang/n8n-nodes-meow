import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MeoWApi implements ICredentialType {
	name = 'meoWApi';
	displayName = 'MeoW API';
	documentationUrl = 'https://www.chuckfang.com/MeoW/api_doc.html';
	properties: INodeProperties[] = [
		{
			displayName: '昵称 (Nickname)',
			name: 'nickname',
			type: 'string',
			default: '',
			required: true,
			description: '用于 MeoW API 的用户昵称，不允许包含斜杠',
		},
		{
			displayName: 'API 地址 (API Base URL)',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.chuckfang.com',
			required: true,
			description: 'MeoW API 的基础地址，支持 HTTP 或 HTTPS',
		},
	];
}
