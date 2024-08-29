import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'

function Signup(){
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const loginButtonRef = useRef(null)
    const passwordInputRef = useRef(null)
    const togglePasswordRef = useRef(null)

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        console.log('Validation Errors:', validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                console.log('Server Response:', res.data);
                if (res.data.error) {
                    setErrors({ ...errors, server: res.data.error }); // Display server error
                } else {
                    navigate('/')
                }
            })
            .catch(err => {
                console.log('Error:', err);
                setErrors({ server: 'An error occurred. Please try again later.' });
            })
        }
    }

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
                        <form onSubmit={handleSubmit}>
                            <h3 className='text-center mb-4'>CREATE ACCOUNT</h3>
                            <span className="form-errors">
                                    {errors.server && <div className='text-danger'>{errors.server}</div>}
                                    {errors.email && <div className='text-danger'>{errors.email}</div>}
                                    {errors.name && <div className='text-danger'>{errors.name}</div>}
                                    {errors.password && <div className='text-danger'>{errors.password}</div>}
                                </span>   
                            <div className="input-group">
                                <label>
                                    <div className='mb-3'>
                                        <input 
                                            required 
                                            type='text' 
                                            id="name" 
                                            name="name" 
                                            className={`form-control rounded-0 ${errors.name ? 'is-invalid' : ''}`}   
                                            value={values.name}
                                            onChange={handleInput} 
                                            autoComplete='off'
                                        />
                                        <span>Name</span>
                                    </div>

                                    <div className='mb-3'>
                                        <input 
                                            required 
                                            type='text' 
                                            id="email" 
                                            name="email" 
                                            className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`}   
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
                                            className={`form-control rounded-0 ${errors.password ? 'is-invalid' : ''}`}
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
                                Sign up
                            </button>
                                
                            <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none text-center">
                                Log in
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup