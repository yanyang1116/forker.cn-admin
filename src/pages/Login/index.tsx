import { useModel } from '@umijs/max';

const Login: React.FC = () => {
  const { name } = useModel('global');
  return (
    <div>
      {/* <Guide name={trim(name)} /> */}
      login
    </div>
  );
};

export default Login;
