import { Box } from "@mui/system";
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productSlice";

const Home = () => {
  const {products, loading, error} = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchProducts())
  }, [])
  return (
    <Box sx={{
      marginTop : {
        xs : "20px",
        md : "40px",
        lg : "50px",
      },
      paddingInline : {
        xs : "20px",
        md : "40px",
        lg : "50px",
      },
      display : "flex",
      flexWrap : "wrap",
      gap : "30px",
      justifyContent : "center",
    }}>
      {
        products && products.map((product) => {
          return <ProductCard key={product._id} product={product} />
        })
      }
      {
        products && products.map((product) => {
          return <ProductCard key={product._id} product={product} />
        })
      }
      {/* <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard /> */}
    </Box>
  );
};

export default Home;
