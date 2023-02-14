require("dotenv").config();
const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/users", userRoutes);

// 404
app.use((req, res, next) => {
    const error = new Error("Not Found" + "😢😢😢😢😢😢😢");
    error.status = 404;
    next(error);
});

// Error handler
app.use((error, req, res, next) => {
    res.json({
        error: {
            message: error.message + "🔥🔥🔥🔥🔥🔥🔥🔥🔥"
        }
    });
});

module.exports = app;