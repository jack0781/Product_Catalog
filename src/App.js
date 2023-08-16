import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ProductCatalog from "./components/ProductCatalog";
import Cart from "./components/Cart";
import productsData from "./data/productsData.json";
import inventoryData from "./data/inventoryData.json";
import couponData from "./data/couponData.json";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: "20px",
  },
  container: {
    paddingTop: "40px",
    paddingBottom: "40px",
    minHeight: "calc(100vh - 140px)",
  },
  footer: {
    marginTop: "auto",
    padding: "10px",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
}));

function App() {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const classes = useStyles();
  const applyCoupon = (couponCode) => {
    const coupon = couponData.find((coupon) => coupon.code === couponCode);

    if (coupon) {
      setAppliedCoupon(coupon);
    }
  };

  const totalValueWithDiscount = appliedCoupon
    ? totalValue * (1 - appliedCoupon.discount / 100)
    : totalValue;

  useEffect(() => {
    const productsWithInventory = productsData.map((product) => {
      const inventoryItem = inventoryData.find(
        (item) => item.productId === product.id
      );
      if (inventoryItem) {
        return { ...product, inventory: inventoryItem.quantity };
      }
      return product;
    });

    setProducts(productsWithInventory);
  }, []);

  useEffect(() => {
    const savedLayout = localStorage.getItem("layout");
    if (savedLayout) {
      setLayout(savedLayout);
    }

    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("layout", layout);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [layout, cartItems]);

  const addToCart = (productId, price) => {
    const product = products.find((item) => item.id === productId);
    const updatedCartItems = [...cartItems];
    const existingCartItem = updatedCartItems.find(
      (item) => item.productId === productId
    );

    if (product && product.inventory > 0) {
      if (existingCartItem) {
        if (
          existingCartItem.quantity < existingCartItem.limitPerOrder &&
          product.inventory > 0
        ) {
          existingCartItem.quantity += 1;
          setTotalItems(totalItems + 1);
          setTotalValue(totalValue + price);
          product.inventory -= 1;
        }
      } else {
        updatedCartItems.push({
          productId: product.id,
          name: product.name,
          quantity: 1,
          limitPerOrder: product.limitPerOrder,
        });
        setTotalItems(totalItems + 1);
        setTotalValue(totalValue + price);
        product.inventory -= 1;
      }

      setCartItems(updatedCartItems);
    }
  };

  const removeFromCart = (productId, quantity, price) => {
    const product = products.find((item) => item.id === productId);

    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );

    if (product) {
      const existingCartItem = cartItems.find(
        (item) => item.productId === productId
      );

      if (existingCartItem) {
        product.inventory += existingCartItem.quantity;
      }

      setTotalItems(totalItems - quantity);
      setTotalValue(totalValue - quantity * product.price);

      setCartItems(updatedCartItems);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">Product Catalog</Typography>
          <Cart
            cartItems={cartItems}
            totalItems={totalItems}
            totalValue={totalValueWithDiscount}
            removeFromCart={removeFromCart}
            applyCoupon={applyCoupon}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={classes.container}>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
        >
          <ProductCatalog
            products={products}
            layout={layout}
            addToCart={addToCart}
            setLayout={setLayout}
          />
        </Box>
      </Container>
      <footer className={classes.footer}>All rights reserved by Product Catalog with cart</footer>
    </ThemeProvider>
  );
}

export default App;
