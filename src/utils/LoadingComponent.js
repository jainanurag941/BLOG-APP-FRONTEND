import React from "react";
import { css } from "@emotion/react";
import RiseLoader from "react-spinners/CircleLoader";

const override = css`
    display: block,
    margin: 0 auto,
    borderColor: red,
  `;

const LoadingComponent = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div style={style}>
      <RiseLoader color="#123abc" loading={true} css={override} size={100} />
    </div>
  );
};

export default LoadingComponent;
