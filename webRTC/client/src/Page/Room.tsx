import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

import { LiveKitRoom } from "livekit-react";
import { RoomEvent, DataPacket_Kind, Participant} from "livekit-client";
import "livekit-react/dist/index.css";

async function onConnectedX(room: any) {
  const strData = JSON.stringify({some: "data"})
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const data = encoder.encode(strData);

  await room.localParticipant.setCameraEnabled(true);
  await room.localParticipant.setMicrophoneEnabled(true);
  console.log('matching...')

  await room.localParticipant.publishData(data, DataPacket_Kind.RELIABLE)
  await room.on(RoomEvent.DataReceived, async (payload: Uint8Array, participant: Participant, kind: DataPacket_Kind) => {
    const strData = await decoder.decode(payload)
    console.log(strData)
  })
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
            return onConnectedX(room);
          }}
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
