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
					return (async () => {
						try {
							const res = await api.list({
								pageSize: params.pageSize,
								pageNum: params.current,
							});
							return {
								data: res.list,
								total: res.total,
								success: true,
							};
						} catch (err) {
							return {
								data: [],
								total: 0,
								success: false,
							};
						}
					})();
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
