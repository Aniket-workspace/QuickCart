import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
// import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { CompareProvider } from "@/context/CompareContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "@/styles/globals.css";
import { CssBaseline, GlobalStyles } from "@mui/material";

export default function App({ Component, pageProps }) {


  const globalStyles = (
    <GlobalStyles
      styles={{
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: '#f0f0f0',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '4px',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
      }}
    />
  );
  return (
    <CategoryProvider>
      <CompareProvider>
        <CartProvider>
          <WishlistProvider>
            {/* <Navbar /> */}
            <Navbar/>
            <CssBaseline />
            {globalStyles}
            <Component {...pageProps} />
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </CompareProvider>
    </CategoryProvider>
  );
}
