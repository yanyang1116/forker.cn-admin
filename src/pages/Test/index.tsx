import { PageContainer } from '@ant-design/pro-components';
// import { Access, useAccess } from '@umijs/max';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

const Test: React.FC = () => {
  const access = useAccess();
  console.log(access, 123123);
  return (
    <PageContainer
      ghost
      header={{
        title: '测试？？？',
      }}
    >
      <Button>测试测试</Button>
    </PageContainer>
  );
};

export default Test;
