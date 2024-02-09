export const subStringAddress = (text: string = "", length: number = 5) => {
  if (text.length > length * 2 + 2) {
    return text.substr(0, length) + "..." + text.substr(-length);
  }
  return text;
};
