require("dotenv").config;
const app = require('./src/app');
const connectToDB = require('./src/config/db');


connectToDB();

app.listen(300, () => {
    console.log("Server is running on Port 3000");
    
})