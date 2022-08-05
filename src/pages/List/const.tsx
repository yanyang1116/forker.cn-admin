import { EnumArticleStatus } from '@/typing/module.d';
import type { ProColumns } from '@ant-design/pro-components';
import Tags from './components/Tags';
import styles from './index.less';

export const columns: ProColumns<IArticleItem>[] = [
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
      return <div className={styles.abstract}>{record.abstract}</div>;
    },
  },
  {
    dataIndex: 'tags',
    title: '分类',
    width: 150,
    render: (_, record) => {
      return <Tags source={record.tags} />;
    },
  },
  {
    dataIndex: 'createTime',
    title: '创建时间',
    valueType: 'dateTime',
    width: 120,
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
    sorter: (a, b) => {
      if (a.status === b.status) {
        return b.modifyTime - a.modifyTime;
      } else if (a.status === EnumArticleStatus.Trash) {
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
      return <p className={styles[obj.className]}>{obj.text}</p>;
    },
  },
  {
    title: '操作',
    dataIndex: 'x',
    valueType: 'option',
    render: (_, record) => {
      return [<a key="edit">编辑</a>];
    },
  },
];
