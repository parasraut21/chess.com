// import React from 'react';
// import {  Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import JoinRoom from './onboard/joinroom'
// import { ColorContext } from './context/colorcontext'
// import Onboard from './onboard/onboard'
// import JoinGame from './onboard/joingame'
// import ChessGame from './chess/ui/chessgame'
// import { Link } from 'react-router-dom';

// function App() {

//   const [didRedirect, setDidRedirect] = React.useState(false)

//   const playerDidRedirect = React.useCallback(() => {
//     setDidRedirect(true)
//   }, [])

//   const playerDidNotRedirect = React.useCallback(() => {
//     setDidRedirect(false)
//   }, [])

//   const [userName, setUserName] = React.useState('')

//   return (
//     <ColorContext.Provider value = {{didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect}}>
//        <Router >
      
//          <Routes>
//           <Route  exact path = "/" element={<Onboard setUserName = {setUserName}/>} />
            
//           <Route exact path = "/game/:gameid" element=  {didRedirect ? 
//               <React.Fragment>
//                     <JoinGame userName = {userName} isCreator = {true} />
//                     <ChessGame myUserName = {userName} />
//               </React.Fragment> 
//               :
//               <JoinRoom />}/>
//           </Routes>
//     </Router> 
    
//     </ColorContext.Provider>);
// }

// export default App;


// import React, { useState } from 'react';
// import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
// import { ColorContext } from './context/colorcontext';
// import Onboard from './onboard/onboard';
// import JoinGame from './onboard/joingame';
// import ChessGame from './chess/ui/chessgame';
// import { v4 as uuidv4 } from 'uuid';
// import { io } from 'socket.io-client';
// import JoinRoom from './onboard/joinroom'

// const App = () => {
//   const [didRedirect, setDidRedirect] = useState(false);
//   const [userName, setUserName] = useState('');

//   const playerDidRedirect = () => {
//     setDidRedirect(true);
//   };

//   const playerDidNotRedirect = () => {
//     setDidRedirect(false);
//   };

//   const handleCreateGame = () => {
//     setUserName(userName.trim());
//     if (userName) {
//       const socket = io('http://localhost:8000');

//       socket.emit('createNewGame', userName);

//       socket.on('gameCreated', (gameId) => {
//         console.log('Game created: ', gameId);
//         window.location.href = `/game/${gameId}`;
//       });
//     }
//   };

//   return (
//     <ColorContext.Provider
//       value={{
//         didRedirect: didRedirect,
//         playerDidRedirect: playerDidRedirect,
//         playerDidNotRedirect: playerDidNotRedirect,
//       }}
//     >
//       <Router>
//         <Routes>
//           <Route
//             exact
//             path="/"
//             element={<Onboard setUserName={setUserName} handleCreateGame={handleCreateGame} />}
//           />
//           <Route
//             exact
//             path="/game/:gameid"
//             element={
//               didRedirect ? (
//                 <>
//                   <JoinGame userName={userName} />
//                   <ChessGame myUserName={userName} />
//                 </>
//               ) : (
//                 <JoinRoom />
//               )
//             }
//           />
//         </Routes>
//       </Router>
//     </ColorContext.Provider>
//   );
// };

// export default App;


// App.jsx

// App.jsx
// components/Onboard.js
// import React, { useState } from 'react';
// import {  Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import socket from './connection/socket';
// import Onboard from './onboard/onboard';
// import CreateRoom from './onboard/CreateRoom';
// import JoinRoom from './onboard/joinroom';

import React, { useState } from 'react';
import {  Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import socket from './connection/socket';
import { ColorContext } from './context/colorcontext'
import Onboard from './onboard/onboard';
import CreateRoom from './onboard/CreateRoom';
import JoinRoom from './onboard/joinroom';
import JoinGame from './onboard/joingame';
const handleCreateGame = (socket, userName) => {
  const gameId = uuidv4();
  gameRooms[gameId] = {
    players: [{ socketId: socket.id, userName }],
    isGameStarted: false,
  };
  socket.join(gameId);
  console.log('Game created: ', gameId);
  socket.emit('gameCreated', gameId);
};

const App = () => {
  const [userName, setUserName] = useState('');

  const handleUserNameSubmit = (name) => {
    setUserName(name.trim());
  };

  const [didRedirect, setDidRedirect] = React.useState(false)

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true)
  }, [])

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false)
  }, [])
 

  return (
    <ColorContext.Provider value = {{didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect}}>

    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<Onboard userName={userName} handleUserNameSubmit={handleUserNameSubmit} />}
        />
        <Route exact path="/createroom" element={<CreateRoom userName={userName} />} />
        <Route exact path="/joinroom" element={<JoinRoom userName={userName} />} />
        <Route exact path="/game/:gameid" element= {didRedirect ? 
              <React.Fragment>
                    <JoinGame userName = {userName} isCreator = {true} />
                    <ChessGame myUserName = {userName} />
              </React.Fragment> 
              :
              <JoinRoom userName = {userName}  />} />
      </Routes>
    </Router>
    </ColorContext.Provider>
  );
};

export default App;