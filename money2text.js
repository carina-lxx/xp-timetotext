var numberToWords = function(num) {
  if (num === 0) {
    return 'zero';
  }
  
  if (num <= 20) {
    return translations.get(num);
  }
  
  let result = [];
  
  for (let [value, translation] of translations) {
    const times = Math.floor(num / value);
    
    if (times === 0) {
      continue;
    }
    
    num -= times * value;
    
    if (times === 1 && value >= 100) {
      result.push('One', translation);
      continue;
    }
    
    if (times === 1) {
      result.push(translation);
      continue;
    }
    
    result.push(numberToWords(times), translation);
  }
  
  return result.join(' ');
};

  
const translations = new Map([
    [1000, 'thousand'],
    [100, 'hundred and'],
    [90, 'ninety'],
    [80, 'eighty'],
    [70, 'seventy'],
    [60, 'sixty'],
    [50, 'fifty'],
    [40, 'fourty'],
    [30, 'thirty'],
    [20, 'twenty'],
    [19, 'nineteen'],
    [18, 'eighteen'],
    [17, 'seventeen'],
    [16, 'sixteen'],
    [15, 'fifteen'],
    [14, 'fourteen'],
    [13, 'thirteen'],
    [12, 'twelve'],
    [11, 'eleven'],
    [10, 'ten'],
    [9, 'nine'],
    [8, 'eight'],
    [7, 'seven'],
    [6, 'six'],
    [5, 'five'],
    [4, 'four'],
    [3, 'three'],
    [2, 'two'],
    [1, 'one'],
]);
'use strict'
// The goal is to develop a money-2-text converter function (money2text) that converts money (USD) (formatted as '10000.00') to human readable text so that a virtual assistants such as Siri can read the text to our blind users.

//assume the input is less than 10000.00
function money2text (time) {
    let res = '';
    let dollar = parseInt(time.slice(0, time.length-3))
    let cents = parseInt(time.slice(-2))

    let translatedDollar = numberToWords(dollar)

    if (cents === 0) {
        res = translatedDollar + " dollars";
    } else {
        let translatedCents = numberToWords(cents)
        res = translatedDollar + " dollars and " + translatedCents + " cents"
    }
    
    return res;
}

module.exports = money2text


