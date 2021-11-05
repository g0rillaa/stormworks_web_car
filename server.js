var spd = 0
var batt = 1
var carC = 0
var carX = 0
var carY = 0
var tc = 0
var d1 = 0
var d2 = 0
var d3 = 0
var d4 = 0
var r1 = 0
var r2 = 0
var r3 = 0
var r4 = 0
var msg = 'nothin|to]see[here'
var ShttpTimeout = 0

var driveT = 0
var driveB = 0
var driveR = 0
var driveS = 0

var rgbR = 0
var rgbG = 0
var rgbB = 0

const express = require('express');
const app = express();
app.use(express.json())
app.get('/', (req, res) => {
    res.sendFile(`client/index.html`, {root: __dirname })
    console.log('sending files to web client')
});

app.get('/sw', (req, res) => {
    let args = req.originalUrl.split('?')
    spd = Number(args[1])
    batt = Number(args[2])
    carC = Number(args[3])
    carX = Number(args[4])
    carY = Number(args[5])
    tc = Number(args[6])
    d1 = Number(args[7])
    d2 = Number(args[8])
    d3 = Number(args[9])
    d4 = Number(args[10])
    r1 = Number(args[11])
    r2 = Number(args[12])
    r3 = Number(args[13])
    r4 = Number(args[14])
    res.send(`${driveT}?${driveB}?${driveR}?${driveS}?${rgbR/255}?${rgbG/255}?${rgbB/255}?${msg}`)
    ShttpTimeout = 0
    scCr=scCr+1
});

app.get('/client', (req, res) => {
    let args = req.originalUrl.split('?')
    driveT = Number(args[1])
    driveB = Number(args[2])
    driveR = Number(args[3])
    driveS = Number(args[4])
    rgbR = Number(args[5])
    rgbG = Number(args[6])
    rgbB = Number(args[7])
    msg = args[8]
    res.send(`${spd}?${batt}?${ShttpTimeout}?${carC}?${carX}?${carY}?${tc}?${d1}?${d2}?${d3}?${d4}?${Date.now().toString()}?${r1}?${r2}?${r3}?${r4}`)
    wcCr=wcCr+1
});

//asset requesting
app.get('/style.css', (req, res) => {res.sendFile(`client/style.css`, {root: __dirname })});
app.get('/main.js', (req, res) => {res.sendFile(`client/js/main.js`, {root: __dirname })});
app.get('/render.js', (req, res) => {res.sendFile(`client/js/render.js`, {root: __dirname })});
app.get('/controls.js', (req, res) => {res.sendFile(`client/js/controls.js`, {root: __dirname })});
app.get('/request.js', (req, res) => {res.sendFile(`client/js/request.js`, {root: __dirname })});
app.get('/rgb.js', (req, res) => {res.sendFile(`client/js/rgb.js`, {root: __dirname })});

const port = process.env.PORT || 844;
app.listen(port, () => console.log(`ready`));


setInterval(() => {
    ShttpTimeout = ShttpTimeout + 1
},16)

var wcC = false
var scC = false
var wcCr = 0
var scCr = 0
setInterval(() => {
    if(wcCr>0){wcC=true}else{wcC=false}
    if(scCr>0){scC=true}else{scC=false}
    console.clear()
    console.log('Stormworks Web Car - v1.0');
    console.log('-----------------------------');
    console.log(`Web Client Connected: ${wcC} (Requests/Sec: ${wcCr})`)
    console.log(`Stormworks Car Connected: ${scC} (Requests/Sec: ${scCr})`)
    wcCr=0
    scCr=0
},1000)