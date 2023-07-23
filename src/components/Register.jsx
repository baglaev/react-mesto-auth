import React from 'react';
import Header from './Header.jsx';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    return(
        < >
        {/* <Header/> */}
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" noValidate>
                <input type="text" name="login" className="login__input" />
                <input type="text" name="password" className="login__input" />
                <button className="login__button" type="submit">Зарегистрироваться</button>
                <Link className="login__link">Уже зарегистрированы? Войти</Link>
            </form>
        </section>
        </>
    )
}

export default Register;