const express = require('express')
const cors = require('cors');
const app = express();
const port = 7000;
const router = require('./Router/router')
const fileUpload = require('express-fileupload') 
const os = require('os');

app.use(cors({
    origin:'*'
}));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:os.tmpdir(),
        preserveExtension:true,
        parseNested:true
    })
);

// app.post("/create", (req, res) =>{
//     res.send("create")
// })

app.use(express.json());
app.use(router)

app.listen(port, ()=>console.log(`${port}`))
