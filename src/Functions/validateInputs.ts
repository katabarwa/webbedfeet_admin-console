import isEmail from "sane-email-validation";

type TInput = string | undefined | null;

//Check if email is  valid email format
const validateEmailFormat = (email: TInput) => {
  if (!email) return false;
  return isEmail(email);
};

//Check if full name is first and last name (contains at least 2 words with  minimum length of 2)
const validateFullName = (fullName: TInput) => {
  if (!fullName) return false;

  const minNameLength = 2;
  const fullNameSplit = fullName.split(" ");

  if (!fullNameSplit[0] || !fullNameSplit[1]) {
    return false;
  }

  if (
    (fullNameSplit[0] && fullNameSplit[0].length < minNameLength) ||
    (fullNameSplit[1] && fullNameSplit[1].length < minNameLength)
  )
    return false;

  return true;
};

//Check if password length is t least 6
const validatePassword = (password: TInput) => {
  if (!password) return false;
  return password.length > 5;
};

//Check if text contains at least one character
const validateTextRequired = (text: TInput) => {
  if (!text) return false;
  return ("" + text).length > 0;
};

//Check if two texts are the same
const validateTwoTextsAreTheSame = (text1: TInput, text2: TInput) => {
  if (!text1 || !text2) return false;
  return text1 === text2;
};

export {
  validateEmailFormat,
  validateFullName,
  validatePassword,
  validateTextRequired,
  validateTwoTextsAreTheSame,
};
