import { useState } from 'react';
import './App.css';
import io from "socket.io-client";
import Editor from '@monaco-editor/react';

const socket = io("http://localhost:3000");

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");


  const copyid = () => {
    navigator.clipboard.writeText(roomId);
  }

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  } 
    
  const joinRoom = () => {
    if(roomId && userName){
      socket.emit("join",{roomId, userName});
      setJoined(true);
    }
  }
  if (!joined) {
    return(

     <div className="join-container">
      <div className="join-form">
        <h1>
          Join Code Room
          <input type="text" placeholder='Room Id' value={roomId} onChange={(e) => setRoomId(e.target.value)}></input>
          <input type="text" placeholder='Your Name' value={userName} onChange={(e) => setUserName(e.target.value)}></input>
          <button onClick={joinRoom}>
            Join Room
          </button>


        </h1>

      </div>
      
      
      </div>
    )
  }
  return(

   <div className="editor-container">
    <div className="sidebar">
      <div className="room-info">
        <h2>
          Room Id: {roomId}
        </h2>
        <button className='copy-button' onClick={copyid}>Copy Id</button>
      </div>
      <h3>
        Users in Room: </h3> 
        <ul>
          <li>
            {userName}
          </li>
        </ul>
        <p className='typing-indicator'>
          User typing.....
        </p>
        <select className='language-selector'>
          <option value="python"> Python</option>
          <option value="javascript"> JavaScript</option>
          <option value="java"> Java</option>
          <option value="cpp">C++</option>
        </select>
        <button className='leave-button'>Leave Room</button>

     
    </div>
    <div className="editor-wrapper">
      <Editor height="100vh" width="100%" defaultLanguage={language} language={code} onChange={handleCodeChange} theme='vs-dark'
      options={
        {
          minimap: {enabled: false},
          fontSize: 16,
        }
      }
      defaultValue='Write your code here'
      />
    </div>
  </div>
  );
};

export default App
