export const validateName = (name: string): boolean => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;

  return (
    password.length >= minLength &&
    hasNumber.test(password) &&
    hasUpperCase.test(password)
  );
};
