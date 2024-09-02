import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1724835290138 implements MigrationInterface {
    name = 'Update1724835290138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`status\` \`status\` char(1) NOT NULL COMMENT '状态' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`del_flag\` \`del_flag\` char(1) NOT NULL COMMENT '删除标志' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`create_by\` \`create_by\` varchar(64) NOT NULL COMMENT '创建者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`update_by\` \`update_by\` varchar(64) NOT NULL COMMENT '更新者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`dept_id\` \`dept_id\` int NOT NULL COMMENT '部门ID'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`user_type\` \`user_type\` varchar(2) NOT NULL COMMENT '用户类型' DEFAULT '00'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`email\` \`email\` varchar(50) NOT NULL COMMENT '用户邮箱' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`phonenumber\` \`phonenumber\` varchar(11) NOT NULL COMMENT '手机号码' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`sex\` \`sex\` char(1) NOT NULL COMMENT '用户性别' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`avatar\` \`avatar\` varchar(100) NOT NULL COMMENT '头像地址' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`password\` \`password\` varchar(200) NOT NULL COMMENT '密码' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`login_ip\` \`login_ip\` varchar(128) NOT NULL COMMENT '最后登录IP' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` DROP COLUMN \`login_date\``);
        await queryRunner.query(`ALTER TABLE \`sys_user\` ADD \`login_date\` timestamp NOT NULL COMMENT '最后登录时间'`);
        await queryRunner.query(`ALTER TABLE \`sys_role_menu\` CHANGE \`role_id\` \`role_id\` int NOT NULL COMMENT '角色ID' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_role_menu\` CHANGE \`menu_id\` \`menu_id\` int NOT NULL COMMENT '菜单ID' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_role_menu\` CHANGE \`menu_id\` \`menu_id\` int NOT NULL COMMENT '菜单ID'`);
        await queryRunner.query(`ALTER TABLE \`sys_role_menu\` CHANGE \`role_id\` \`role_id\` int NOT NULL COMMENT '角色ID'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` DROP COLUMN \`login_date\``);
        await queryRunner.query(`ALTER TABLE \`sys_user\` ADD \`login_date\` datetime NULL COMMENT '最后登录时间'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`login_ip\` \`login_ip\` varchar(128) NULL COMMENT '最后登录IP' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`password\` \`password\` varchar(200) NULL COMMENT '密码' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`avatar\` \`avatar\` varchar(100) NULL COMMENT '头像地址' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`sex\` \`sex\` char(1) NULL COMMENT '用户性别（0男 1女 2未知）' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`phonenumber\` \`phonenumber\` varchar(11) NULL COMMENT '手机号码' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`email\` \`email\` varchar(50) NULL COMMENT '用户邮箱' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`user_type\` \`user_type\` varchar(2) NULL COMMENT '用户类型（00系统用户）' DEFAULT '00'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`dept_id\` \`dept_id\` int NULL COMMENT '部门ID'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`update_by\` \`update_by\` varchar(64) NULL COMMENT '更新者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`create_by\` \`create_by\` varchar(64) NULL COMMENT '创建者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`del_flag\` \`del_flag\` char(1) NULL COMMENT '删除标志（0代表存在 1代表删除）' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_user\` CHANGE \`status\` \`status\` char(1) NULL COMMENT '帐号状态（0正常 1停用）' DEFAULT '0'`);
    }

}
