const express = require('express')
const app = express();

app.get('/sum', (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  const total = `${a} + ${b} equals ${Number(a) + Number(b)}`
  res.send(total);
})

app.listen(8000, () => {
  console.log('Express server is running!')
})