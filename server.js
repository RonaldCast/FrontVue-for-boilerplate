const express = require("express")
const port = process.env.PORT || 8080
const app = express()

app.use(express.static(__dirname + "/dist/"))
app.get(/.*/, (_, res) => {
     res.sendFile(__dirname + "/dist/index.html")
})

app.listen(port)