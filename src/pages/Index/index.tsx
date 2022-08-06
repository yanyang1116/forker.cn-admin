import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

const Index: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer>
      <h2>TODO...</h2>
    </PageContainer>
  );
};

export default Index;
