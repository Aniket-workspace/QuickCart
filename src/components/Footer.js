import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ff4b39",
        color: "white",
        padding: "30px",
        marginTop: "30px",
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} QuickCart. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
