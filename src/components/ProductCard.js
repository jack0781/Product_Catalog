import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardActions,
} from "@mui/material";

function ProductCard({ product, addToCart }) {
  const { id, name, price, inventory, variants } = product;
  const [selectedVariant, setSelectedVariant] = useState(null);
 
  const handleAddToCart = () => {
    if (selectedVariant !== null) {
      const variant = variants[selectedVariant];
      addToCart(id, variant.price);
    }
  };

  const inventoryWarning =
    inventory <= 3 ? (
      <Box mt={1}>
        <Typography variant="body2" color="error">
          Low inventory! Only {inventory} left.
        </Typography>
      </Box>
    ) : null;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {selectedVariant !== null ? name +' '+ variants[selectedVariant].name : name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <Typography variant="body1">
          Price: ${selectedVariant !== null ? variants[selectedVariant].price : price}
        </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Inventory: {inventory}
        </Typography>
        {inventoryWarning}
        <CardActions>
          {variants.map((variant, index) => (
            <Button
              key={index}
              variant="outlined"
              size="small"
              onClick={() => setSelectedVariant(index)}
            >
              {variant.name}
            </Button>
          ))}
        </CardActions>
        <CardActions>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            disabled={selectedVariant === null}
          >
            Add to Cart
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
