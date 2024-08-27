import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1724489466713 implements MigrationInterface {
    name = 'Update1724489466713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sys_menu\` COMMENT '菜单表'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`status\` \`status\` char(1) NOT NULL COMMENT '状态' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`del_flag\` \`del_flag\` char(1) NOT NULL COMMENT '删除标志' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`create_by\` \`create_by\` varchar(64) NOT NULL COMMENT '创建者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`update_by\` \`update_by\` varchar(64) NOT NULL COMMENT '更新者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`remark\` \`remark\` varchar(500) NULL COMMENT '备注'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`parent_id\` \`parent_id\` int NOT NULL COMMENT '父菜单ID' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`order_num\` \`order_num\` int NOT NULL COMMENT '显示顺序' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`path\` \`path\` varchar(200) NULL COMMENT '路由地址'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`is_frame\` \`is_frame\` char(1) NOT NULL COMMENT '是否外链（0是 1否）' DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`is_cache\` \`is_cache\` char(1) NOT NULL COMMENT '是否缓存（0缓存 1不缓存）' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`menu_type\` \`menu_type\` char(1) NOT NULL COMMENT '菜单类型（M目录 C菜单 F按钮）' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`visible\` \`visible\` char(1) NOT NULL COMMENT '菜单状态（0显示 1隐藏）' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`icon\` \`icon\` varchar(100) NOT NULL COMMENT '菜单图标' DEFAULT '#'`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`icon\` \`icon\` varchar(100) NULL COMMENT '菜单图标' DEFAULT '#'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`visible\` \`visible\` char(1) NULL COMMENT '菜单状态（0显示 1隐藏）' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`menu_type\` \`menu_type\` char(1) NULL COMMENT '菜单类型（M目录 C菜单 F按钮）' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`is_cache\` \`is_cache\` char(1) NULL COMMENT '是否缓存（0缓存 1不缓存）' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`is_frame\` \`is_frame\` char(1) NULL COMMENT '是否为外链（0是 1否）' DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`path\` \`path\` varchar(200) NULL COMMENT '路由地址' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`order_num\` \`order_num\` int NULL COMMENT '显示顺序' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`parent_id\` \`parent_id\` int NULL COMMENT '父菜单ID' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`remark\` \`remark\` varchar(500) NULL COMMENT '备注' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`update_by\` \`update_by\` varchar(64) NULL COMMENT '更新者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`create_by\` \`create_by\` varchar(64) NULL COMMENT '创建者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`del_flag\` \`del_flag\` char(1) NULL COMMENT '删除标志（0代表存在 1代表删除）' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`status\` \`status\` char(1) NULL COMMENT '菜单状态（0正常 1停用）' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` COMMENT '菜单权限表'`);
    }

}
