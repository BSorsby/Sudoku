import React from "react";
import "./GameModal.css";

export function GameModal({
    closeModal,
    title,
    description
}) {

    return (
        <div className="ModalContainer">
            <div className="Modal">
                <button type="button" aria-label="Close" className="modalButton btn btn-close" onClick={closeModal}>x</button>
                <div className="textSection">
                    <div className="title">{title}</div>
                    <div className="description">{description}</div>
                    <div>Close this modal and click New Game to try again</div>
                </div>
            </div>
        </div>
    )
}