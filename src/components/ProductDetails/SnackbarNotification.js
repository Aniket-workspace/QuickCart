import { Snackbar, Alert } from "@mui/material";

const SnackbarNotification = ({ open, message, onClose, severity, key }) => {
  return (
    <Snackbar
      key={message}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
