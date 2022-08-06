import type { ProColumns } from '@ant-design/pro-components';
import { Divider, Popconfirm } from 'antd';

import Tags from '@/components/Tags';
import { EnumArticleStatus } from '@/typing/module.d';
import styles from './index.less';

const confirmNode = (text: string) => (
  <Popconfirm title={`确认${text}吗?`} okText="是" cancelText="否">
    <a>{text}</a>
  </Popconfirm>
);

export const columns: ProColumns<IArticleItem>[] = [
  {
    title: '#',
    dataIndex: 'id',
    valueType: 'index',
    width: 39,
    align: 'center',
  },
  {
    dataIndex: 'title',
    title: '标题',
    width: 210,
  },
  {
    dataIndex: 'abstract',
    title: '摘要',
    width: 330,
    render: (_, record) => {
      return <div className={styles.abstract}>{record.abstract || '-'}</div>;
    },
  },
  {
    dataIndex: 'tags',
    title: '分类',
    width: 160,
    render: (_, record) => {
      return record.tags.length ? <Tags source={record.tags} /> : '-';
    },
  },
  {
    dataIndex: 'createTime',
    title: '创建时间',
    valueType: 'dateTime',
    width: 180,
    sorter: (a, b) => b.createTime - a.createTime,
  },
  {
    dataIndex: 'views',
    title: '浏览',
    width: 60,
    sorter: (a, b) => b.views - a.views,
  },
  {
    dataIndex: 'likes',
    title: '喜欢',
    width: 60,
    sorter: (a, b) => b.likes - a.likes,
  },
  {
    dataIndex: 'status',
    title: '状态',
    width: 80,
    sorter: (a, b) => {
      if (a.status === b.status) {
        return b.modifyTime - a.modifyTime;
      } else if (a.status === EnumArticleStatus.Trash) {
        return 1;
      } else if (
        a.status === EnumArticleStatus.Draft &&
        b.status === EnumArticleStatus.Trash
      ) {
        return -1;
      } else if (
        a.status === EnumArticleStatus.Draft &&
        b.status === EnumArticleStatus.Publish
      ) {
        return 1;
      } else {
        return -1;
      }
    },
    render: (_, record) => {
      const obj =
        record.status === EnumArticleStatus.Publish
          ? { className: 'green', text: '已发布' }
          : record.status === EnumArticleStatus.Trash
          ? { className: 'red', text: '已删除' }
          : { className: 'grey', text: '草稿' };
      return <span className={styles[obj.className]}>{obj.text}</span>;
    },
  },
  {
    title: '操作',
    dataIndex: 'option',
    width: 190,
    valueType: 'option',
    render: (_, record) => {
      if (record.status === EnumArticleStatus.Draft) {
        return (
          <>
            <a key="edit">编辑</a>
            <Divider type="vertical" />
            {confirmNode('上架')}
            <Divider type="vertical" />
            {confirmNode('删除')}
          </>
        );
      } else if (record.status === EnumArticleStatus.Trash) {
        return (
          <>
            {confirmNode('还原')}
            <Divider type="vertical" />
            {confirmNode('删除')}
          </>
        );
      } else {
        return <>{confirmNode('下架')}</>;
      }
    },
  },
];
