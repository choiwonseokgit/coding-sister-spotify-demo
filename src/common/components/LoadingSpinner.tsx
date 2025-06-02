const LoadingSpinner = () => {
  return (
    <>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

const spinnerStyle = {
  width: "48px",
  height: "48px",
  border: "5px solid rgba(0, 0, 0, 0.1)",
  borderLeftColor: "#4f46e5",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "100px auto",
  display: "block",
};

export default LoadingSpinner;
