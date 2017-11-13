const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);


//connects the express server to socket io by initializing
//a new instance by passing through the server object
const io = socketIo(server); 

let interval; 

//set interval inside callback to get temp every 10 secs

io.on("connection", socket => {
  console.log("New client connected");
if (interval) {
	clearInterval(interval);
}
interval = 
   setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});


// function takes the socket as an argument, sends http request to
//api, emits message "FromAPI" which has weather 
const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "https://api.darksky.net/forecast/0999a2f0320ba38c94610389585064aa/43.7695,11.2558"
    );

    //gets fired as soon as a new client connects to the server
    socket.emit("FromAPI", res.data.currently.temperature);
    socket.emit("FromAPIDewPoint", res.data.currently.dewPoint);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));
