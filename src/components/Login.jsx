import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from "../utils/auth";

function Login({handleLogin}) {
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        password: '',
        email: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
          });
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin();


        auth.register(formValue.password, formValue.email)
            .then((res) => {
                localStorage.setItem("jwt", res.token);
                handleLogin();
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
      }

    return(
        < >
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" noValidate onSubmit={handleSubmit}>
                <input type="text" name="login" className="login__input" />
                <input type="text" name="password" className="login__input" />
                <button className="login__button" type="submit">Войти</button>
            </form>
        </section>
        </>
    )
}

export default Login;