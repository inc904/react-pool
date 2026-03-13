// mock/index.js
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
const secret = "secret";

export default [
  {
    url: "/api/login",
    method: "post",
    timeout: 200,
    response: (req, res) => {
      console.log("登录请求参数:", req.body);
      let body = req.body;
      if (body.username === "admin" && body.password === "1234567") {
        let token = sign(
          {
            username: body.username,
            password: body.password,
          },
          secret,
          { expiresIn: "1h" },
        );

        // 验证一下
        let decode = verify(token, secret);
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
