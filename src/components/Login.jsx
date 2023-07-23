import React from 'react';
import Header from './Header.jsx';

function Login() {
    return(
        < >
        {/* <Header/> */}
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" noValidate>
                <input type="text" name="login" className="login__input" />
                <input type="text" name="password" className="login__input" />
                <button className="login__button" type="submit">Войти</button>
            </form>
        </section>
        </>
    )
}

export default Login;