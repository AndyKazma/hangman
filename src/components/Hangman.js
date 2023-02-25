import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { randomWord } from "./words";
import Rules from "./Rules";

import step0 from "./images/state1.GIF";
import step1 from "./images/state2.GIF";
import step2 from "./images/state3.GIF";
import step3 from "./images/state4.GIF";
import step4 from "./images/state5.GIF";
import step5 from "./images/state6.GIF";
import step6 from "./images/state7.GIF";
import step7 from "./images/state8.GIF";
import step8 from "./images/state9.GIF";
import step9 from "./images/state10.gif";
import step10 from "./images/state11.GIF";

const Hangman = ({
   maxWrong = 10,
   images = [
      step0,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
      step9,
      step10,
   ],
}) => {
   // useState hook keeps track of the number of incorrect guesses
   const [mistake, setMistake] = useState(0);
   // useState hook keeps track of the letters that have already been guessed
   const [guessed, setGuessed] = useState(new Set());
   // useState hook stores randomly selected word for the game
   const [answer, setAnswer] = useState(randomWord());

   // returns an array of underscores and correctly guessed letters
   const guessedWord = () => {
      return answer
         .split("")
         .map((found) => (guessed.has(found) ? found : "_"));
   };

   //updates the guessed and mistake states when a letter is guessed
   const handleGuess = (value) => {
      let letter = value;
      setGuessed((prevGuessed) => new Set([...prevGuessed, letter]));
      setMistake(
         (prevMistake) => prevMistake + (answer.includes(letter) ? 0 : 1)
      );
   };

   // when a key is pressed and handles resetting the game or making a guess
   const keyPress = (event) => {
      if (gameStat === "YOU WON" || gameStat === "YOU LOST") {
         if (
            event.keyCode === 8 ||
            event.keyCode === 13 ||
            event.keyCode === 32
         ) {
            resetButton();
         }
      } else if (
         (event.keyCode >= 65 && event.keyCode <= 90) ||
         (event.keyCode >= 97 && event.keyCode <= 122)
      ) {
         handleGuess(event.key);
      } else if (
         event.keyCode === 8 ||
         event.keyCode === 13 ||
         event.keyCode === 32
      ) {
         resetButton();
      } else {
      }
   };

   useEffect(() => {
      window.addEventListener("keydown", keyPress);
      return () => window.removeEventListener("keydown", keyPress);
   }, [guessed, mistake, keyPress]);

   // returns an array of buttons for each letter that haven't been guessed yet
   const generateButtons = () => {
      return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
         <button
            key={letter}
            value={letter}
            onClick={(e) => handleGuess(e.target.value)}
            disabled={guessed.has(letter)}
         >
            {letter}
         </button>
      ));
   };

   // resets the state variables to start a new game
   const resetButton = () => {
      setMistake(0);
      setGuessed(new Set());
      setAnswer(randomWord());
   };

   const gameOver = mistake >= maxWrong;
   const altText = `${mistake}/${maxWrong} wrong guesses`;
   const isWinner = guessedWord().join("") === answer;
   let gameStat = generateButtons();
   if (isWinner) {
      gameStat = "YOU WON";
   }
   if (gameOver) {
      gameStat = "YOU LOST";
   }

   // show and hide the modal with rules of the game
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);

   return (
      <div className="Hangman ">
         <nav className="nav nav-pills nav-fill">
            <h3 className="nav-item navbar-text text-light">
               Guessed wrong: {mistake}
            </h3>
            <h4 className="nav-item text-light" onClick={handleShow}>
               Hangman. Click to learn the rules
            </h4>
         </nav>

         <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>Hangman Game Rules</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Rules></Rules>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>

         <p className="text-center">
            <img src={images[mistake]} alt={altText} />
         </p>
         <p className="Hangman-word text-center">
            {!gameOver ? guessedWord() : answer}{" "}
         </p>
         <h1 className="text-center text-warning mt-4">{gameStat}</h1>
         <div>
            <p className="text-center">
               <button className="Hangman-reset" onClick={resetButton}>
                  Reset
               </button>
            </p>
         </div>
      </div>
   );
};

export default Hangman;
