import React from "react";

function Progress({
  currentquizz,
  moneyPyramid,
  name,
  setLose,
  handle_answer,
  setName,
  setCurrentquizz,
  interval,
  setClassname,
  setSelect,
}) {
  console.log(name);
  let moneycolumn = [...moneyPyramid].reverse();
  return (
    <div className="progress">
      <div className="option">
        <button onClick={() => {setName(null);setCurrentquizz(1);clearInterval(interval);setClassname('');setSelect(-1);setLose(false)}}>EXIT</button>
        <button
          onClick={() => {
            setLose(true);
            handle_answer(false);
          }}
        >
          QUIT
        </button>
      </div>
      <div className="details">
        <p>Name: {name}</p>
        <p>Total Earn: {currentquizz<2 ? '0 $' : moneyPyramid[currentquizz - 2]?.amount}</p>
      </div>
      <div className="money">
        {moneycolumn.map((item) => (
          <p
            key={item.id}
            className={item.id === currentquizz ? "active" : null}
          >
            {item.amount}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Progress;
