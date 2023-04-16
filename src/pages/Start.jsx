import React, { useRef } from "react";

function Start({setName}) {
  const inp=useRef()
  const handle_submit=(e)=>{
    e.preventDefault();
      let name=inp.current.value;
      if (!name) {
        alert('please enter your name')
        return;
      } else {
        setName(name)
      }
  }
  return (
    <section className="info">
      <form onSubmit={handle_submit}>
        <input ref={inp} placeholder="Enter Name" type="text"/>
        <button type="submit">Start Game</button>
      </form>
    </section>
  );
}

export default Start;
