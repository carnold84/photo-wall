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
