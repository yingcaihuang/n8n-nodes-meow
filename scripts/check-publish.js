#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 正在检查发布前的准备工作...\n');

const errors = [];
const warnings = [];

// 检查必要文件
const requiredFiles = [
  'package.json',
  'README.md',
  'LICENSE',
  'dist/nodes/MeoW/MeoW.node.js',
  'dist/credentials/MeoWApi.credentials.js'
];

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    errors.push(`❌ 缺少必要文件: ${file}`);
  } else {
    console.log(`✅ 文件存在: ${file}`);
  }
});

// 检查 package.json
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // 检查必要字段
  const requiredFields = ['name', 'version', 'description', 'license', 'author'];
  requiredFields.forEach(field => {
    if (!pkg[field]) {
      errors.push(`❌ package.json 缺少字段: ${field}`);
    }
  });
  
  // 检查 n8n 配置
  if (!pkg.n8n) {
    errors.push('❌ package.json 缺少 n8n 配置');
  } else {
    if (!pkg.n8n.nodes || pkg.n8n.nodes.length === 0) {
      errors.push('❌ package.json 的 n8n.nodes 配置为空');
    }
    if (!pkg.n8n.credentials || pkg.n8n.credentials.length === 0) {
      errors.push('❌ package.json 的 n8n.credentials 配置为空');
    }
  }
  
  // 检查作者信息
  if (pkg.author && typeof pkg.author === 'object') {
    if (pkg.author.name === 'Your Name' || pkg.author.email === 'your.email@example.com') {
      warnings.push('⚠️  请更新 package.json 中的作者信息');
    }
  }
  
  // 检查仓库信息
  if (pkg.repository && pkg.repository.url && pkg.repository.url.includes('yourusername')) {
    warnings.push('⚠️  请更新 package.json 中的仓库地址');
  }
  
  console.log('✅ package.json 格式正确');
} catch (e) {
  errors.push('❌ package.json 格式错误');
}

// 检查 README
try {
  const readme = fs.readFileSync('README.md', 'utf8');
  if (readme.includes('yourusername')) {
    warnings.push('⚠️  请更新 README.md 中的用户名');
  }
  console.log('✅ README.md 存在');
} catch (e) {
  errors.push('❌ 无法读取 README.md');
}

// 输出结果
console.log('\n📋 检查结果:');

if (errors.length > 0) {
  console.log('\n❌ 发现错误:');
  errors.forEach(error => console.log(error));
}

if (warnings.length > 0) {
  console.log('\n⚠️  警告:');
  warnings.forEach(warning => console.log(warning));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n🎉 所有检查通过！项目已准备好发布到 npm。');
  console.log('\n发布命令:');
  console.log('npm publish');
} else if (errors.length === 0) {
  console.log('\n✅ 基本检查通过，但有一些警告需要注意。');
  console.log('你可以选择忽略警告并发布，或者先修复警告。');
} else {
  console.log('\n❌ 请修复上述错误后再发布。');
  process.exit(1);
}
