export const MIN_PASSWORD_LENGTH = 8;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegister(data = {}) {
    const { username, email, password } = data;
    const errors = [];

    if (!username) {
        errors.push("Username is required");
    }
    if (!email) {
        errors.push("Email is required");
    }
    if (!password) {
        errors.push("Password is required");
    }

    if (password && password.length < MIN_PASSWORD_LENGTH) {
        errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }

    if (email && !emailRegex.test(email)) {
        errors.push("Invalid email format");
    }

    return errors;
}

export function validateLogin(data = {}) {
    const { username, password } = data;
    const errors = [];

    if (!username || !password) {
        errors.push("Username and password are required");
    }

    return errors;
}
