import "../../styles/loading.css";

const LoadingScreen = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: "center" }} className="textEffect">
        <div className="text-white">
          <h1 className="font-light text-[35px]">E€ONOMIC IMPACT OF THE</h1>
          <h1 className="font-bold text-[60px] ">Olympic Games</h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
