// import dayjs from 'dayjs';
import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  // ValueTransformer,
} from 'typeorm';

// 时间转换
// const transformer: ValueTransformer = {
//   to(value) {
//     return value;
//   },
//   from(value) {
//     return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
//   },
// };

// 数据库表抽取基础实体信息
@Entity()
export class BaseEntity {
  @Column({
    type: 'char',
    name: 'status',
    default: '0',
    length: 1,
    comment: '状态',
  })
  public status: string;

  @Column({
    type: 'char',
    name: 'del_flag',
    default: '0',
    length: 1,
    comment: '删除标志',
  })
  public delFlag: string;

  @Column({
    type: 'varchar',
    name: 'create_by',
    length: 64,
    default: '',
    comment: '创建者',
  })
  public createBy: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP(0)',
    precision: 0,
    nullable: true,
    comment: '创建时间',
  })
  public createTime: Date;

  @Column({
    type: 'varchar',
    name: 'update_by',
    length: 64,
    default: '',
    comment: '更新者',
  })
  public updateBy: string;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_time',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
    precision: 0,
    comment: '更新时间',
  })
  public updateTime: Date;

  @Column({
    type: 'varchar',
    name: 'remark',
    length: 500,
    default: null,
    comment: '备注',
  })
  public remark: string;
}
