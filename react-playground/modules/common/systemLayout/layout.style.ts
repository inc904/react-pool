import styled from "@emotion/styled";

export const LayoutContainer = styled.div({
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",

    ".logo-vertical": {
        height: "32px",
        margin: "16px",
        background: "rgba(255, 255, 255, .2)",
        borderRadius: "6px",
    },

    ".header": {
        display: "flex",
        alignItems: "center",
        padding: 0,
    },

    ".user-center": {
        padding: "0 20px",
    }
})