import React from "react";
import { Grid, Switch } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductCatalog({
  products,
  layout,
  addToCart,
  setLayout,
}) {
  const isGridView = layout === "grid";

  return (
    <>
      <Switch
        checked={isGridView}
        onChange={() => setLayout(isGridView ? "table" : "grid")}
      />

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={isGridView ? 4 : 12} key={product.id}>
            <ProductCard
              product={product}
              addToCart={addToCart}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductCatalog;
