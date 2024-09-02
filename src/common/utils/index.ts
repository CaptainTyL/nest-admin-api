import * as Lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import * as dayjs from 'dayjs';
import * as isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
import * as timezone from 'dayjs/plugin/timezone'; // 导入插件
import * as utc from 'dayjs/plugin/utc'; // 导入插件
import 'dayjs/locale/zh-cn'; // 导入本地化语言
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isLeapYear); // 使用插件
dayjs.locale('zh-cn'); // 使用本地化语言
dayjs.tz.setDefault('Asia/Beijing');

/**
 * 数组转树结构
 * @param arr
 * @param getId
 * @param getLabel
 * @returns
 */
export function ListToTree(arr, getId, getLabel) {
  const kData = {}; // 以id做key的对象 暂时储存数据
  const lData = []; // 最终的数据 arr

  arr.forEach((m) => {
    m = {
      id: getId(m),
      label: getLabel(m),
      parentId: +m.parentId,
    };
    kData[m.id] = {
      id: m.id,
      label: m.label,
      parentId: m.parentId,
    };
    if (m.parentId === 0) {
      lData.push(kData[m.id]);
    } else {
      kData[m.parentId] = kData[m.parentId] || {};
      kData[m.parentId].children = kData[m.parentId].children || [];
      kData[m.parentId].children.push(kData[m.id]);
    }
  });
  return lData;
}

/**
 * 获取当前时间
 * YYYY-MM-DD HH:mm:ss
 * @returns
 */
export function GetNowDate() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 数组去重
 * @param list
 * @returns
 */
export function Uniq(list: Array<number | string>) {
  return Lodash.uniq(list);
}

/**
 * 生成唯一id
 * UUID
 * @returns
 */
export function GenerateUUID(): string {
  const uuid = uuidv4();
  return uuid.replaceAll('-', '');
}
