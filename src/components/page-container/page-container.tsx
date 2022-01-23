import { css } from "@emotion/react";

interface Props{
    children: JSX.Element | JSX.Element[];
}
const PageContainer = (props: Props) => {
    return (
        <div css={appStyle}>
            {props.children}
        </div>
    );
}

const appStyle = () => {
  return css`
    width: 100%;
    text-align: center;
    background: whitesmoke;
    padding: 50px 0;

    & button {
      background: #ff6c37;
      cursor: pointer;
    }

    & div.daterange {
      margin-top: 30px;
    }

    & div.insights {
      margin: 50px auto;
      padding: 30px 0;
      width: 90%;
      border: 3px black solid;
    }
  `;
};

export default PageContainer;