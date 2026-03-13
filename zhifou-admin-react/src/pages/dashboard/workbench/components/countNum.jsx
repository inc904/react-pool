import { Card, Typography } from "antd";
export default function CountNum({ number, title }) {
  return (
    <Card className="w-full flex-1">
      <div className="flex flex-col items-center gap-2">
        <Typography.Title style={{ margin: 0 }}>{number}+</Typography.Title>
        <Typography.Text>{title}</Typography.Text>
      </div>
    </Card>
  );
}
