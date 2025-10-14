import { Outlet } from "react-router";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <div className="sidebar">sidebar</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
