import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  deleteFromCart,
  fetchCartItems,
} from "../slices/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    user && dispatch(fetchCartItems(user.token));
  }, [user]);
  const { cart, subTotal, totalQty, loading, error } = useSelector(
    (state) => state.cart
  );
  // console.log("cart state", cart, subTotal, totalQty);

  return (
    <Box
      sx={{
        marginTop: {
          xs: "20px",
          lg: "20px",
        },
        padding: {
          xs: "30px",
          lg: "50px",
        },
      }}
    >
      {!cart?.items?.length && !error && user && loading && (
        <Alert severity="info">
          Please Wait! We are loading your cart items
        </Alert>
      )}
      {user && !loading && !error && !cart?.items?.length && (
        <Alert severity="warning">
          You don't have any item in your cart. Please Add items first.
        </Alert>
      )}
      {!user && (
        <Alert severity="warning">
          You are not Logged in. Please <Link to={"/login"}>Login</Link> first. 
        </Alert>
      )}
      {user && cart?.items.length > 0 && (
        <Grid container>
          <Grid item xs={12} sm={7} md={8}>
            <TableContainer component={Paper}> 
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "600",
                        fontSize: "17px",
                        fontFamily: "'Poppins'",
                        paddingLeft: "50px",
                      }}
                    >
                      Image
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: "17px",
                        fontFamily: "'Poppins'",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: "17px",
                        fontFamily: "'Poppins'",
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: "17px",
                        fontFamily: "'Poppins'",
                      }}
                    >
                      Qty
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: "17px",
                        fontFamily: "'Poppins'",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart?.items.map((item) => (
                    <TableRow
                      key={item?.productId}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ height: "90px", paddingLeft: "50px" }}
                      >
                        <img
                          src={item?.image}
                          alt={item?.name}
                          // width={"100%"}
                          height={"100%"}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {item?.name.length > 30
                          ? `${item?.name.slice(0, 28)}...`
                          : item?.name}
                      </TableCell>
                      <TableCell align="center">{item?.price}</TableCell>
                      <TableCell align="center">
                        <FormControl>
                          {/* <InputLabel id="demo-simple-select-label">
                            Qty
                          </InputLabel> */}
                          <Select
                            // labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={item?.quantity}
                            // label="Qty"
                            onChange={(e) =>
                              dispatch(
                                addCartItem({
                                  user: user,
                                  cartItem: {
                                    items: {
                                      productId: item.productId,
                                      quantity: e.target.value,
                                      image: item.image,
                                      price: item.price,
                                      name: item.name,
                                    },
                                  },
                                })
                              )
                            }
                            size="small"
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <DeleteIcon
                          onClick={() =>
                            dispatch(
                              deleteFromCart({
                                user: user,
                                productId: item.productId,
                              })
                            )
                          }
                          sx={{
                            cursor: "pointer",
                            color: "primary.dark",
                            ":hover": { color: "primary.light", scale: "1.1" },
                            transition: "all 0.3s ease-in-out",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={4}
            sx={{
              paddingInline: {
                sm: "20px",
              },
              marginTop: {
                xs: "20px",
                md: "0",
              },
            }}
          >
            <Paper
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Typography variant="h6">
                Total Items : {totalQty && totalQty}
              </Typography>
              <Typography variant="h6">
                Total Amount : ${subTotal && subTotal}
              </Typography>
              <Button variant="contained">Checkout</Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;
