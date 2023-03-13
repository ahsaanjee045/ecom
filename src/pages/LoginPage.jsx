import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/loginImage.jpg";
import { loginUser } from "../slices/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, loading , error} = useSelector((state) => state.user)
  const [err, setErr ] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
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

  // console.log(err )

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
    setLoginData({
      email: "",
      password: "",
    });
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
            Login
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
                value={loginData.email}
                type={"email"}
                required
                onChange={handleChange}
                name="email"
                label={"Email"}
                variant={"outlined"}
                sx={{ marginBlock: "20px" }}
              />
              <TextField
                value={loginData.password}
                type={"password"}
                required
                onChange={handleChange}
                name="password"
                label={"Password"}
                variant={"outlined"}
                sx={{ marginBottom: "20px" }}
              />
              <Button variant="contained" size="large" type="submit">
                Login
              </Button>
              <Typography variant="body2" sx={{ marginTop: "15px" }}>
                Don't Have an account?{" "}
                <Link style={{ color: "inherit" }} to={"/signup"}>
                  Register Here
                </Link>
              </Typography>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
