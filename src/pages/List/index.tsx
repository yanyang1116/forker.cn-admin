import { PageContainer, ProTable } from '@ant-design/pro-components';
import React from 'react';
import { columns } from './const';
import { tableListDataSource } from './mock';

const PageList: React.FC = () => {
  return (
    <PageContainer>
      <ProTable<IArticleItem>
        columns={columns}
        request={(params, sorter, filter) => {
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
            total: tableListDataSource.length,
          });
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
