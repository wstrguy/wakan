const app = require("./app");
const connectDB = require("./database/db");

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB()
});
