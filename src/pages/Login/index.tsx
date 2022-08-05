import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

const Login: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div>
        {/* <Guide name={trim(name)} /> */}
        login
      </div>
    </PageContainer>
  );
};

export default Login;
