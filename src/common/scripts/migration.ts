// typeorm 迁移操作 执行交互脚本
import { prompt } from 'inquirer';
import * as chalk from 'chalk';
import { exec } from 'child_process';

enum ENV_TYPE_ENUM {
  PROD = 'prod',
  STAGING = 'staging',
  DEVLOPMENT = 'development',
}

enum OPERATION_TYPE_ENUM {
  GENERATE = 'generate',
  CREATE = 'create',
  RUN = 'run',
  REVERT = 'revert',
}

async function run() {
  const { env } = await prompt<{ env: ENV_TYPE_ENUM }>({
    type: 'list',
    name: 'env',
    message: '请选择迁移环境',
    choices: [
      {
        name: '开发环境',
        value: ENV_TYPE_ENUM.DEVLOPMENT,
      },
      {
        name: '生产环境',
        value: ENV_TYPE_ENUM.PROD,
      },
      {
        name: '测试环境',
        value: ENV_TYPE_ENUM.STAGING,
      },
    ],
  });

  const { type } = await prompt<{ type: OPERATION_TYPE_ENUM }>({
    type: 'list',
    name: 'type',
    message: '请选择操作类型',
    choices: [
      {
        name: '生成迁移文件',
        value: OPERATION_TYPE_ENUM.GENERATE,
      },
      {
        name: '创建迁移文件',
        value: OPERATION_TYPE_ENUM.CREATE,
      },
      {
        name: '执行迁移',
        value: OPERATION_TYPE_ENUM.RUN,
      },
      {
        name: '回滚',
        value: OPERATION_TYPE_ENUM.REVERT,
      },
    ],
  });

  // 执行命令 设置当前执行环境
  const envCmd = `./node_modules/.bin/cross-env NODE_ENV=${env}`;

  // 迁移命令
  let migrationCmd = `typeorm-ts-node-commonjs migration:${type} `;

  if (type === OPERATION_TYPE_ENUM.GENERATE) {
    migrationCmd += `./src/migration/${env}/update -d ./src/config/data-source.ts`;
  } else if (type === OPERATION_TYPE_ENUM.CREATE) {
    migrationCmd += `./src/migration/${env}/create`;
  } else {
    migrationCmd += `-d ./src/config/data-source.ts`;
  }

  exec(`${envCmd} ${migrationCmd}`, (err, stdout, stderr) => {
    if (err) {
      console.log(chalk.red(err.message));
      process.exit(1);
    }
    if (stderr) {
      console.log(chalk.yellow(stderr));
      process.exit(0);
    }
    console.log(chalk.green(stdout));
  });
}

console.log(chalk.cyan('开始执行迁移指令\n'));

run();
