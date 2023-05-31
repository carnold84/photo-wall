import React from "react";

/* const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const dash = keyframes`
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
    }
`; */

/* const Path = styled.circle`
  stroke-width: 3px;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke-linecap: round;
`; */

/* const Loader = styled.div`
  position: relative;
  margin: 0 auto;
  width: 34px;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`; */

const Loading = () => {
  return (
    <div className="top-0 bottom-0 left-0 right-0 h-8 w-8">
      <div className="relative mx-0 my-auto w-8 before:block">
        <svg
          className="absolute top-0 bottom-0 left-0 right-0 m-auto h-8 w-8 origin-center animate-loadingCircle stroke-black"
          viewBox="25 25 50 50"
        >
          <circle
            className="animate-loadingPath"
            cx="50"
            cy="50"
            r="15"
            fill="none"
            strokeWidth="3"
            strokeMiterlimit="10"
            strokeDasharray="1, 200"
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loading;
