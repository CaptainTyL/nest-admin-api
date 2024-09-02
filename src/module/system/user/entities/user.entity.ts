import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../../common/entities/base';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_user', {
  comment: '用户信息表',
})
export class SysUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'user_id', comment: '用户ID' })
  public userId: number;

  @Column({
    type: 'int',
    name: 'dept_id',
    comment: '部门ID',
  })
  public deptId: number;

  @Column({
    type: 'varchar',
    name: 'user_name',
    length: 30,
    nullable: true,
    comment: '用户账号',
  })
  public userName: string;

  @Column({
    type: 'varchar',
    name: 'nick_name',
    length: 30,
    nullable: true,
    comment: '用户昵称',
  })
  public nickName: string;

  @Column({
    type: 'varchar',
    name: 'user_type',
    length: 2,
    default: '00',
    nullable: true,
    comment: '用户类型',
  })
  public userType: string;

  @Column({
    type: 'varchar',
    name: 'email',
    length: 50,
    default: '',
    nullable: true,
    comment: '用户邮箱',
  })
  public email: string;

  @Column({
    type: 'varchar',
    name: 'phonenumber',
    length: 11,
    default: '',
    nullable: true,
    comment: '手机号码',
  })
  public phonenumber: string;

  @Column({
    type: 'char',
    name: 'sex',
    length: 1,
    default: '0',
    nullable: true,
    comment: '用户性别',
  })
  public sex: string;

  @Column({
    type: 'varchar',
    name: 'avatar',
    length: 100,
    default: '',
    nullable: true,
    comment: '头像地址',
  })
  public avatar: string;

  @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
  @Column({
    type: 'varchar',
    name: 'password',
    length: 200,
    default: '',
    nullable: true,
    comment: '密码',
  })
  public password: string;

  @Column({
    type: 'varchar',
    name: 'login_ip',
    length: 128,
    default: '',
    nullable: true,
    comment: '最后登录IP',
  })
  public loginIp: string;

  @Column({
    type: 'timestamp',
    name: 'login_date',
    nullable: true,
    comment: '最后登录时间',
  })
  public loginDate: Date;
}
