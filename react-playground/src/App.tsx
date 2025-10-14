import { css } from "@emotion/react";
import styled from "@emotion/styled";
import "./App.css";
import Home from "@modules/Home";

const style = css`
  color: red;
`;

const anotherStyle = css({
  textDecoration: "underline",
});
const Button = styled.button`
  color: hotpink;
`;
function App() {
  return (
    <>
      <div css={style}>
        hello react!
        <div css={anotherStyle}>Some text with an underline.</div>
      </div>
      <Button>hello styled!</Button>
      <div css={[anotherStyle, style]}>Some text with an underline.</div>
      <Home />
    </>
  );
}

export default App;
