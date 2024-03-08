import { BsEraserFill, BsLightbulb } from "react-icons/bs";
import { AiOutlineUndo } from "react-icons/ai";
import "./KeyBoard.css";
import { useState } from "react";
import $ from 'jquery';

export function KeyBoard({
    handleNumberClick,
    handleEraseClick,
    handleUndoClick,
    handleHintClick,
    hints
}) {


    function numberClick(e) {
        let num = e.target.innerHTML;
        handleNumberClick(num);
    }

    function eraseClick() {
        handleEraseClick();
    }

    function undoClick() {
        handleUndoClick();
    }

    function hintClick() {
        if (hints > 0) {
            if (hints === 1) {
                $('#hint').addClass('noHints');
            }
            handleHintClick();
        }
    }

    function newGameClick() {

    }

    return (
        <div className="KeyBoard">
            <div className="gameControls">
                <div className="control" id="undo" onClick={undoClick}>
                    <AiOutlineUndo className="icon" />
                    Undo
                </div>
                <div className="control" id="erase" onClick={eraseClick}>
                    <BsEraserFill className="icon" />
                    Erase
                </div>
                <div className="control" id="hint" onClick={hintClick}>
                    <BsLightbulb className="icon" />
                    Hint - {hints}
                </div>
            </div>
            <div className="numbers">
                <div className="numberBtn" id="1" onClick={(e) => numberClick(e)}>1</div>
                <div className="numberBtn" id="2" onClick={(e) => numberClick(e)}>2</div>
                <div className="numberBtn" id="3" onClick={(e) => numberClick(e)}>3</div>
                <div className="numberBtn" id="4" onClick={(e) => numberClick(e)}>4</div>
                <div className="numberBtn" id="5" onClick={(e) => numberClick(e)}>5</div>
                <div className="numberBtn" id="6" onClick={(e) => numberClick(e)}>6</div>
                <div className="numberBtn" id="7" onClick={(e) => numberClick(e)}>7</div>
                <div className="numberBtn" id="8" onClick={(e) => numberClick(e)}>8</div>
                <div className="numberBtn" id="9" onClick={(e) => numberClick(e)}>9</div>
            </div>

            <div className="newGame" onClick={newGameClick}>
                New Game
            </div>

        </div>
    )
}