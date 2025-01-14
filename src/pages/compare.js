import { Box, Button, Typography } from "@mui/material";
import { useCompare } from "../context/CompareContext";
import CompareTable from "@/components/CompareTable";

const Compare = () => {
  const { comparedProducts, removeFromCompare, emptyCompare } = useCompare();

  return (
    <Box sx={{ padding: "20px", marginTop: 6, minHeight: "80vh" }}>
      {/* Check if there are less than 2 products */}
      {comparedProducts.length < 2 ? (
        <Typography
          mt={1}
          variant="h6"
          align="center"
          sx={{ color: "#ff6f61" }}
        >
          Please select at least 2 products to compare.
        </Typography>
      ) : (
        <CompareTable
          comparedProducts={comparedProducts}
          removeFromCompare={removeFromCompare}
        />
      )}

      {comparedProducts.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={emptyCompare} // Call the emptyCart function here
            sx={{
              backgroundColor: "#ff6f61",
              color: "white",
              "&:hover": {
                backgroundColor: "#ff4b36",
              },
              padding: "10px 20px",
              textTransform: "none",
              marginTop: "20px",
            }}
          >
            Empty Compare
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Compare;
