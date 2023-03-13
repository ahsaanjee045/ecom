import { Edit } from "@mui/icons-material";
import { Box, Modal, Paper, Stack, TableCell, TableRow, TextField, Button as Buttonmui } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAProduct, fetchProducts, updateProduct } from "../slices/productSlice";

const ProductRow = ({handleDelete,  product, handleUpdate }) => {
  const [productData, setProductData] = useState({
    name: product?.name,
    image: product?.image,
    brand: product?.brand,
    category: product?.category,
    description: product?.description,
    price: product?.price,
    countInStock: product?.countInStock,
  });

  // console.log("In Product Row : " , productData, product._id  )

  const {user} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  



  return (
    <>
      <TableRow
        key={product?._id}
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
            src={product?.image}
            alt={product?.name}
            // width={"100%"}
            height={"100%"}
          />
        </TableCell>
        <TableCell align="center">
          {product?.name?.length > 30
            ? `${product?.name?.slice(0, 28)}...`
            : product?.name}
        </TableCell>
        <TableCell align="center">{product?.price}</TableCell>
        <TableCell align="center">{product?.countInStock}</TableCell>
        <TableCell align="center">
          <Box
            display={"flex"}
            gap={2}
            justifyContent="center"
            fontSize={"18px"}
          >
            <DeleteIcon
              sx={{
                cursor: "pointer",
                color: "rgba(255, 0,0,0.7)",
                ":hover": {
                  color: "rgba(255, 0,0,1)",
                },
              }}
              onClick={() => handleDelete(product?._id)}
            />
            <Edit
              sx={{
                cursor: "pointer",
                color: "primary.main",
                ":hover": {
                  color: "primary.light",
                },
              }}
              onClick={() => handleOpen()}
            />
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
                      value={productData?.name}
                      variant="standard"
                      onChange={(e) =>
                        setProductData({ ...productData, name: e.target.value })
                      }
                    />
                  </Box>
                  <Box>
                    <label>Image: </label>
                    <TextField
                      fullWidth
                      required
                      value={productData?.image}
                      variant="standard"
                      onChange={(e) =>
                        setProductData({ ...productData, image: e.target.value })
                      }
                    />
                  </Box>
                  <Box>
                    <label>Brand: </label>
                    <TextField
                      fullWidth
                      required
                      value={productData?.brand}
                      variant="standard"
                      onChange={(e) =>
                        setProductData({ ...productData, brand: e.target.value })
                      }
                    />
                  </Box>
                  <Box>
                    <label>Category: </label>
                    <TextField
                      fullWidth
                      required
                      value={productData?.category}
                      variant="standard"
                      onChange={(e) =>
                        setProductData({ ...productData, category: e.target.value })
                      }
                    />
                  </Box>
                  <Box>
                    <label>Description: </label>
                    <TextField
                      fullWidth
                      required
                      value={productData?.description}
                      variant="standard"
                      onChange={(e) =>
                        setProductData({ ...productData, description: e.target.value })
                      }
                    />
                  </Box>
                  <Box>
                    <label>Price: </label>
                    <TextField
                      fullWidth
                      required
                      value={productData?.price}
                      variant="standard"
                      onChange={(e) =>
                        setProductData({ ...productData, price: e.target.value })
                      }
                    />
                  </Box>
                  <Box>
                    <label>Count in stock: </label>
                    <TextField
                      fullWidth
                      required
                      value={productData?.countInStock}
                      variant="standard"
                      onChange={(e) =>
                        setProductData({ ...productData, countInStock: e.target.value })
                      }
                    />
                  </Box>
                  <Buttonmui
                    onClick={() => {
                      handleUpdate({user , productId : product._id, updatedData : productData})
                      handleClose();
                    }}
                    variant="contained"
                  >
                    UPDATE
                  </Buttonmui>
                </Stack>
              </Paper>
            </Modal>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ProductRow;
