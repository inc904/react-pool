import { Image, Button, Typography, Card } from "antd";

export default function GetStart() {
  return (
    <Card>
      <div className="flex bg-white items-center px-6 py-10">
        <div className="flex flex-col gap-8 justify-start">
          <Typography.Title level={4} style={{ margin: 0 }}>
            You have 2 projects to finish this week
          </Typography.Title>
          <Typography.Text>
            You have already completed 68% of your monthly target. Keep going to
            achieve your goal.
          </Typography.Text>
          <Button type="primary" size="middle">
            Start Now
          </Button>
        </div>
        <Image
          src="/get-started.png"
          height={180}
          preview={false}
          style={{ objectFit: "cover" }}
        />
      </div>
    </Card>
  );
}
