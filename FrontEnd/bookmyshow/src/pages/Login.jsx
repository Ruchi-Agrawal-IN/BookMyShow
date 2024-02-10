import { Form, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../apiCalls/users";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      console.log("login api response", response);
      if (response.data.success) {
        message.success(response.data.message);
        await localStorage.setItem("token", response.data.data);
        // navigate for next page
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(`LoginUser API error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center h-screen w-screen items-center bg-primary">
      <div className="card p-3 ">
        <h1 className="text-xl mb-1">Welcome Again! Please Login</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" autoComplete="current-password" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Link to="/register" className="text-primary">
              Donot have an account? Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
