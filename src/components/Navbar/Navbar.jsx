import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import Container from "react-bootstrap/Container";
import { Button as Buttonbs } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Navbar as Navbarbs } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { fetchCartItems } from "../../slices/cartSlice";
import { logout } from "../../slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user);
  const { cart, totalQty } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    user && dispatch(fetchCartItems(user?.token));
  }, [user]);
  // console.log(isOpen);

  return (
    <React.Fragment>
      <Navbarbs bg="primary" expand="lg" className="text-light">
        <Container>
          <Navbarbs.Brand as={Link} to={"/"} className="text-light">
            ECOM
          </Navbarbs.Brand>
          <Navbarbs.Toggle aria-controls="basic-navbar-nav" />
          <Navbarbs.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex gap-1 pe-sm-2 pe-md-0 ">
              {user?.isAdmin && (
                <NavDropdown
                  className=""
                  title="Admin Panel"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to={"/admin/products"}>
                    Product Panel
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/admin/users"}>
                    User Panel
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to={"/admin/orders"}>
                    Order Panel
                  </NavDropdown.Item> */}
                </NavDropdown>
              )}
              <Nav.Link
                as={Link}
                to={"/cart"}
                className="text-light mx-lg-5"
                href="#home"
              >
                <Badge
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  badgeContent={user ? totalQty : 0}
                  color="secondary"
                >
                  Cart
                </Badge>
              </Nav.Link>
              {user && (
                <Nav.Link
                  as={"button"}
                  onClick={() =>{
                    dispatch(logout())
                    navigate("/")
                  }}
                  className="text-primary py-2 px-3 bg-light border-0 outline-0 rounded-3"
                  href="#link"
                >
                  Logout
                </Nav.Link>
              )}
              {!user && (
                <Nav.Link as={Link} to={"/login"} className="text-light">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbarbs.Collapse>
        </Container>
      </Navbarbs>
      {/* <div>
        <AppBar
          sx={{
            paddingInline: {
              sm: "30px",
              md: "40px",
              lg: "80px",
            },
          }}
          position="sticky"
        >
          <Toolbar
            sx={{
              display: " flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          > */}
      {/* <Link to="/">
              <Typography
                variant="h6"
                color={"white"}
                fontWeight={700}
                fontFamily={"'Poppins', sans-serif"}
              >
                ECOM
              </Typography>
            </Link> */}

      {/* not important */}
      {/* <Box
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              display: {
                md: "none",
              },
            }}
          >
            <MenuIcon
              sx={{
                verticalAlign: "middle",
                color: "white",
                width: "2.2rem",
                height: "2.2rem",
                cursor: "pointer",
              }}
            />
          </Box>
          <Box
            sx={{
              display: {
                md: "none",
              },
              // height: "200px",
              // width: "200px",
              bgcolor: "white",
              color : "#252020",
              boxShadow : "-2px 2px 15px  rgba(0, 0, 0, 0.3)",
              position: "absolute",
              borderRadius : "0 0 0 4px",
              zIndex : 100,
              // paddingInline: "30px",
              // paddingBlock : "10px",
              right: {
                xs: "0",
                sm: "-30px",
              },
              bottom: "-194%",
              transform: `${isOpen ? "translate(0)" : "translate(110%, 0)"}`,
              transition: "all 0.3s ease-in",
            }}
          >
            <ul style={{listStyle : "none", textAlign : "right"}}>
              <li style={{padding : "15px 30px 15px 40px"}}><Link style={{color : "inherit"}} to={"/cart"}>Cart</Link></li>
              <Divider/>
              {!user && <li style={{padding : "15px 30px 15px 40px"}}><Link style={{color : "inherit"}} to={"/login"}>Login</Link></li>} 
              {user && <li style={{padding : "15px 30px 15px 40px"}} onClick={() => dispatch(logout())}>Logout</li>} 
            </ul>
          </Box>
          {isOpen && <Box onClick={() => setIsOpen(!isOpen)} sx={{position : "absolute", top : "100%", left : "0", right : "0", bottom : "-100vh", background : "rgba(0,0,0,0.1)", zIndex : 99}}></Box>} */}

      {/* important */}
      {/* <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <nav>
                <ul
                  style={{
                    display: "flex",
                    // justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <li>
                    <Link
                      to={"/cart"}
                      style={{
                        color: "white",
                        padding: "10px",
                      }}
                    >
                      <Badge
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        badgeContent={user ? totalQty : 0}
                        color="secondary"
                      >
                        Cart
                      </Badge>
                    </Link>
                  </li>
                  {!user && (
                    <li>
                      <Link
                        to={"/login"}
                        style={{
                          color: "white",
                        }}
                      >
                        Login
                      </Link>
                    </li>
                  )}
                  {user && (
                    <li>
                      <Button
                        sx={{
                          color: "primary",
                          border: "1px solid transparent",
                          backgroundColor: "white",
                          ":hover": {
                            color: "white",
                            backgroundColor: "tranparent",
                            border: "1px solid white",
                          },
                        }}
                        onClick={() => {
                          dispatch(logout());
                        }}
                      >
                        Logout
                      </Button>
                    </li>
                  )}
                </ul>
              </nav>
            </Box> */}
      {/* </Toolbar>
        </AppBar>
      </div> */}
    </React.Fragment>
  );
};

export default Navbar;
