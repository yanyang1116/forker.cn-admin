import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

const Edit: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div>
        {/* <Guide name={trim(name)} /> */}
        new
      </div>
    </PageContainer>
  );
};

export default Edit;
