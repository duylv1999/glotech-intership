import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Home() {
  let navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const redirectUrl = (url: any) => {
    navigate("/room/" + url);
  };

  // useEffect(() => {
  //   axios
  //     .post(
  //       "http://localhost:8080/api/auth/register",
  //       { username: "minh", uid_google: "asdf", url_image: "asdf" },
  //       { withCredentials: true }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     });
  // }, []);

  return (
    <Container maxWidth="xl">
      <h1>Home</h1>
      <Button
        sx={{ display: "block", marginBottom: "1rem" }}
        variant="outlined"
        onClick={() => {
          redirectUrl(roomName);
        }}
      >
        Join
      </Button>
      <TextField
        sx={{ display: "block" }}
        value={roomName}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={(e) => setRoomName(e.target.value)}
      />
    </Container>
  );
}
