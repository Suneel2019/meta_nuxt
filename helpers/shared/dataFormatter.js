function formatCurrency(number) {
  if (number === null || number === '' || !number) {
    return '---';
  }

  let amount = number.toString();

  let arr = [];

  //Converting to array
  for (let i = 0; i < amount.length; i++) {
    arr.push(amount[i]);
  }

  //Finding the index of decimal part '.'
  const index = arr.findIndex(val => val === '.')

  //Checking if decimal part exist in amount or not
  if (index === -1) {
    return convertWithoutComma(amount);
  }

  let decimalPart = [];

  //Storing decimal part to new array for joining it with integer part of amount after formatting at last
  for (let i = index; i < amount.length; i++) {
    decimalPart.push(amount[i]);
  }

  //Formatting the integer part of the amount
  let arr2 = [];
  let temp = index - 4;

  for (let i = (index - 1); i >= 0; i--) {
    if (temp === i) {
      arr2.push(',');
      temp -= 2;
    }

    arr2.push(amount[i]);
  }

  //Joining both integer and decimal part back together
  let arr3 = [
    ...arr2.reverse(),
    ...decimalPart
  ];

  return `Rs. ${arr3.join('')}`;
}

function convertWithoutComma(amount) {
  let arr = [];

  let temp = amount.length - 4;

  for (let i = (amount.length - 1); i >= 0; i--) {
    if (temp === i) {
      arr.push(',');
      temp -= 2;
    }

    arr.push(amount[i]);
  }

  return `Rs. ${arr.reverse().join('')}`;
}
function convertToCamelCase(string) {
  return convertToKebabCase(string)
    .split('-')
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}
function convertToKebabCase(string) {
  return string
    .split('')
    .map(letter => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`;
      }
      return letter;
    })
    .join('')
    .trim()
    .replace(/[_\s]+/g, '-');
}
function convertToTitleCase(string) {
  return convertToKebabCase(string)
    .split('-')
    .map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateRandomString(length) {
  let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export default {

  formatCurrency,
  convertWithoutComma,
  convertToCamelCase,
  convertToKebabCase,
  convertToTitleCase,
  generateRandomString

}
