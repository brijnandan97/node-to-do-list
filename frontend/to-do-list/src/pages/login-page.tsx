import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';


type FieldType = {
    username?: string;
    password?: string;
  };


export const LoginPage = ()=>{

    const onFinish: FormProps<FieldType>['onFinish'] = (values:any) => {
        window.fetch("http://localhost:8000/user/login",{
            method:"POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(values)
        }).then((response:any)=>{
            console.log(response);
            
        })
    };
      
      const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
      };


    return <>
        <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </>
}