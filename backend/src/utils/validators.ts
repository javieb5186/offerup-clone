export const validateName = (name: string): boolean => {
  if (typeof name !== "string") return false;
  const nameRegex = /^[A-Za-z\s]+$/;
  // console.log(`${name} is `, nameRegex.test(name) ? "valid" : "invalid");
  return nameRegex.test(name);
};

export const validateEmail = (email: string): boolean => {
  if (typeof email !== "string") return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // console.log(`${email} is `, emailRegex.test(email) ? "valid" : "invalid");
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
