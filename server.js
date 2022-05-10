const express = require('express');
const path = require('path');
const  { WebSocketServer } = require('ws')

const wss = new WebSocketServer({
    port: 6970
  });
const app = express();
const port = process.env.PORT || 6969;
app.use(express.static(__dirname + '/public'));
wss.on("connection", ws => {
  ws.on("message", data => {

    wss.clients.forEach((client)=>{
      if(client != ws){
        client.send(`${data}`)
      }
    })

    console.log(`Client has sent us: ${data}`)
  });

});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);