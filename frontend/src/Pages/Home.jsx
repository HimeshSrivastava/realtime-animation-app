import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import LogoutButton from './LogoutButton';

const Home = () => {
  const [animationState, setAnimationState] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    gradient: {
        type: '',
        direction: '',
        colors: [] // 👈 completely empty colors array
    },
    maskImage: '',
    WebkitMaskImage: '',
    borderRadius: ''
  });

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:8080');

    socketRef.current.on('animation', (data) => {
      setAnimationState((prev) => ({
    ...prev,
    ...data
  }));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleStart = () => socketRef.current.emit('start');
  const handleStop = () => socketRef.current.emit('stop');
  console.log(animationState);

  return (
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
    width: `${animationState.width}px`,
    height: `${animationState.height}px`,
     background: animationState.gradient?.colors?.length
      ? `linear-gradient(${animationState.gradient.direction}, ${animationState.gradient.colors.map(c => `${c.color} ${c.offset * 100}%`).join(', ')})`
      : 'transparent',  
    borderRadius: animationState.borderRadius,
    transition: 'all 0.2s linear',
    WebkitMaskImage: animationState.WebkitMaskImage,
    maskImage: animationState.maskImage,
    boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
    zIndex: 5
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
  );
};

export default Home;