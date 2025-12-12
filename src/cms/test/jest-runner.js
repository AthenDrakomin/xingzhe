// 运行Jest测试的脚本
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

async function runJestTests() {
  try {
    console.log('运行单元测试...');
    const { stdout, stderr } = await execPromise('npx jest src/cms/test/permission.test.ts');
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
    }
  } catch (error) {
    console.error('测试运行失败:', error.message);
  }
}

runJestTests();