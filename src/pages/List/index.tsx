import { PageContainer, ProTable } from '@ant-design/pro-components';
import React from 'react';
import * as api from '../../api/article/index';
import { columns } from './const';

const PageList: React.FC = () => {
  return (
    <PageContainer>
      <ProTable<IArticleItem>
        columns={columns}
        request={(params, sorter, filter) => {
          return api.list({
            pageSize: params.pageSize,
            pageNum: params.current,
          });
          // Promise.resolve({
          //   data: tableListDataSource,
          //   success: true,
          //   total: tableListDataSource.length,
          // });
        }}
        rowKey="id"
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
        }}
        toolBarRender={false}
        search={false}
      />
    </PageContainer>
  );
};

export default PageList;
