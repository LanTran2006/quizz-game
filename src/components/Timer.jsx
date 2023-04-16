import React, { useEffect, useState } from 'react';

function Timer({time,setTime,setLose,setSelect,setClassname,currentquizz,handle_answer,interval}) {
    useEffect(()=>{
        interval.current=setInterval(()=>{
           if (time===0) {
            setLose(true);
            handle_answer(false)
            setSelect(-1);
            setClassname('')
            clearInterval(interval)
           } else {
            setTime(--time)
           }
       },1000)
       return ()=>clearInterval(interval.current)
    },[currentquizz])
    return (
        <div className='timer'>
            {time}
        </div>
    );
}

export default Timer;