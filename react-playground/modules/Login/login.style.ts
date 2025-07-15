import styled from "@emotion/styled";
import LoginImage from "@assets/images/winstead.jpg";

export const LoginContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: `url(${LoginImage}) no-repeat center center fixed`,
  backgroundSize: "cover",

  ".login-form": {
    background: "white",
    padding: "3rem",
    borderRadius: "1rem",
    boxShadow: "0 0 1rem 0.5rem rgba(0, 0, 0, 0.1)",
  },
});
