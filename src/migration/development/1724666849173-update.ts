import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1724666849173 implements MigrationInterface {
    name = 'Update1724666849173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`status\` \`status\` char(1) NOT NULL COMMENT '状态' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`del_flag\` \`del_flag\` char(1) NOT NULL COMMENT '删除标志' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`create_by\` \`create_by\` varchar(64) NOT NULL COMMENT '创建者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`update_by\` \`update_by\` varchar(64) NOT NULL COMMENT '更新者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`role_sort\` \`role_sort\` int NOT NULL COMMENT '显示顺序' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`data_scope\` \`data_scope\` char NOT NULL COMMENT '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）' DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`menu_check_strictly\` \`menu_check_strictly\` tinyint NOT NULL COMMENT '菜单树选择项是否关联显示' DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`dept_check_strictly\` \`dept_check_strictly\` tinyint NOT NULL COMMENT '部门树选择项是否关联显示' DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_menu\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`dept_check_strictly\` \`dept_check_strictly\` tinyint(1) NULL COMMENT '部门树选择项是否关联显示' DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`menu_check_strictly\` \`menu_check_strictly\` tinyint(1) NULL COMMENT '菜单树选择项是否关联显示' DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`data_scope\` \`data_scope\` char NULL COMMENT '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）' DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`role_sort\` \`role_sort\` int NOT NULL COMMENT '显示顺序'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`update_by\` \`update_by\` varchar(64) NULL COMMENT '更新者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`create_by\` \`create_by\` varchar(64) NULL COMMENT '创建者' DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`del_flag\` \`del_flag\` char(1) NULL COMMENT '删除标志（0代表存在 1代表删除）' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`sys_role\` CHANGE \`status\` \`status\` char(1) NOT NULL COMMENT '角色状态（0正常 1停用）'`);
    }

}
