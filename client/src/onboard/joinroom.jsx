// import React from 'react'
// import JoinGame from './joingame'
// import ChessGame from '../chess/ui/chessgame'


// /**
//  * Onboard is where we create the game room.
//  */

// class JoinRoom extends React.Component {
//     state = {
//         didGetUserName: false,
//         inputText: ""
//     }

//     constructor(props) {
//         super(props);
//         this.textArea = React.createRef();
//     }

//     typingUserName = () => {
//         // grab the input text from the field from the DOM 
//         const typedText = this.textArea.current.value
        
//         // set the state with that text
//         this.setState({
//             inputText: typedText
//         })
//     }

//     render() {
    
//         return (<React.Fragment>
//             {
//                 this.state.didGetUserName ? 
//                 <React.Fragment>
//                     <JoinGame userName = {this.state.inputText} isCreator = {false}/>
//                     <ChessGame myUserName = {this.state.inputText}/>
//                 </React.Fragment>
//             :
//                <div>
//                     <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}}>Your Username:</h1>

//                     <input style={{marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px"}} 
//                            ref = {this.textArea}
//                            onInput = {this.typingUserName}></input>
                           
//                     <button className="btn btn-primary" 
//                         style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px"}} 
//                         disabled = {!(this.state.inputText.length > 0)} 
//                         onClick = {() => {
//                             // When the 'Submit' button gets pressed from the username screen,
//                             // We should send a request to the server to create a new room with
//                             // the uuid we generate here.
//                             this.setState({
//                                 didGetUserName: true
//                             })
//                         }}>Submit</button>
//                 </div>
//             }
//             </React.Fragment>)
//     }
// }

// export default JoinRoom
// onboard/joinroom.jsx
// components/JoinRoom.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../connection/socket';

const JoinRoom = ({ userName }) => {
  const { gameid } = useParams();

  const [joined, setJoined] = useState(false);
  const [opponentName, setOpponentName] = useState('');
  const [error, setError] = useState('');

  // Emit playerJoinGame event when the component mounts
  useEffect(() => {
    if (userName) {
      socket.emit('playerJoinGame', { gameId: gameid, userName: userName });
      setJoined(true);
    }
  }, [gameid, userName]);

  // Listen for playerJoinedRoom event from the server
  socket.on('playerJoinedRoom', (statusUpdate) => {
    console.log(
      'A new player has joined the room! Username: ' +
        statusUpdate.userName +
        ', Game id: ' +
        statusUpdate.gameId +
        ' Socket id: ' +
        statusUpdate.mySocketId
    );
    if (socket.id !== statusUpdate.mySocketId) {
      setOpponentName(statusUpdate.userName);
    }
  });

  // Listen for gameError event from the server
  socket.on('gameError', (errorMessage) => {
    console.log(errorMessage);
    setError(errorMessage); // Set the error message state
  });

  return (
    <div>
      {error ? (
        <div>
          <h1>Error: {error}</h1>
          <p>Please try again or create a new game.</p>
        </div>
      ) : joined ? (
        <div>
          <h1>Game ID: {gameid}</h1>
          <h2>Opponent: {opponentName}</h2>
        </div>
      ) : (
        <div>
          <h1>Join an Existing Game</h1>
        </div>
      )}
    </div>
  );
};

export default JoinRoom;
