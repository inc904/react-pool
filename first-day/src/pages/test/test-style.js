import testStyle from "./test.css";
import moduleStyle from "./test.module.css";

export default StyleTest = () => {
  return (
    <div>
      <div className="text-danger">danger text</div>
      <div className={testStyle["text-success"]}>success text</div>
      <div className={moduleStyle["text-primary"]}>primary text</div>
    </div>
  );
};
