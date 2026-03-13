import React from "react";
import { Button } from "antd";
import "./index.scss";

export default function User() {
  return (
    <div>
      <h1 className="text-danger underline">User</h1>
      <Button type="primary">Primary Button</Button>
    </div>
  );
}
