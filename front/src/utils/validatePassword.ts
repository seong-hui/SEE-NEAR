export function validatePassword(password: string) {
  const hasMinimumLength = password.length >= 8;
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasAlphabet = /[a-zA-Z]/.test(password);

  if (!hasMinimumLength || !hasDigit || !hasSpecialChar || !hasAlphabet) {
    return "비밀번호가 형식(최소 8자 이상, 숫자, 문자(a-z, A-Z), 특수문자 포함)에 맞지 않습니다";
  }

  return "";
}
