import { useReducer } from "react";

export default function LearnUseReducer() {
  console.log("page  render");
  const initData = [
    { name: "小满(只)", price: 100, count: 1, id: 1, isEdit: false },
    { name: "中满(只)", price: 200, count: 1, id: 2, isEdit: false },
    { name: "大满(只)", price: 300, count: 1, id: 3, isEdit: false },
  ];
  type List = typeof initData;
  const reducer = (
    state: List,
    action: { type: "add" | "sub" | "edit" | "del"; id: number }
  ) => {
    const target = state.find((item) => item.id === action.id)!;
    switch (action.type) {
      case "add":
        target.count++;
        return [...state];
      case "sub":
        target.count--;
        return [...state];
      default:
        return state;
    }
  };
  const initFn = () => {
    return initData;
  };
  const [data, dispatch] = useReducer(reducer, initData, initFn);

  return (
    <div>
      <h1>购物车</h1>
      <table border={1} cellPadding={0} cellSpacing={0} width={600}>
        <thead>
          <tr>
            <th>商品</th>
            <th>单价</th>
            <th>数量</th>
            <th>总价</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => dispatch({ type: "sub", id: item.id })}
                  >
                    -
                  </button>
                  {item.count}
                  <button
                    onClick={() => dispatch({ type: "add", id: item.id })}
                  >
                    +
                  </button>
                </td>
                <td>{item.price * item.count}</td>
                <td>
                  <button
                    onClick={() => dispatch({ type: "edit", id: item.id })}
                  >
                    修改
                  </button>
                  <button
                    onClick={() => dispatch({ type: "del", id: item.id })}
                  >
                    删除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>总价：</td>
            <td>
              {data.reduce((a, b) => {
                return a + b.price * b.count;
              }, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
