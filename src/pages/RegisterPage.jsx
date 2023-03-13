import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import loginImage from "../assets/loginImage.jpg";
import { registerUser } from "../slices/userSlice";


const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, loading , error} = useSelector((state) => state.user)
  const [err, setErr ] = useState(false)
  const [registerData, setRegisterData] = useState({
    username : "",
    email: "",
    password: "",
    cpassword : ""
  });

  useEffect(()=> {
    if(user){
      navigate("/")
    }
  }, [user])


  useEffect(()=> {
    if(error){
     setErr(error)
    }
  }, [error, user, loading])

  console.log(err )



  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(registerData));

    setRegisterData({
      username : "",
      email: "",
      password: "",
      cpassword : ""
    })  
    
  };

  return (
    <Box
      sx={{
        maxWidth: {
          xs: "80%",
          md: "50%",
          lg: "800px",
        },
        margin: "auto",
        marginTop: "50px",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Grid container>
        <Grid
          item
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
          md={4}
          lg={6}
        >
          <img src={loginImage} alt="" width={"100%"} />
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Typography my={3} variant={"h5"} textAlign="center">
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {
                err && (
                  <Alert severity="error">
                    {err}
                  </Alert>
                )
              }
              <TextField
                value={registerData.username}
                type={"text"}
                // required 
                onChange={handleChange}
                name="username"
                label={"Username"}
                variant={"outlined"}
                sx={{ marginBlock: "20px" }}
              />
              <TextField
                value={registerData.email}
                type={"email"}
                required 
                onChange={handleChange}
                name="email"
                label={"Email"}
                variant={"outlined"}
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                value={registerData.password}
                type={"password"}
                required 
                onChange={handleChange}
                name="password"
                label={"Password"}
                variant={"outlined"}
                sx={{ marginBottom: "20px" }}
              />
              <TextField
                value={registerData.cpassword}
                type={"password"}
                required 
                onChange={handleChange}
                name="cpassword"
                label={"Confirm Password"}
                variant={"outlined"}
                sx={{ marginBottom: "20px" }}
              />
              <Button variant="contained" size="large" type="submit">
                Register
              </Button>
              <Typography variant="body2" sx={{marginTop : "15px"}}>Already Have an account? <Link style={{color : "inherit"}} to={"/login"}>Login Here</Link></Typography>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPage;
