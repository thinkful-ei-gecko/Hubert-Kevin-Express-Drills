const express = require('express');
const app = express();

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  const total = `${a} + ${b} equals ${Number(a) + Number(b)}`;
  res.send(total);
});

// a=97, z=122
app.get('/cipher', (req, res) => {
  const text = req.query.text.toLowerCase();
  const shift = Number(req.query.shift);

  const convertText = text
    .split(' ')
    .map((word) => word.split('').map((char) => char.charCodeAt(0)));
  const textConverter = convertText.map((wordArr) => {
    let modifyWord = wordArr.map((charCode) => {
      if (charCode >= 122) {
        return 'a';
      }
      return String.fromCharCode(charCode + shift);
    });
    return modifyWord.join('');
  });
  let wordResult = textConverter.join(' ');
  res.send(wordResult);
});

app.get('/lotto', (req, res) => {
  const numArr = req.query.arr;
  let randArr = [];

  const convertedNumArr = numArr.map((num) => {
    const toNum = Number(num);
    return toNum ? toNum : -1;
  });

  for (let i = 0; i < 6; i++) {
    randArr.push(Math.floor(Math.random() * 20));
  }

  let originalRandArr = randArr.slice();
  let msg = '';
  let numMatches = 0;
  convertedNumArr.map((num) => {
    let index = randArr.indexOf(num);
    if (index !== -1) {
      randArr.splice(index, 1);
      numMatches++;
    }
  });

  switch (numMatches) {
    case 0:
    case 1:
    case 2:
    case 3:
      msg = `Sorry, you lose`;
      break;
    case 4:
      msg = `Congratulations, you win a free ticket`;
      break;
    case 5:
      msg = `Congratulations! You win $100!`;
      break;
    case 6:
      msg = `Wow! Unbelievable! You could have won the mega millions!`;
      break;
  }

  msg += `\nWinning Numbers ${originalRandArr}`;
  res.send(msg);
});

app.listen(8000, () => {
  console.log('Express server is running!');
});
