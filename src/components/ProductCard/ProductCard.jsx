import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div>
      <Card
        sx={{ maxWidth: 320, width: 300, borderRadius: "15px" }}
        elevation={4}
      >
        <Link to={`/product/${product?._id}`}>
          <CardMedia
            sx={{ height: 270, width: 250, margin: "auto", backgroundPosition : 'center', backgroundSize : '80%' }}
            image={product?.image}
            
            title={product?.name}
          />
        </Link>
        <CardContent sx={{ height: 150 }}>
          <Link to={`/product/${product?._id}`}>
            <Typography
              gutterBottom
              variant="h6"
              fontWeight={700}
              component="div"
              color={"black"}
            >
              {product?.name.length > 24 ? (`${product?.name.slice(0, 20)}...`) : (product?.name)}
            </Typography>
          </Link>
          <Typography gutterBottom variant="h6" component="div">
            Price : ${product?.price}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{height : "44px", overflow : 'hidden'}}>
            {product?.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
