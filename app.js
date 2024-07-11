const express = require("express")
const http = require('http')
const {Server} = require("socket.io")
const path = require("path")

const app = express()
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")))

const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket)=>{
    console.log("Connected")
})

app.get("/", (req, res) => {
    res.render("index")
})

server.listen(port, () => {
    console.log("Server listening on port 3000");
})