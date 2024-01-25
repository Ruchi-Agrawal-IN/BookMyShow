import { Link } from "react-router-dom";
import { Form, message, Button } from "antd";
import { RegisterUser } from "../apiCalls/users";

const Register = () => {
  // HOMEWORK: Whenever form is submitted, remove all fields
  // Or set them to default
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    try {
      const { data } = await RegisterUser(values);
      console.log(data);
      if (data.success) {
        message.success(data.message);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
    }
    form.resetFields();
  };

  return (
    <div className="flex justify-center h-screen w-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">
          Welcome to Scaler Shows! Please Register!
        </h1>
        <hr />
        <Form
          form={form}
          layout="vertical"
          className="mt-1"
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Link to="/login" className="text-primary">
              Already have an account? Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
