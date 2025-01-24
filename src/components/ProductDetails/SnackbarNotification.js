import { Snackbar, Alert } from "@mui/material";

const SnackbarNotification = ({ open, message, onClose, severity, key }) => {
  return (
    <Snackbar
      key={message}
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert onClose={onClose} severity={"success"} color={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
