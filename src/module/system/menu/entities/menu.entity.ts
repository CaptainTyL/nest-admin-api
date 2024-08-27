import { BaseEntity } from '../../../../common/entities/base';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_menu', { comment: '菜单表' })
export class SysMenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'menu_id',
    comment: '菜单ID',
  })
  public menuId: number;

  @Column({
    type: 'varchar',
    name: 'menu_name',
    length: 50,
    comment: '菜单名称',
  })
  public menuName: string;

  @Column({ type: 'int', name: 'parent_id', default: 0, comment: '父菜单ID' })
  public parentId: number;

  @Column({ type: 'int', name: 'order_num', default: 0, comment: '显示顺序' })
  public orderNum: number;

  @Column({
    type: 'varchar',
    name: 'path',
    length: 200,
    default: null,
    comment: '路由地址',
  })
  public path: string;

  @Column({
    type: 'varchar',
    name: 'component',
    length: 255,
    default: null,
    comment: '组件路径',
  })
  public component: string;

  @Column({
    type: 'varchar',
    name: 'query',
    length: 255,
    default: null,
    comment: '路由参数',
  })
  public query: string;

  @Column({
    type: 'char',
    name: 'is_frame',
    length: 1,
    default: '1',
    comment: '是否外链（0是 1否）',
  })
  public isFrame: string;

  @Column({
    type: 'char',
    name: 'is_cache',
    length: 1,
    default: '0',
    comment: '是否缓存（0缓存 1不缓存）',
  })
  public isCache: string;

  @Column({
    type: 'char',
    name: 'menu_type',
    length: 1,
    default: '',
    comment: '菜单类型（M目录 C菜单 F按钮）',
  })
  public menuType: string;

  @Column({
    type: 'char',
    name: 'visible',
    length: 1,
    default: '0',
    comment: '菜单状态（0显示 1隐藏）',
  })
  public visible: string;

  @Column({
    type: 'varchar',
    name: 'perms',
    length: 100,
    default: null,
    comment: '权限标识',
  })
  public perms: string;

  @Column({
    type: 'varchar',
    name: 'icon',
    length: 100,
    default: '#',
    comment: '菜单图标',
  })
  public icon: string;
}
