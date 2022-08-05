import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

const List: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div>
        {/* <Guide name={trim(name)} /> */}
        List
      </div>
    </PageContainer>
  );
};

export default List;
