import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

const Trash: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div>Trash</div>
    </PageContainer>
  );
};

export default Trash;
