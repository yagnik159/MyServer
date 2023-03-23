const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, '/public/index.html'));
})


app.post('/api', function(req, res) {
  const data = req.body;
  console.log(data);
  try {
    fs.writeFileSync('./public/logs.json', JSON.stringify(data));
    console.log('Successfully wrote file');
  } catch (err) {
    console.error('Error writing file', err);
  }
  res.status(200).send('OK');
});


app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
