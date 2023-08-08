// // const express = require('express');
// // const http = require('http');
// // const socketIO = require('socket.io'); // <-- This line is incorrect
// // const gameLogic = require('./game-logic');
// // const cors = require('cors');

// // const app = express();
// // const server = http.createServer(app);
// // const io = socketIO(server, { // <-- Change socketIO to socket.io
// //   cors: {
// //     origin: '*',
// //   }
// // });

// // app.use(cors({
// //   origin: "*",
// //   credentials: true
// // }));
// // io.on('connection', client => {
// //   gameLogic.initializeGame(io, client);
// // });

// // const PORT =  8000;
// // server.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });


// const http = require('http')
// const express = require('express')
// const cors = require('cors')
// const socketIO = require('socket.io')


// const app = express();

// const users = [{}] 

// app.use(cors({
// 	origin: "*",
// 	credentials: true
// }))


// const port = 8000 || process.env.PORT ;
// const gameLogic = require('./game-logic');
// const server = http.createServer(app);
// const gameRooms = {};
// const io = socketIO(server, {
//     cors: {
//       origin: '*',
//     }
//   });

// app.get('/',(req,res)=>{
//     res.json("hey mom")
// })



// // io.on('connection',(client)=>{
// //     console.log("new Connection") ;
// //     gameLogic.initializeGame(io, client);
  
// // })


// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('createNewGame', (gameId) => {
//     console.log("server : ",gameId);
//     socket.emit('createNewGame', { gameId: gameId,mySocketId: socket.id });
//     socket.join(gameId);
//     console.log("socktrid : ",socket.id );
//   });

//   socket.on('playerJoinGame', (data) => {
//     const { gameId, userName } = data;
//     const room = gameRooms[gameId];

//     if (!room || room.players.length >= 2 || room.isGameStarted) {
//       socket.emit('gameError', 'Cannot join the game. Game room is full or game has started.');
//       return;
//     }

//     socket.join(gameId);
//     room.players.push({ socketId: socket.id, userName: userName });

//     io.to(gameId).emit('playerJoinedRoom', {
//       gameId: gameId,
//       userName: userName,
//       mySocketId: socket.id,
//     });

//     if (room.players.length === 2) {
//       room.isGameStarted = true;
//       io.to(gameId).emit('startGame', room.players[0].userName); // Send the opponent's userName to start the game
//     }
//   });


//   socket.on('makeMove', (data) => {
//     // Handle move logic here and emit updates to players
//     const { gameId, move } = data;
//     io.to(gameId).emit('updateBoard', move);
//   });

//   socket.on('disconnect', () => {
//     // Handle disconnect logic here
//     console.log('A user disconnected:', socket.id);
//   });
// });

// server.listen(port,()=>{
//     console.log(`server is running on ${port}`)
// })

// // // main.js
// // const http = require('http');
// // const express = require('express');
// // const cors = require('cors');
// // const socketIO = require('socket.io');

// // const app = express();


// // const port = 8000 || process.env.PORT;

// // const server = http.createServer(app);



// // var sio;
// // var gameSocket;
// // var users = {}; // Define the users object to store socket IDs and usernames

// // function onDisconnect() {
// //   gameSocket.broadcast.emit('leave', { user: "Admin", message: `${users[gameSocket.id]} user has left` });
// //   console.log("user left");
// // }

// // function newMove(move) {
// //   const gameId = move.gameId;
// //   sio.to(gameId).emit('opponent move', move); // Use the sio object here instead of io
// // }

// // function createNewGame(gameId) {
// //   this.emit('createNewGame', { gameId: gameId, mySocketId: this.id });
// //   this.join(gameId);
// // }

// // function playerJoinGame(idData) {
// //   const room = sio.sockets.adapter.rooms[idData.gameId]; // Use the sio object here instead of io
// // console.log(room)
// //   if (room && room.length === 1) {
// //     // The room exists and has one player, so this player can join the game
// //     const gameID = idData.gameId;
// //     sock.join(gameID);
// //     sock.emit('playerJoinedRoom', { gameId: gameID, players: Object.keys(room.sockets) });
// //   } else {
// //     // The room does not exist or already has two players, so the player cannot join
// //     sock.emit('err', { message: 'Sorry, the game is full!' });
// //   }
// // }

// // function requestUserName() {
// //   const sock = this;
// //   sock.emit('requestUserName');
// // }

// // function receivedUserName(userNameData) {
// //   const sock = this;
// //   const room = sio.sockets.adapter.rooms[userNameData.gameId];

// //   if (room && room.size === 2) {// Use room.size instead of room.length
// //     // The room exists and has two players, so we can proceed with the game setup
// //     const gameID = userNameData.gameId;
// //     const players = Array.from(room);

// //     // Send the received username to both players in the room
// //     sio.to(gameID).emit('userNameReceived', {
// //       players: players.map(player => users[player]),
// //     });

// //     // Set the usernames for both players
// //     players.forEach(player => {
// //       users[player] = userNameData.userName;
// //     });

// //     // Start the game logic here or perform other actions after receiving the usernames
// //     // For example, emit the 'start game' event
// //     sio.to(gameID).emit('start game', userNameData.userName); // Emit the 'start game' event
// //   } else {
// //     // The room does not exist or does not have two players, so we cannot proceed
// //     sock.emit('err', { message: 'Sorry, the game is not ready to start yet!' });
// //   }
// // }

// // io.on('connection', (socket) => {
// //   console.log("new Connection");

// //   sio = io;
// //   gameSocket = socket;

// //   gameSocket.on('disconnect', onDisconnect);
// //   gameSocket.on('new move', newMove);
// //   gameSocket.on('createNewGame', createNewGame);
// //   gameSocket.on('playerJoinGame', playerJoinGame);
// //   gameSocket.on('request username', requestUserName);
// //   gameSocket.on('received userName', receivedUserName); // Listen for the 'received userName' event
// // });

// // server.listen(port, () => {
// //   console.log(`server is running on ${port}`);
// // });


// new // server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

const gameRooms = {};

io.on('connection', (socket) => {
  console.log('A user connected with socket ID:', socket.id);

  socket.on('playerJoinGame', ({ gameId, userName }) => {
    const room = gameRooms[gameId];
    if (room && room.players.length < 2) {
      socket.join(gameId);
      room.players.push({ socketId: socket.id, userName });
      console.log('Player joined room:', userName, gameId);
      io.to(gameId).emit('playerJoinedRoom', {
        userName,
        gameId,
        mySocketId: socket.id,
      });
      if (room.players.length === 2) {
        room.isGameStarted = true;
        io.to(gameId).emit('startGame', room.players);
      }
    } else if (!room) {
      socket.emit('gameError', 'This game session does not exist.');
    } else if (room.players.length >= 2) {
      socket.emit('gameError', 'This game session is already full.');
    }
  });
  

  socket.on('createNewGame', (gameId) => {
    if (!gameId || gameRooms[gameId]) {
      // Game ID already exists or is invalid, handle accordingly
      // For example, emit an error message to the client
      socket.emit('gameError', 'Invalid Game ID or Game already exists.');
      return;
    }
  
    // Create a new game room with the given gameId
    gameRooms[gameId] = {
      players: [{ socketId: socket.id }],
      isGameStarted: false,
    };
  
    // Join the socket to the newly created game room
    socket.join(gameId);
  
    // Emit the 'createNewGame' event back to the creator client
    socket.emit('createNewGame', { gameId: gameId, mySocketId: socket.id });
  });

})

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
