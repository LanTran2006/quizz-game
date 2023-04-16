import React, { useEffect, useRef, useState } from "react";
import Progress from "../components/Progress";
import Timer from "../components/Timer";
let money = [
  { id: 1, amount: "$ 100" },
  { id: 2, amount: "$ 200" },
  { id: 3, amount: "$ 300" },
  { id: 4, amount: "$ 500" },
  { id: 5, amount: "$ 1.000" },
  { id: 6, amount: "$ 2.000" },
  { id: 7, amount: "$ 4.000" },
  { id: 8, amount: "$ 8.000" },
  { id: 9, amount: "$ 16.000" },
  { id: 10, amount: "$ 32.000" },
  { id: 11, amount: "$ 64.000" },
  { id: 12, amount: "$ 125.000" },
  { id: 13, amount: "$ 250.000" },
  { id: 14, amount: "$ 500.000" },
  { id: 15, amount: "$ 1.000.000" },
];
const data = [
  {
    id: 1,
    question: "Where was the BRICS summit held in 2014?",
    answers: [
      {
        text: "Brazil",
        correct: true,
      },
      {
        text: "India",
        correct: false,
      },
      {
        text: "Russia",
        correct: false,
      },
      {
        text: "China",
        correct: false,
      },
    ],
  },
  {
    id: 2,
    question: "Which of these spices is the smallest in size?",
    answers: [
      {
        text: "Ajwain",
        correct: true,
      },
      {
        text: "Jeera",
        correct: false,
      },
      {
        text: "Saunf",
        correct: false,
      },
      {
        text: "Methi Seeds",
        correct: false,
      },
    ],
  },
  {
    id: 3,
    question:
      "Which battle in 1757 marked the beginning of British occupation in India?",
    answers: [
      {
        text: "Plassey",
        correct: true,
      },
      {
        text: "Assaye",
        correct: false,
      },
      {
        text: "Buxar",
        correct: false,
      },
      {
        text: "Cuddalore",
        correct: false,
      },
    ],
  },
  {
    id: 4,
    question: "Which is the second most spoken language of Nepal?",
    answers: [
      {
        text: "Bajjika",
        correct: false,
      },
      {
        text: "Nepali",
        correct: false,
      },
      {
        text: "Maithili",
        correct: true,
      },
      {
        text: "Bhojpuri",
        correct: false,
      },
    ],
  },
  {
    id: 5,
    question: "In which of these two sports is the term ‘free hit’ used?",
    answers: [
      {
        text: "Football, Squash",
        correct: false,
      },
      {
        text: "Badminton, Tennis",
        correct: false,
      },
      {
        text: "Badminton, Cricket",
        correct: true,
      },
      {
        text: "Hockey, Cricket",
        correct: true,
      },
    ],
  },
];

function Game({ name, setName }) {
  let audio = useRef();
  let interval = useRef();
  let [time, setTime] = useState(10);
  const moneyPyramid = [...money];
  let [currentquizz, setCurrentquizz] = useState(1);
  const [lose, setLose] = useState(false);
  const [classname, setClassname] = useState("");
  const [select, setSelect] = useState(-1);
  let { question, answers } = data[currentquizz - 1];
  const handle_answer = (check) => {
    if (check) {
      audio.current.src = "/correct.mp3";
      audio.current.play();
    } else {
      audio.current.src = "/wrong.mp3";
      audio.current.play();
    }
  };
  const handle_start = () => {
    audio.current.play();
  };
  useEffect(() => {
    if (select >= 0) {
      setClassname("active");
      clearInterval(interval.current);
      audio.current.src = "/wait.mp3";
      audio.current.play();
      setTimeout(() => {
        setClassname("animate");
      }, 1000);
      setTimeout(() => {
        if (answers[select]?.correct) {
          handle_answer(true);
          setClassname("true");
        } else {
          handle_answer(false);
          setClassname("false");
        }
      }, 4000);
      setTimeout(() => {
        if (answers[select].correct) {
          if (currentquizz === data.length) {
            setClassname("");
            setLose(true);
            setSelect(-1);
            return;
          }
          setTime(10);
          setClassname("");
          setCurrentquizz(++currentquizz);
          setSelect(-1);
        } else {
          setClassname("");
          setLose(true);
          setSelect(-1);
        }
      }, 6000);
    }
  }, [select]);

  return (
    <section className="container">
      <div className="game">
        {lose ? (
          <h2>
            You Earn:{" "}
            {currentquizz === 1 ? "0 $" : moneyPyramid[currentquizz - 2].amount}
          </h2>
        ) : (
          <>
            <Timer
              handle_answer={handle_answer}
              currentquizz={currentquizz}
              setClassname={setClassname}
              setSelect={setSelect}
              setLose={setLose}
              setTime={setTime}
              time={time}
              interval={interval}
            />
            <div className="quizz">
              <p className="question">{question}</p>
              <div className="answers">
                {answers.map((answer, index) => (
                  <p
                    key={answer.text}
                    className={index === select ? classname : null}
                    onClick={() => setSelect(index)}
                  >
                    {answer.text}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Progress
        setCurrentquizz={setCurrentquizz}
        interval={interval}
        setClassname={setClassname}
        setSelect={setSelect}
        setName={setName}
        handle_answer={handle_answer}
        setLose={setLose}
        currentquizz={currentquizz}
        name={name}
        moneyPyramid={moneyPyramid}
      />
      <audio
        onLoadStart={handle_start}
        autoPlay
        ref={audio}
        src="play.mp3"
      ></audio>
    </section>
  );
}

export default Game;
