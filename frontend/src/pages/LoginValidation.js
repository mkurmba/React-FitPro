function Validation(values) {
    let errors = {};

    // Check if both fields are empty
    if (!values.email && !values.password) {
        errors.general = "Please enter your email and password.";
    } 
    // Check if email is empty
    else if (!values.email) {
        errors.general = "Email is required.";
    }
    // Check if password is empty
    else if (!values.password) {
        errors.general = "Password is required.";
    }

    return errors;
}

export default Validation;