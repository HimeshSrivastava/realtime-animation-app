import React from 'react'

const Box = ({ x, y, color})=>{
    const style ={
        width:'50px',
        height:'50px',
        position:'absolute',
        left:`${x}px`,
        top:`${y}px`,
        backgroundColor : color,
        transition : 'all 0.5s ease'
    };
 return <div style={style}></div>
}

export default Box;