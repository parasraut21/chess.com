import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import socket from '../connection/socket';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const CreateRoom = ({ userName }) => {
  const [gameId, setGameId] = useState('');
  const navigate = useNavigate();

  const handleCreateGame = () => {
    if (userName.trim()) {
      const gameId = uuidv4();
      socket.emit('createNewGame', gameId);
      navigate(`/game/${gameId}`); // Redirect to the ChessGameWrapper with the newly created gameId
    }
  };

  return (
    <div>
      <h1>Create a New Game</h1>
      <button onClick={handleCreateGame}>Create Game</button>
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default CreateRoom;
