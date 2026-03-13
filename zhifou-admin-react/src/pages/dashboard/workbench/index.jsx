import { Row, Col } from "antd";

import GetStart from "./components/getStart";
import { CountNum, ProjectBoard } from "./components";

export default function Workbench() {
  return (
    <Row gutter={16}>
      <Col span={18}>
        <Row gutter={16}>
          <Col span={18}>
            <GetStart className="flex-1" />
          </Col>
          <Col span={6} className="flex  gap-4">
            <div className="flex flex-col items-center justify-between h-full gap-4">
              <CountNum number={100} title="Total Users" className="flex-1" />
              <CountNum number={100} title="Total Users" className="flex-1" />
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <div className="flex flex-col gap-4">
          <ProjectBoard />
          <ProjectBoard />
        </div>
      </Col>
    </Row>
  );
}
