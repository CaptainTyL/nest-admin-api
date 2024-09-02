import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1724835570388 implements MigrationInterface {
    name = 'Update1724835570388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`user_name\` \`user_name\` varchar(30) NULL COMMENT '用户账号'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`nick_name\` \`nick_name\` varchar(30) NULL COMMENT '用户昵称'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`user_type\` \`user_type\` varchar(2) NULL COMMENT '用户类型' DEFAULT '00'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`email\` \`email\` varchar(50) NULL COMMENT '用户邮箱' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`phonenumber\` \`phonenumber\` varchar(11) NULL COMMENT '手机号码' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`sex\` \`sex\` char(1) NULL COMMENT '用户性别' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`avatar\` \`avatar\` varchar(100) NULL COMMENT '头像地址' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`password\` \`password\` varchar(200) NULL COMMENT '密码' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`login_ip\` \`login_ip\` varchar(128) NULL COMMENT '最后登录IP' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`login_date\` \`login_date\` timestamp NULL COMMENT '最后登录时间'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`login_date\` \`login_date\` timestamp NOT NULL COMMENT '最后登录时间'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`login_ip\` \`login_ip\` varchar(128) NOT NULL COMMENT '最后登录IP' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`password\` \`password\` varchar(200) NOT NULL COMMENT '密码' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`avatar\` \`avatar\` varchar(100) NOT NULL COMMENT '头像地址' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`sex\` \`sex\` char(1) NOT NULL COMMENT '用户性别' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`phonenumber\` \`phonenumber\` varchar(11) NOT NULL COMMENT '手机号码' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`email\` \`email\` varchar(50) NOT NULL COMMENT '用户邮箱' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`user_type\` \`user_type\` varchar(2) NOT NULL COMMENT '用户类型' DEFAULT '00'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`nick_name\` \`nick_name\` varchar(30) NOT NULL COMMENT '用户昵称'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`user_name\` \`user_name\` varchar(30) NOT NULL COMMENT '用户账号'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
    }

}
