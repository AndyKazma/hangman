import React from "react";

function Rules() {
   return (
      <div>
         <p>
            Hangman is a word-guessing game typically played with two or more
            people, where one person chooses a word and the other person(s) try
            to guess the word by suggesting letters one at a time. The game is
            usually played on paper, with a gallows or other marker to indicate
            the number of incorrect guesses.
         </p>

         <p>
            In this application, the role of one of the players is taken over by
            the computer.
         </p>
         <h2> Rules of the Hangman Game when playing against the computer</h2>
         <ul>
            <li>
               The computer chooses a random word and writes a series of dashes
               on the screen to represent the letters in the word. For example,
               if the word is "apple," there might be written "_ _ _ _ _" on the
               screen.
            </li>
            <li>
               The player(s) then try to guess the word by suggesting letters
               one at a time. If the word contains the letter, computer writes
               the letter in the appropriate place in the word. For example, if
               the letter "p" is guessed, the word would become "_ _ p p _".
            </li>
            <li>
               If the suggested letter is not in the word, computer draws a part
               of a "hangman" on the screen. The hangman is drawn in ten
               parts:the stand of the gallow, the post, the crossbeam, the rope,
               head, body, right arm, left arm, right leg, and left leg. Each
               incorrect guess results in another part of the hangman being
               drawn. Once the hangman is complete, the game is over and the
               person who guessed loses.
            </li>
            <li>
               The game continues until either the word is guessed or the
               hangman is completed.
            </li>
         </ul>
      </div>
   );
}

export default Rules;
