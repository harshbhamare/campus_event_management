import mysql from "mysql2"

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "campus_event_management"
    
})

db.connect((err) => {
    if (err) {
        console.error("Error connecting to DB:", err);
    } else {
        console.log("Database connected successfully");
    }
});