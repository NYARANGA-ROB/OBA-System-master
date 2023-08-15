import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../services/userServices";
const Profile = () => {
  const [user] = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const getUserData = async () => {
      const { data, status } = await getUserProfile(user.insId);
      setUserData(data);
    };
    getUserData();
  }, []);
  console.log(userData);
  return (
    <div className="outer-container-profile">
      <Stack
        spacing={2}
        sx={{
          padding: "3rem 20rem 5rem 2rem",
          borderRadius: "10px",
          margin:"0px 400px 200px 0px",
          boxShadow: "0 12px 32px 0 rgba(31, 38, 135, 0.37);",
        }}
      >
         <h1>Sukkur IBA University</h1><br/>
         
        <Typography>
          <b> Name: </b>
          {userData.fullName}
          
        </Typography>
        <Divider />
        <Typography>
          <b> INS ID: </b>
          {userData.insId}
        </Typography>
      </Stack>
    </div>
  );
};

export default Profile;
