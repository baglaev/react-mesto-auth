import React, { useState } from 'react';
// import Header from './Header.jsx';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from "../utils/auth";

function Register({setSuccess, setIsInfoTooltip}) {
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
        // props.handleSubmit(formValue.password, formValue.email);
        auth.register(formValue.password, formValue.email)
            .then(() => {
                navigate("/signin");
                setSuccess(true);
            })
            .catch((err) => {
                setSuccess(false);
                console.log(err.status);
            })
            .finally(() => {
                setIsInfoTooltip(true);
            });
      }

    return(
        <>
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" noValidate onSubmit={handleSubmit}>
                <input type="text" name="email" className="login__input" value={formValue.email || ""} onChange={handleChange} required />
                <input type="text" name="password" className="login__input" value={formValue.password || ""} onChange={handleChange} />
                <button className="login__button" type="submit">Зарегистрироваться</button>
                <Link className="login__link">Уже зарегистрированы? Войти</Link>
            </form>
        </section>
        </>
    )
}

export default Register;