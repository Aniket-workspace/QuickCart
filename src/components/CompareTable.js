// components/CompareTable.js

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useTitleToSlug } from "@/customHooks/useTitleToSlug";

const CompareTable = ({ comparedProducts, removeFromCompare }) => {
  const { addToCart } = useCart();

  // Function to truncate title to 5 words
  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 5) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return title;
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 2,
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 670 }} aria-label="compare products table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Product</TableCell>
              {comparedProducts.map((product) => {
                const slug = useTitleToSlug(product.title);

                return (
                  <TableCell key={product.id} align="center">
                    <Link href={`/products/${product.id}/${slug}`} passHref>
                      {/* image */}
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={100}
                        height={100}
                        unoptimized
                        style={{ borderRadius: "4px" }} // Optional styling
                      />

                      <Tooltip title={product.title} arrow>
                        {/* title */}
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                          {truncateTitle(product.title)}
                        </Typography>
                      </Tooltip>
                    </Link>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* price */}
            <TableRow>
              <TableCell align="center">Price</TableCell>
              {comparedProducts.map((product) => (
                <TableCell key={product.id} align="center">
                  ${product.price}
                </TableCell>
              ))}
            </TableRow>

            {/* brand */}
            <TableRow>
              <TableCell align="center">Brand</TableCell>
              {comparedProducts.map((product) => (
                <TableCell key={product.id} align="center">
                  {product.brand ? product.brand : "-"}
                </TableCell>
              ))}
            </TableRow>

            {/* Warranty */}
            <TableRow>
              <TableCell align="center">Warranty</TableCell>
              {comparedProducts.map((product) => (
                <TableCell key={product.id} align="center">
                  {product.warrantyInformation}
                </TableCell>
              ))}
            </TableRow>

            {/* return */}
            <TableRow>
              <TableCell align="center">Return Policy</TableCell>
              {comparedProducts.map((product) => (
                <TableCell key={product.id} align="center">
                  {product.returnPolicy}
                </TableCell>
              ))}
            </TableRow>

            {/* category */}
            <TableRow>
              <TableCell align="center">Category</TableCell>
              {comparedProducts.map((product) => (
                <TableCell key={product.id} align="center">
                  {product.category}
                </TableCell>
              ))}
            </TableRow>

            {/* discount */}
            <TableRow>
              <TableCell align="center">Discount</TableCell>
              {comparedProducts.map((product) => (
                <TableCell key={product.id} align="center">
                  {product.discountPercentage
                    ? product.discountPercentage
                    : "0"}
                  %
                </TableCell>
              ))}
            </TableRow>

            {/* action */}
            <TableRow>
              <TableCell align="center">Action</TableCell>
              {comparedProducts.map((product) => (
                <TableCell key={product.id} align="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => addToCart(product)}
                    size="small"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      marginTop: "10px",
                      marginRight: "10px",
                      backgroundColor: "#ff6f61",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#ff4b36",
                      },
                    }}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCompare(product.id)}
                    size="small"
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      marginTop: "10px",
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CompareTable;
