const express = require("express");
const app = express();
const createError = require("http-errors");
const mongoose = require("mongoose");
const { setCors } = require("./middleware/security");
const { addUser, removeUser, getUser, getUsersInRoom } = require('./controllers/chatController');
const dot = require("dotenv");
dot.config();
const env = require("./config/config")
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const http = require('http');
const path = require("path");
import sslRedirect from 'heroku-ssl-redirect';
const indexRoute = require("./routes/indexRoute");
const archiveRoute = require("./routes/archiveRoute");
const usersRoute = require("./routes/usersRoute");
const blogRoute = require("./routes/blogRoute");
const scheduleRoute = require("./routes/scheduleRoute");
const hostRoute = require("./routes/hostRoute");
const infoBarRoute = require("./routes/infoBarRoute");
const chatRoute = require('./routes/chatRoute');

const port = process.env.PORT || 3001;

const server = http.createServer(app);
const io = socketio(server);

mongoose.connect(env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("open", () => console.log("db connected"));

io.on('connection', (socket) => {
  
    // Recieve JOIN from Chat.js
    socket.on('join', ({name, room}, callback) => {
      
      // Add user
      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) return callback(error);

      // socket.join(user.room) 
  
      // Emit MESSAGE
      socket.emit('message', {user: '', text: `Welcome ${user.name}!`});
  
      // Broadcast MESSAGE
      socket.broadcast.to(user.room).emit('message', {user: '', text: `${user.name} has joined.`});
  
      // Join user
      socket.join(user.room);
  
      callback();
    });
  
    // Recieve SENDMESSAGE
    socket.on('sendMessage', (text, callback) => {
  
      // Get user who sent message
      const user = getUser(socket.id);
  
      // Emit MESSAGE
      io.to(user.room).emit('message', { user: user.name, text: text });
  
      callback();
    });
  
  
    // Recieve DISCONNECT from Chat.js
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit('message', {user: '', text: `${user.name} has left.`})
      }
    })
})

app.use(express.json());
app.use(setCors); //middleware to use setCors on all routes
app.use(cookieParser());

app.use(express.static("client/build"))

app.use(sslRedirect());

app.use("/", indexRoute);
app.use("/archive", archiveRoute);
app.use("/users", usersRoute);
app.use("/blog", blogRoute);
app.use("/schedule", scheduleRoute);
app.use("/host", hostRoute);
app.use("/infoBar", infoBarRoute);
app.use("/chat", chatRoute);
// app.use("/*", indexRoute) ///CHANGE THE DOMAIN HERE

//Error Handler
app.use((req, res, next) => {
    next(createError(404))
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status,
        err: err.message
    })
})



// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"))
// }

// if (process.env.NODE_ENV === 'production') {
//   app.disable('x-powered-by')
//   app.use(compression())
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   });
// }



// app.listen(port, () => console.log(`Server ist am been`));
server.listen(port, () => console.log(`Server ist am been`));

