import { Box } from "@mui/material";

const CountdownTimer = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        background: "linear-gradient(135deg, #ff4500, #ff6f61)",
        color: "#fff",
        padding: "5px 0",
        fontSize: "0.875rem",
        marginTop: -4,
      }}
    >
      Offer ends in: {formatTime(timeLeft)}
    </Box>
  );
};

export default CountdownTimer;
