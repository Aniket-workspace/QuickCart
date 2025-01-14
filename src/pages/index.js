import { Container, Grid, Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useCategory } from "@/context/CategoryContext";
import { fetchCategories } from "./api/all-api";
import CategoryCard from "@/components/CategoryCard";
import Head from "next/head"; // Import next/head

const Homepage = ({ categories }) => {
  const validCategories = categories || [];
  const { selectedCategories, toggleCategory } = useCategory();

  // Filtered categories based on selected filters
  const filteredCategories = selectedCategories.length
    ? validCategories.filter((category) =>
        selectedCategories.includes(category.slug)
      )
    : validCategories;

  return (
    <>
      <Head>
        <title>QuickCart | Your E-commerce Store</title>
        <meta
          name="description"
          content="Discover products across various categories. Shop by your favorite category and find the best deals!"
        />
        <meta
          name="keywords"
          content="e-commerce, shop, categories, online store, products"
        />
        <meta property="og:title" content="QuickCart | Your E-commerce Store" />
        <meta
          property="og:description"
          content="Browse through categories and find your favorite products on our online store."
        />
        <meta property="og:image" content="path_to_image.jpg" />
        <meta property="og:url" content="https://www.yourstore.com" />
      </Head>

      <Container maxWidth="lg" sx={{ paddingTop: 4, marginTop: 7, minHeight: "80vh" }}>
        {/* Hero Section with Gradient Background */}
        <Box
          sx={{
            textAlign: "center",
            background: "linear-gradient(135deg, #ff6f61, #ffcc00)",
            padding: { xs: "30px 0", sm: "50px 0" },
            borderRadius: "8px",
            boxShadow: 3,
            marginBottom: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: { xs: "2rem", sm: "3rem" },
            }}
          >
            Shop by Category
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              marginTop: 1,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Find products in your favorite categories!
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Sidebar Filter Section */}
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                padding: 2,
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 2,
                  color: "#ff4b39",
                  backgroundColor: "#fff",
                  textAlign: "center",
                  padding: "5px",
                  borderRadius: 2,
                }}
              >
                Filter by Category
              </Typography>
              <FormGroup>
                {validCategories.map((category) => (
                  <FormControlLabel
                    key={category.slug}
                    control={
                      <Checkbox
                        name={category.slug}
                        checked={selectedCategories.includes(category.slug)}
                        onChange={() => toggleCategory(category.slug)}
                        sx={{
                          color: "#ff6f61",
                          "&.Mui-checked": {
                            color: "#ff6f61",
                          },
                        }}
                      />
                    }
                    label={category.name}
                    sx={{ textTransform: "capitalize" }}
                  />
                ))}
              </FormGroup>
            </Box>
          </Grid>

          {/* Main Category Display Section */}
          <Grid item xs={12} sm={9}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 4,
              }}
            >
              {filteredCategories.length > 0 ? (
                <CategoryCard validCategories={filteredCategories} />
              ) : (
                <Typography variant="h6" align="center">
                  No categories available.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  try {
    const categories = await fetchCategories();

    // If categories are undefined or empty, return an empty array
    if (!categories || categories.length === 0) {
      return {
        props: { categories: [] },
      };
    }

    return {
      props: { categories },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      props: { categories: [] },
    };
  }
}

export default Homepage;
