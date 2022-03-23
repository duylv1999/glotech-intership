import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

import { LiveKitRoom, useRoom } from "livekit-react";
import * as livekit from "livekit-client";

import { 
  RoomEvent, 
  DataPacket_Kind, 
  Participant
} from "livekit-client";

import "livekit-react/dist/index.css";


export default function Room() {
  const navigate = useNavigate();
  const { roomName = "" } = useParams();
  const [token, setToken] = useState<any>("");
  const [message, setMessage] = useState('');
  const [listMessage, setListMessage] = useState([] as any);
  const { connect, isConnecting, room, error, participants, audioTracks } = useRoom();

  useEffect(() => {
    console.log(room)
  }, [room])
//   const room = new livekit.Room();
//   const connected = room.connect("ws://localhost:7880",roomName);
  
//   console.log(room)
//   await room.connect('ws://localhost:7800', token, {
//   // don't subscribe to other participants automatically
//   autoSubscribe: false,
// });
// console.log('connected to room', room.name);

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

  function handleSend() {
    setListMessage((prev: string[]) => {

    const newList = [...prev, message]
    return newList
    })
    // await room.localParticipant.publishData(data, DataPacket_Kind.RELIABLE)
  }
  
  async function onConnectedX(room: any) {
    // const strData = JSON.stringify({some: "data"})
    // const encoder = new TextEncoder()
    // const decoder = new TextDecoder()
    // const data = encoder.encode(strData);
    await room.localParticipant.enableCameraAndMicrophone(true);

    // await room.localParticipant.isCameraEnabled(true);
    // await room.localParticipant.isMicrophoneEnabled(true);
    // await room.localParticipant.publishData(data, DataPacket_Kind.RELIABLE)
    console.log('matching.....')
    
    // await room.on(RoomEvent.DataReceived, async (payload: Uint8Array, participant: Participant, kind: DataPacket_Kind) => {
    //   console.log(payload)
    //   const strData = await decoder.decode(payload)
    //   console.log(strData)
    // })
  }
  return (
      
    <Container maxWidth="xl">
      <h1>ROOM: {roomName}</h1>{" "}
      <Box>
        <LiveKitRoom
          url={"ws://localhost:7880"}
          token={roomName}
          onConnected={(room) => {
            // console.log(room)
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
        <input value={message} placeholder="Enter something...." onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={handleSend} >Send</button>
        {listMessage.map((message: any, index: any) => (
        <li key={index}>{message}</li>
        ))}
    </Container>
  );
}
