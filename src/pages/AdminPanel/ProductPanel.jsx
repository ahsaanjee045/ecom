import {
  Box,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  Button as Buttonmui,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  deleteAProduct,
  fetchProducts,
  updateProduct,
} from "../../slices/productSlice";
import { Button } from "react-bootstrap";
import { Edit } from "@mui/icons-material";
import ProductRow from "../../components/ProductRow";

const ProductPanel = () => {
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    countInStock: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    !user && !user?.isAdmin && navigate("/");
    user && user?.isAdmin && dispatch(fetchProducts());
  }, [user]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    outline: "none",
    p: 4,
  };

  const createNewProduct = () => {
    if (user && user?.isAdmin) {
      dispatch(addProduct({ token: user.token, productData }));
      handleClose();
      setProductData({
        name: "",
        image: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        countInStock: "",
      });
      // user && user?.isAdmin && dispatch(fetchProducts());
    }
  };

  const handleDelete = (productId) => {
    user && user.isAdmin && dispatch(deleteAProduct({
          token: user?.token,
          productId,
        })
      );
    // user && user.isAdmin && dispatch(fetchProducts())
  };

  const handleUpdate = ({user, productId, updatedData}) => {
    if(user && user.isAdmin){
      dispatch(updateProduct({user,productId,updatedData}))
    }
  }

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
      <Box
        sx={{
          marginBottom: "15px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={() => handleOpen()}>+ Add Product</Button>
      </Box>
      <TableContainer component={Paper} elevation={4}>
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
                Stock
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
            {products?.map((product) => (
              <ProductRow
                key={product?._id}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                product={product}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Stack spacing={3}>
            <Box>
              <label>Name: </label>
              <TextField
                fullWidth
                required
                variant="standard"
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
              />
            </Box>
            <Box>
              <label>Image : </label>
              <TextField
                fullWidth
                required
                variant="standard"
                value={productData.image}
                onChange={(e) =>
                  setProductData({ ...productData, image: e.target.value })
                }
                // onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <label>Brand: </label>
              <TextField
                fullWidth
                required
                // value={brand}
                variant="standard"
                value={productData.brand}
                onChange={(e) =>
                  setProductData({ ...productData, brand: e.target.value })
                }
                // onChange={(e) => setBrand(e.target.value)}
              />
            </Box>
            <Box>
              <label>Category: </label>
              <TextField
                fullWidth
                required
                variant="standard"
                value={productData.category}
                onChange={(e) =>
                  setProductData({ ...productData, category: e.target.value })
                }
              />
            </Box>
            <Box>
              <label>Description: </label>
              <TextField
                fullWidth
                multiline
                required
                maxRows={4}
                variant="standard"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              />
            </Box>
            <Box>
              <label>Price: </label>
              <TextField
                fullWidth
                variant="standard"
                required
                value={productData.price}
                onChange={(e) =>
                  setProductData({ ...productData, price: e.target.value })
                }
              />
            </Box>
            {/* <input type="number" min={0} name="" id="" /> */}
            <Box>
              <label>Count in stock: </label>
              <TextField
                fullWidth
                variant="standard"
                type={"number"}
                required
                value={productData.countInStock}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    countInStock: parseInt(e.target.value),
                  })
                }
              />
            </Box>
            <Buttonmui onClick={createNewProduct} variant="contained">
              Add Product
            </Buttonmui>
          </Stack>
        </Paper>
      </Modal>
    </Box>
  );
};

export default ProductPanel;
