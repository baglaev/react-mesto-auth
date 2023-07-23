import React from 'react';
import successImage from '../images/confirm-image.svg';
import unsuccessImage from '../images/error-image.svg';

function InfoTooltip({isOpen, onClose, isSuccess}) {
    return (
        <section className={`popup popup_type_info ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <div className="popup__info-container">{isSuccess ? (
                    < >
                        <img className="popup__info-image" src={successImage} alt="Вы успешно зарегистрировались!" />
                        <p className="popup__info-text">Вы успешно<br />зарегистрировались!</p>
                        </>
                    ) : (
                    < >
                        <img className="popup__info-image" src={unsuccessImage} alt="Что-то пошло не так! Попробуйте ещё раз." />
                        <p className="popup__info-text">Что-то пошло не так!<br />Попробуйте ещё раз.</p>
                    </>
                    )}
                </div>
            </div>
        </section>
    )

}

export default InfoTooltip;