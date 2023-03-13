import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  fetchSingleProduct,
} from "../slices/singleProductSlice";
import { addCartItem } from "../slices/cartSlice";

const SingleProduct = () => {
  const [customerRating, setCustomerRating] = useState(null);
  const [customerReview, setCustomerReview] = useState("");
  const [qty, setQty] = useState(1);
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchSingleProduct(_id));
  }, [product]);

  const handleCart = () => {
    if (!user) {
      navigate("/cart");
      return;
    }

    let item = {
      productId: product._id,
      name: product.name,
      image: product.image,
      quantity: qty,
      price: product.price,
    };
    dispatch(addCartItem({ user: user, cartItem: { items: item } }));
    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    let newReview = {
      token: user?.token,
      rating: parseFloat(customerRating),
      message: customerReview,
    };
    dispatch(createProductReview({ productId: product?._id, newReview }));
    setCustomerRating(0)
    setCustomerReview("")
  };

  // console.log(customerRating);
  // console.log(product);
  return (
    <>
      <Box
        sx={{
          marginTop: {
            xs: "20px",
            lg: "30px",
          },
          padding: {
            xs: "30px",
            lg: "50px",
          },
        }}
      >
        <Grid
          container
          sx={{
            boxShadow: "2px 2px 8px whitesmoke",
            borderRadius: "10px",
            padding: "25px 20px",
            border: "6px solid whitesmoke",
          }}
        >
          <Grid item xs={12} sm={5} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                width: "100%",
              }}
            >
              <img src={product?.image} width="75%" height={"450px"} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                height: "100%",
                backgroundColor: "whitesmoke",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <Typography
                variant="h4"
                fontWeight={"bold"}
                title={product?.name}
                fontFamily="'Poppins'"
              >
                {product?.name.length > 50
                  ? `${product?.name.slice(0, 48)}...`
                  : product?.name}
              </Typography>
              <Typography
                variant="h6"
                fontFamily="'Poppins'"
                sx={{ marginTop: "20px" }}
              >
                Price : ${product?.price}
              </Typography>
              <Rating
                readOnly
                precision={0.5}
                value={product?.rating ? product.rating : null}
                sx={{ marginTop: "15px" }}
              />
              <Typography
                variant="h6"
                fontFamily="'Poppins'"
                sx={{ marginTop: "20px" }}
              >
                Description :
              </Typography>
              <Typography
                variant="subtitle2"
                fontFamily="'Poppins'"
                fontWeight={"400"}
                sx={{ marginTop: "20px", paddingRight: "30px" }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Laboriosam odit eum voluptates corporis, dicta esse tempore cum
                quo aperiam cupiditate. Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Unde molestias dolores quisquam ipsa atque
                quae sequi facilis aperiam inventore hic!
                {product?.description}
              </Typography>
              <Box
                display={"flex"}
                minWidth={"50%"}
                alignItems={"center"}
                mt={3}
                gap={3}
              >
                <Button
                  variant="contained"
                  sx={{
                    height: "40px",
                    bgcolor: `${
                      product?.countInStock <= 0 ? "red" : "primary"
                    }`,
                  }}
                  // sx={{
                  //   marginTop: "20px",
                  // }}
                  disabled={product?.countInStock <= 0}
                  onClick={handleCart}
                >
                  {product?.countInStock === 0 ? "Out of stock" : "Add to Cart"}
                </Button>
                {product?.countInStock > 0 && (
                  <FormControl size="small">
                    <InputLabel id="demo-simple-select-label">Qty</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={qty}
                      label="Age"
                      sx={{ height: "40px" }}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {Array.from({ length: product?.countInStock }, (_, i) => (
                        <MenuItem key={i} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          marginTop: {
            xs: "15px",
            md: "20px",
          },
          paddingInline: {
            xs: "30px",
            lg: "50px",
          },
          paddingBlock: {
            xs: "10px",
            lg: "20px",
          },
        }}
      >
        <Grid container component={Paper} elevation={4}>
          <Grid item xs={12} sm={5} md={6}>
            <Box sx={{ padding: "20px" }}>
              <Typography
                variant="h5"
                fontFamily={"Poppins"}
                letterSpacing={1}
                fontWeight={900}
              >
                Post a Review :
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  marginTop: "25px",
                }}
              >
                <Rating
                  precision={0.5}
                  value={customerRating}
                  onChange={(event, newValue) => {
                    setCustomerRating(newValue);
                  }}
                />
                <TextField
                  label="Message"
                  placeholder="Type your review"
                  size="small"
                  multiline
                  maxRows={4}
                  value={customerReview}
                  onChange={(e) => {
                    setCustomerReview(e.target.value);
                  }}
                  sx={{ width: {
                    xs: "80%",
                    sm: "90%",
                    md :"50%"
                  } }}
                />
                <Button
                  onClick={handleReview}
                  variant="contained"
                  sx={{ width: {
                    xs : "60%",
                    sm : "60%",
                    md : "25%"
                  }, marginTop: "15px" }}
                >
                  Post Review
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <Box sx={{ padding: "20px" }}>
              {product?.reviews?.length > 0 && (
                <Typography
                  variant="h5"
                  fontFamily={"Poppins"}
                  letterSpacing={1}
                  fontWeight={900}
                >
                  Customer Reviews :
                </Typography>
              )}
              {product?.reviews?.length > 0 &&
                product?.reviews.map((review) => (
                  <Box key={review._id} sx={{ marginBottom: "20px" }}>
                    <Box
                      display={"flex"}
                      gap={2}
                      alignItems={"flex-start"}
                      mt={2}
                    >
                      <Avatar>{review?.name?.slice(0, 1).toUpperCase()}</Avatar>
                      <Typography
                        variant="subtitle1"
                        fontFamily={"Poppins"}
                        // sx={{ marginTop: "10px", paddingRight: "30px" }}
                        fontWeight={"700"}
                      >
                        {review?.name
                          .slice(0, 1)
                          .toUpperCase()
                          .concat(review?.name.slice(1))}
                      </Typography>
                    </Box>
                    <Rating
                      readOnly
                      precision={0.5}
                      value={review?.rating}
                      sx={{ marginTop: "10px" }}
                    />
                    <Typography
                      variant="subtitle2"
                      fontFamily={"Poppins"}
                      fontWeight={"500"}
                      sx={{ marginTop: "5px", paddingRight: "70px" }}
                    >
                      {review.message}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SingleProduct;
