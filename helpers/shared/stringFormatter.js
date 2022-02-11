function makeCamelCase(string) {
    return string.replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, ' $1').replace(/^./, s => s.toUpperCase());
}

function formatCurrency(number) {
    if (number === null || number === '') {
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

function convertToTitleCase(string) {
    return convertToKebabCase(string)
        .split('-')
        .map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
        .join(' ');
}

function convertToSentenceCase(string) {
    const interim = convertToKebabCase(string).replace(/-/g, ' ');
    return interim.slice(0, 1).toUpperCase() + interim.slice(1);
}

function convertToSmallCase(string) {
    return string.toLowerCase()
}

function stringFinderToBold(typedValue, string) {
    return string.forEach((item) => {
        return LoopThroughObject(item, typedValue)
    });
}

function LoopThroughObject(item, typedValue) {

    // let arrayOfWord = item.product_name.split(" ");

    let regex = new RegExp(typedValue, 'i');
    let result = item['product_name'].toLowerCase().replace(regex, '<b>' + typedValue + '</b>');

    item.product_name = result;

    return item;
}

function formatNullOrEmptyString(string, format = "---") {
    if (string === null || string === '') {
        return format;
    } else {
        return string;
    }
}

let a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
let b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

export default {
    makeCamelCase,
    formatCurrency,
    convertToKebabCase,
    convertToCamelCase,
    convertToTitleCase,
    stringFinderToBold,
    inWords,
    convertToSentenceCase,
    convertToSmallCase,
    formatNullOrEmptyString
}
