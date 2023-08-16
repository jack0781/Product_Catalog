import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Drawer,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  couponSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  textField: {
    width: '90%',
    marginBottom: "20px",
  },
  couponButton: {
    width: '90%',
  },
}));

function Cart({
  cartItems,
  totalItems,
  totalValue,
  removeFromCart,
  applyCoupon,
}) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
  };
  return (
    <div style={{marginLeft:"87%"}}>
      <IconButton color="inherit" onClick={toggleDrawer}>
        <ShoppingCartIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        className={classes.drawer}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}>
            CART<ShoppingCartIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.couponSection}>
          <TextField
            label="Coupon Code"
            variant="outlined"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className={classes.textField}
          />
          <Button
            variant="contained"
            onClick={handleApplyCoupon}
            className={classes.couponButton}
            
          >
            Apply Coupon
          </Button>
        </div>
        <Typography style={{marginLeft:"20px"}}>Total Items: {totalItems}</Typography>
        <Typography style={{marginLeft:"20px"}}>Total Value: ${totalValue}</Typography>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.productId}>
              <ListItemText
                primary={item.name}
                secondary={`Quantity: ${item.quantity}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() =>
                    removeFromCart(item.productId, item.quantity, item.price)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default Cart;
