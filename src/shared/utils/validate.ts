export function validateEmail(email: string) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

export function validatePhoneNumber(phoneNumber: string) {
    const re = /^[8]\d{10}$/;
    return re.test(String(phoneNumber));
}