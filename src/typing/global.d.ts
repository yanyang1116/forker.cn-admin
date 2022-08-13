/**
 * @file
 * 单纯的 declare 也是可以将类型定义声明到全局
 * 但是，如果不是 declare 开头，就不能起作用
 *
 * 就像我这里要使用 import EnumArticleStatus 就不行
 *
 * 所以这里使用 declare global 来处理
 */

import { EnumArticleStatus } from './global.enum';

declare global {
  interface IArticleItem {
    id: number;
    title: string;
    abstract: string;
    createTime: number;
    modifyTime: number;
    author: string;
    original: boolean;
    tags: string[];
    status: EnumArticleStatus;
    views: number;
    likes: number;
  }
}
