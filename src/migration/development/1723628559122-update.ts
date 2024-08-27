import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1723628559122 implements MigrationInterface {
    name = 'Update1723628559122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`create_time\` \`create_time\` datetime(0) NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`update_time\` \`update_time\` datetime(0) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`update_time\` \`update_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`sys_dept\` CHANGE \`create_time\` \`create_time\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`update_time\` \`update_time\` datetime(6) NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`sys_post\` CHANGE \`create_time\` \`create_time\` datetime(0) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP`);
    }

}
