import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

import { LiveKitRoom } from "livekit-react";
import "livekit-react/dist/index.css";

async function onConnected(room: any) {
  await room.localParticipant.setCameraEnabled(true);
  await room.localParticipant.setMicrophoneEnabled(true);
}

export default function Room() {
  const navigate = useNavigate();
  const { roomName = "" } = useParams();
  const [token, setToken] = useState<any>("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/room/get-token/" + roomName, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       console.log(response.data.data.token);
  //       setToken(response.data.data.token);
  //     });
  // }, [roomName]);

  return (
    <Container maxWidth="xl">
      <h1>ROOM: {roomName}</h1>{" "}
      <Box>
        <LiveKitRoom
          url={"ws://localhost:7880"}
          token={roomName}
          onConnected={(room) => {
            return onConnected(room);
          }}
          // participantRenderer={(props) => {
          //   console.log(props);
          //   return <div />;
          // }}
          // stageRenderer={(stage) => {
          //   console.log(stage);
          //   return <div />;
          // }}
        />
      </Box>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/");
        }}
      >
        Leave
      </Button>
    </Container>
  );
}
