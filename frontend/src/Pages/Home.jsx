import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import LogoutButton from './LogoutButton';

const Home = () => {
  const [animationState, setAnimationState] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: '#3b82f6'
  });

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:8080');

    socketRef.current.on('animation', (data) => {
      setAnimationState(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleStart = () => socketRef.current.emit('start');
  const handleStop = () => socketRef.current.emit('stop');

  return (
    <>
   <div style={{
  minHeight: '100vh',              
  backgroundColor: 'white',      
  display: 'flex',                
  flexDirection: 'column',        
  alignItems: 'center',            
  justifyContent: 'center',        
  position: 'relative'            
}}>

  
  <div style={{
    position: 'absolute',
    left: `calc(50% - ${animationState.width / 2}px)`, 
    top: 0,
    width: animationState.width,
    height: animationState.height,
    background: 'linear-gradient(to right, #60a5fa, #a78bfa, #f472b6, #fb923c)',
    transition: 'all 0.2s linear',
    borderRadius: '0 0 16px 16px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.4)' 
  }} />

  <h1 
  style={{
  fontSize: '2.25rem',  
  color: 'black',        
  marginBottom: '2rem', 
  zIndex: 10              
  }}>
  Expanding Box Animation
  </h1>

  <div 
  style={{
  display: 'flex',         
  gap: '2rem',             
  justifyContent: 'center',
  alignItems: 'center',    
  zIndex: 10               
}}>
    <button 
  onClick={handleStart} 
  style={{
    padding: '0.7rem 1.2rem',         
    backgroundColor: '#22c55e',     
    color: 'white',                 
    borderRadius: '0.25rem',        
    transition: 'all 0.2s ease'     
  }}
>
  Start
</button>

    <button 
  onClick={handleStop} 
  style={{
    padding: '0.7rem 1.2rem',        
    backgroundColor: '#b91c1c',     
    color: 'white',                 
    borderRadius: '0.25rem',       
    transition: 'all 0.2s ease'    
  }}
>
  Stop
</button>
 <div 
 style={{
    padding: '0.7rem 1.2rem',        
    backgroundColor: '#b91c1c',     
    color: 'white',                 
    borderRadius: '0.25rem',       
    transition: 'all 0.2s ease'    
  }}>
    <LogoutButton/>
 </div>

  </div>
</div>

    </>
  );
};

export default Home;