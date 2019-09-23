const express = require('express')
const app = express();

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  const total = `${a} + ${b} equals ${Number(a) + Number(b)}`
  res.send(total);
})

// a=97, z=122
app.get('/cipher', (req, res) => {
  const text = req.query.text.toLowerCase();
  const shift = Number(req.query.shift);

  const convertText = text.split(' ').map(word => word.split('').map(char => char.charCodeAt(0)))
  const textConverter = convertText.map(wordArr => {
    let modifyWord = wordArr.map(charCode => {
      if(charCode >= 122) {
        return 'a';
      }
      return String.fromCharCode(charCode + shift)
    })
    return modifyWord.join('');
  });
  let wordResult = textConverter.join(' ');
  res.send(wordResult)
})

app.listen(8000, () => {
  console.log('Express server is running!')
})