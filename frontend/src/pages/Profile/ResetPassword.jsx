import { Button, Stack, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { resetPasswordFaculty } from "../../services/userServices";
import { AuthContext } from "../../context/AuthProvider";

const ResetPassword = () => {
  const [user] = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, status } = await resetPasswordFaculty(
      { password: password },
      user.insId
    );
    if (status === 200) {
      console.log(data);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5} marginTop={"2rem"}>
        <TextField
          label="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            maxWidth: "fit-content",
            backgroundColor: "#1B0441",
            ":hover": {
              backgroundColor: "#380975",
            },
            textTransform: "none",
          }}
        >
          Reset
        </Button>
      </Stack>
    </form>
  );
};

export default ResetPassword;
