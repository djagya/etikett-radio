const express = require("express");
const app = express();
const createError = require("http-errors");
const mongoose = require("mongoose");
const { setCors } = require("./middleware/security");

const indexRoute = require("./routes/indexRoute");
const musicRoute = require("./routes/musicRoute");
const ordersRoute = require("./routes/ordersRoute");
const usersRoute = require("./routes/usersRoute");

const port = process.env.PORT || 3000;


mongoose.connect("mongodb://127.0.0.1:27017/music-collection", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("open", () => console.log("db connected"));

app.use(express.json());
app.use(setCors);

app.use("/", indexRoute);
app.use("/music", musicRoute);
app.use("/orders", ordersRoute);
app.use("/users", usersRoute);


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

app.listen(port, () => console.log(`Server ist am been`));