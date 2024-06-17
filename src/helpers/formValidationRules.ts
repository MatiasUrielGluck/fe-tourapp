export const required = (
  value: string | number,
  invalidMsg = 'Este campo es requerido'
) => {
  return Boolean(value) || invalidMsg;
};

export const isEmailValid = (
  value: string,
  invalidMsg = 'Por favor ingresá un email válido'
) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value) || invalidMsg;
};

export const minLength = (
  value: string,
  length: number,
  invalidMsg = `Este campo debe tener al menos ${length} caracteres`
) => {
  return value.length >= length || invalidMsg;
};

export const maxLength = (
  value: string,
  length: number,
  invalidMsg = `Este campo debe tener máximo ${length} caracteres`
) => {
  return value.length <= length || invalidMsg;
};

export const hasLetter = (
  value: string,
  invalidMsg = 'Este campo debe tener al menos 1 letra'
) => {
  return /[A-Za-z]/.test(value) || invalidMsg;
};

export const hasNumber = (
  value: string,
  invalidMsg = 'Este campo debe tener al menos 1 número'
) => {
  return /\d/.test(value) || invalidMsg;
};

export const isPasswordValid = (value: string) => {
  value = value.trim();
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s\S]{5,}$/;

  if (regex.test(value)) return true;
  if (typeof hasLetter(value) === 'string') return hasLetter(value);
  if (typeof hasNumber(value) === 'string') return hasNumber(value);
  if (typeof minLength(value, 5) === 'string') return minLength(value, 5);
  return 'Estás usando los caracteres permitidos?';
};
