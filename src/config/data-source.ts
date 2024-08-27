import { DataSource } from 'typeorm';

const migrations = [`src/migration/${process.env.NODE_ENV}/*.{j,t}s`];
const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'tcct1019',
  database: 'nest-admin',
  port: 3306,
  synchronize: false,
  entities: [`src/module/**/*.entity{.ts,.js}`], //需配置正确才能正常生成迁移文件
  migrations, // 配置正确才能执行迁移文件
});

export default AppDataSource;
