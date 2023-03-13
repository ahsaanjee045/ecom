import { Avatar, Box, Paper,Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchAllUsers, updateUserAdmin } from "../../slices/userSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const UserPanel = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, users} = useSelector(state => state.user)  
  useEffect(() => {
      !user && navigate("/");
      !user.isAdmin ? navigate("/") : dispatch(fetchAllUsers(user))
  }, [])
  // console.log(users)

  const handleUserChange= (e, nuser) => {
    if(!user.isAdmin || !user) return;
    dispatch(updateUserAdmin({nuser, user}))
  }

  const handleUserDelete = (nuser) => {
    if(!user.isAdmin || !user) return;
    dispatch(deleteUser({nuser, user}))
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
      <TableContainer component={Paper} elevation={4}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{
                  fontWeight: "600",
                  fontSize: "17px",
                  fontFamily: "'Poppins'",
                  paddingLeft: "50px",
                }}>
                  Avatar
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "17px",
                  fontFamily: "'Poppins'",
                }}
              >
                Username
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "17px",
                  fontFamily: "'Poppins'",
                }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "600",
                  fontSize: "17px",
                  fontFamily: "'Poppins'",
                }}
              >
                isAdmin
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
          {users?.map((user) => (
              <TableRow key={user?._id}>
                <TableCell align={"center"} sx={{
                  paddingLeft: "50px",
                }}>
                  <Avatar sx={{bgcolor : 'primary.dark'}} >{user?.username.slice(0, 1).toUpperCase()} </Avatar>
                </TableCell>
                <TableCell align={"center"}>{user?.username.slice(0,1).toUpperCase().concat(user?.username.slice(1))}</TableCell>
                <TableCell align={"center"}>{user?.email}</TableCell>
                <TableCell align={"center"}>
                  {user?.isAdmin ? (
                    <CheckIcon sx={{ color: "green" }} />
                  ) : (
                    <CloseIcon sx={{ color: "red" }} />
                  )}
                   &nbsp;| 
                  {/* <Switch defaultChecked color="secondary" /> */}
                  <Switch
                    checked={user?.isAdmin}
                    color="secondary"
                    onClick={(e) => handleUserChange(e, user)}
                  />
                </TableCell>
                <TableCell align={"center"}>
                  <DeleteIcon
                    onClick={() => handleUserDelete(user)}
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserPanel;
