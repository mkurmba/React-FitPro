function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.email === "") {
        error.email = "Email is required";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Invalid email format";
    }
    
    if (values.password === "") {
        error.password = "Password is required";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password must be 8+ characters, with upper and lower case letters"
    }

    return error;
}

export default Validation;