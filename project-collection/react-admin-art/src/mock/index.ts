import jwt from "jsonwebtoken";

const secret = "secret";

interface LoginRequestBody {
  username: string;
  password: string;
}

interface MockRequest {
  body: LoginRequestBody;
}

export default [
  {
    url: "/api/auth/login",
    method: "post",
    timeout: 200,
    response: (req: MockRequest) => {
      console.log("登录请求参数:", req.body);
      const body = req.body;
      if (body.username === "admin" && body.password === "123123") {
        const token = jwt.sign(
          {
            username: body.username,
            password: body.password,
          },
          secret,
          { expiresIn: "1h" },
        );

        // 验证一下
        const decode = jwt.verify(token, secret);
        console.log("decode", decode);

        return {
          code: 200,
          data: {
            user: body.username,
            roles: ["admin"],
            token,
          },
          message: "success",
        };
      } else {
        return {
          code: 401,
          message: "用户名或密码错误",
        };
      }
    },
  },
  {
    url: "/api/todos",
    method: "get",
    response: () => {
      console.log("获取待办事项请求");
      return {
        code: 0,
        message: "success",
        data: [
          { id: 1, title: "todo1", completed: false },
          { id: 2, title: "todo2", completed: true },
        ],
      };
    },
  },
];
