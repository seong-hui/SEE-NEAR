export function formatPhoneNumber(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, "");

  if (digits.length <= 3) return digits;

  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

export function validatePhoneNumber(phoneNumber: string) {
  const regex = /^010-\d{4}-\d{4}$/;
  if (!regex.test(phoneNumber)) {
    return "전화번호가 형식(010-****-****)에 맞지 않습니다.";
  }
  return null;
}
