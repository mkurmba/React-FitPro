import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation' 
import axios from 'axios'
function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const loginButtonRef = useRef(null)
    const passwordInputRef = useRef(null)
    const togglePasswordRef = useRef(null)
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data === "Success") {
                    navigate('/dashboard');
                } else {
                    // Set the incorrect email or password error
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        login: "Incorrect email or password"
                    }));
                }
            })
            .catch(err => console.log(err));
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState)
    }

    useEffect(() => {
        const updateToggleButtonVisibility = () => {
            if (passwordInputRef.current.value.trim() === '') {
                togglePasswordRef.current.style.visibility = 'hidden'
            } else {
                togglePasswordRef.current.style.visibility = 'visible'
            }
        }

        updateToggleButtonVisibility()

        const handlePasswordInput = () => {
            updateToggleButtonVisibility()

            if (values.email.trim() === '' || passwordInputRef.current.value.trim() === '') {
                loginButtonRef.current.disabled = true
            } else {
                loginButtonRef.current.disabled = false
            }
        }

        const passwordInput = passwordInputRef.current
        passwordInput.addEventListener('input', handlePasswordInput)

        return () => {
            passwordInput.removeEventListener('input', handlePasswordInput)
        }
    }, [values.email])

    return (
        <div className='login-container'>
            <div className='bg-primary vh-100 d-flex flex-column'>
                <header className='bg-white p-3 w-100 border-bottom'>
                    <h4 className='text-center m-0'>FitPro</h4>    
                </header>
                
                <div className='d-flex justify-content-center align-items-center flex-grow-1'>
                    <div className='bg-white p-3 rounded w-25'>
                        <form action='' onSubmit={handleSubmit} >
                        <h3 className='text-center mb-4'>MY ACCOUNT</h3>
                        <span className="form-errors">
                                {errors.email && (<div className="text-danger text-center mb-3">{errors.email}</div> )}
                                {errors.password && (<div className="text-danger text-center mb-3">{errors.password}</div>)}
                                {errors.login && (<div className="text-danger">{errors.login}</div>)}
                            </span>
                            <div className="input-group">
                                <label>
                                    <div className='mb-3'>
                                        <input 
                                            required 
                                            type='text' 
                                            id="email" 
                                            name="email" 
                                            className='form-control rounded-0'   
                                            value={values.email}
                                            onChange={handleInput} 
                                            autoComplete='off'
                                        />
                                        <span>Email</span>
                                    </div>
                                </label>
                                <label className="label">
                                    <div className='mb-3'>
                                        <input 
                                            required
                                            type={isPasswordVisible ? 'text' : 'password'} 
                                            id="password" 
                                            name="password" 
                                            ref={passwordInputRef}
                                            className='form-control rounded-0'
                                            value={values.password}
                                            onChange={handleInput}
                                            autoComplete='off'
                                        />
                                        <span>Password</span>
                                        <button 
                                            type="button" 
                                            id="togglePassword" 
                                            className="showhide" 
                                            onClick={togglePasswordVisibility}
                                            ref={togglePasswordRef}
                                        >
                                            {isPasswordVisible ? 'Hide' : 'Show'}
                                        </button>
                                    </div>    
                                </label>
                            </div>
                            <button 
                                type='submit' 
                                id="loginButton" 
                                ref={loginButtonRef}
                                className='btn btn-success w-100'
                                
                            >
                                Log in
                            </button>
                                
                            <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none text-center">
                                Create Account
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login