## 路由结构
- login
- dashboard
  - analysis
  - ecommerce
- example
  - forms
  - tables


```ts
const router = createBrowserRouter([
  { path: "/login", Component: Login },
  {
    path: "/",
    Component: Index,
    children: [
      { index: true, Component: Analysis }, 
      {
        path: "dashboard",
        children: [
          { index: true, Component: Analysis },
          { path: "analysis", Component: Analysis },
          { path: "ecommerce", Component: Ecommerce },
        ],
      },
      {
        path: "examples",
        children: [
          { index: true, Component: Forms },
          { path: "forms", Component: Forms },
          { path: "table", Component: Table },
        ],
      },
    ],
  },
]);
```

## question

1. 现在看起来是使用 ` { index: true, Component: XXX }` 代替了 重定向的 功能，是最佳实践吗？
