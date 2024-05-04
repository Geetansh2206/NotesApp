const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: null,
    database: "todolist",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

router.post("/todo", async (req, res) => {
    console.log(req.body, "cccccccccccccccc");
    const { newTitle, newDiscription } = req.body;

    const [createdNote] = await db.execute(
        `INSERT INTO todo (title,discription) VALUES("${newTitle}","${newDiscription}")`
    );
    const [data] = await db.execute(
        `SELECT * FROM todo WHERE id=?`, [createdNote.insertId]
    );  
    return res.send({ createdNote: data[0] });
});
router.get("/todos", async (req, res) => {
    //   console.log(req.query, "req.query------------------");
    //   const { title, description } = req.query;
    const [data] = await db.execute("SELECT * FROM `todo`");
    res.json({ msg: "Todos retrieved successfully", data: data });
});

router.delete("/delete", async (req, res) => {
    console.log(req.query, "req.query------------------");
    const { id } = req.query;
    const [data] = await db.execute("DELETE FROM todo WHERE id=?", [id]);
    res.json({ msg: "Todo  deleted successfully", data:data});
});

module.exports = router;

