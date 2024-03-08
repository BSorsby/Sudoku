import $ from 'jquery';
import { useEffect, useState } from "react";
import Sudoku from "sudoku-umd";
import { KeyBoard } from "../KeyBoard/KeyBoard";
import "./GameGrid.css";

export const GameGrid = () => {

    const [puzzle, setPuzzle] = useState('');
    const [completedGame, setCompletedGame] = useState();
    const [level, setLevel] = useState('easy');
    const [hints, setHints] = useState(3);
    const [moves, setMoves] = useState([]);

    useEffect(() => {
        generateGame(level);
    }, []);

    useEffect(() => {
        FillBoard();
    }, [puzzle]);

    const handleNewGameClick = () => {
        resetBoard();
        generateGame(level);
    }

    const generateGame = (difficulty) => {
        const newGame = Sudoku.generate(difficulty);
        const completedGame = Sudoku.solve(newGame);
        setCompletedGame(completedGame);
        Sudoku.print_board(newGame);

        setPuzzle(newGame)

        return newGame;
    }

    const resetBoard = () => {
        $('.cell').removeClass('original').removeClass('clicked').removeClass('correct')
            .removeClass('incorrect').removeClass('highlight').removeClass('sameNumbers');
        $('.cell').html('');
        setHints(3);
        setMoves([]);
    }

    const FillBoard = () => {
        resetBoard();
        for (let i = 1; i <= 9; i++) {
            for (let j = 1; j <= 9; j++) {
                let index = ((i - 1) * 9) + (j - 1);
                let cellID = i.toString() + '-' + j.toString();
                let num = puzzle[index];
                if (num !== ".") {
                    $('#' + cellID).html(num);
                    $('#' + cellID).addClass('original');
                } else {
                    $('#' + cellID).html('');
                }
            }
        }
    }

    const cellClick = (e) => {
        removeHighlights();
        let id = e.target.id;
        highlightAreas(id);
    }

    const highlightAreas = (id) => {
        let selectedCell = $('#' + id);
        selectedCell.addClass('clicked');
        let row = id[0];
        let col = id[2];
        $('[id*="' + row + '-"]').addClass('highlight');
        $('[id*="-' + col + '"]').addClass('highlight');
        for (let i = 1; i <= 9; i++) {
            if (selectedCell.hasClass('box-' + i)) {
                $('.box-' + i).addClass('highlight');
            }
        }
        if (selectedCell.html() !== '') {
            highlightSameNumbers(selectedCell.html());
        }
    }

    function highlightSameNumbers(num) {
        $('.cell').removeClass('sameNumbers');
        $('.cell:contains(' + num + ')').addClass('sameNumbers');
    }

    const removeHighlights = () => {
        $('.cell').removeClass('clicked').removeClass('highlight').removeClass('sameNumbers');
    }

    function handleNumberClick(num) {
        if ($('.cell').hasClass('clicked')) {
            if (!$('.clicked').hasClass('original')) {
                let id = $('.clicked').attr('id');
                let currentVal = $('#' + id).html();
                if (currentVal === num) {
                    $('.cell').removeClass('sameNumbers');
                    $('#' + id).html('');
                    updateMoves(id, '', currentVal);
                } else {
                    validateEntry(id, num);
                    updateMoves(id, num, currentVal);
                }
            }
        } else {
            return;
        }
    }

    function updateMoves(id, newVal, prevVal) {
        setMoves([...moves, { cell: id, newValue: newVal, prevValue: prevVal }]);
    }

    function handleEraseClick() {
        if ($('.cell').hasClass('clicked')) {
            if (!$('.clicked').hasClass('original')) {
                let prevVal = $('.clicked').html();
                $('.clicked').html('');
                $('.cell').removeClass('sameNumbers');
                updateMoves($('.clicked').attr('id'), '', prevVal);
            }
        }
    }

    function handleHintClick() {
        if ($('.cell').hasClass('clicked')) {
            if (!$('.clicked').hasClass('original') && !$('.clicked').hasClass('correct')) {
                let id = $('.clicked').attr('id');
                let index = ((parseInt(id[0]) - 1) * 9) + (parseInt(id[2] - 1));
                let num = completedGame[index];
                $('.clicked').html(num);
                $('.clicked').removeClass('incorrect').addClass('original');
                highlightSameNumbers(num);
                setHints(hints - 1);
            }
        }
    }

    function handleUndoClick() {
        if (moves.length > 0) {
            let lastMove = moves.pop();
            let cell = lastMove['cell'];
            let val = lastMove['prevValue'];
            $('#' + cell).html(val);
            setMoves(moves);
            removeHighlights();
            $('#' + cell).addClass('clicked');
            highlightAreas(cell);
            highlightSameNumbers(val);
            if (val !== '') {
                highlightSameNumbers(val);
                validateEntry(cell, val);
            } else {
                $('.cell').removeClass('sameNumbers');
            }
        }
    }

    function validateEntry(id, num) {
        let index = ((parseInt(id[0]) - 1) * 9) + (parseInt(id[2] - 1));
        $('#' + id).html(num);
        if (completedGame[index] === num) {
            $('.clicked').addClass('correct').removeClass('incorrect');
        } else {
            $('.clicked').addClass('incorrect').removeClass('correct');
        }
        highlightSameNumbers(num);
    }


    return (
        <div className='gameGrid'>
            <div className="outerBox">
                <div className="cell box-1" id="1-1" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-1" id="1-2" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-1" id="1-3" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-2" id="1-4" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-2" id="1-5" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-2" id="1-6" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-3" id="1-7" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-3" id="1-8" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-3" id="1-9" onClick={(e) => cellClick(e)}></div>

                <div className="cell box-1" id="2-1" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-1" id="2-2" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-1" id="2-3" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-2" id="2-4" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-2" id="2-5" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-2" id="2-6" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-3" id="2-7" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-3" id="2-8" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-3" id="2-9" onClick={(e) => cellClick(e)}></div>

                <div className="cell box-1" id="3-1" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-1" id="3-2" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-1" id="3-3" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-2" id="3-4" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-2" id="3-5" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-2" id="3-6" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-3" id="3-7" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-3" id="3-8" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-3" id="3-9" onClick={(e) => cellClick(e)}></div>

                <div className="cell box-4" id="4-1" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-4" id="4-2" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-4" id="4-3" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-5" id="4-4" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-5" id="4-5" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-5" id="4-6" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-6" id="4-7" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-6" id="4-8" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-6" id="4-9" onClick={(e) => cellClick(e)}></div>

                <div className="cell box-4" id="5-1" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-4" id="5-2" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-4" id="5-3" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-5" id="5-4" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-5" id="5-5" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-5" id="5-6" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-6" id="5-7" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-6" id="5-8" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-6" id="5-9" onClick={(e) => cellClick(e)}></div>

                <div className="cell box-4" id="6-1" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-4" id="6-2" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-4" id="6-3" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-5" id="6-4" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-5" id="6-5" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-5" id="6-6" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-6" id="6-7" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-6" id="6-8" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-6" id="6-9" onClick={(e) => cellClick(e)}></div>

                <div className="cell box-7" id="7-1" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-7" id="7-2" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-7" id="7-3" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-8" id="7-4" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-8" id="7-5" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-8" id="7-6" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-9" id="7-7" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-9" id="7-8" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-9" id="7-9" onClick={(e) => cellClick(e)}></div>

                <div className="cell box-7" id="8-1" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-7" id="8-2" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-7" id="8-3" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-8" id="8-4" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-8" id="8-5" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-8" id="8-6" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-9" id="8-7" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-9" id="8-8" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-9" id="8-9" onClick={(e) => cellClick(e)}></div>

                <div className="cell box-7" id="9-1" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-7" id="9-2" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-7" id="9-3" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-8" id="9-4" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-8" id="9-5" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-8" id="9-6" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-9" id="9-7" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-9" id="9-8" onClick={(e) => cellClick(e)}></div>
                <div className="cell box-9" id="9-9" onClick={(e) => cellClick(e)}></div>

            </div>
            <KeyBoard handleNewGameClick={handleNewGameClick} handleNumberClick={handleNumberClick} handleEraseClick={handleEraseClick} handleHintClick={handleHintClick} hints={hints} handleUndoClick={handleUndoClick} />
        </div>
    )
}