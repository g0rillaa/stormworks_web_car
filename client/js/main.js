const port = 844


var loaded = false
var httpReady = false
var colourPickerOpen = false
var settingsOpen = false
var httpTimeout = 0
var ShttpTimeout = 0
var ping = 0
var zoom = 10
var sZoom = 1
var mode = false
var msgB = false

var wB = false
var sB = false
var aB = false
var dB = false

var driveT = 0
var driveB = 0
var driveR = 0
var driveS = 0

var spd = 0
var batt = 0
var carC = 1
var carX = 1
var carY = 1
var SCarC = 1
var SCarX = 1
var SCarY = 1
var tc = 0
var d1 = 0
var d2 = 0
var d3 = 0
var d4 = 0
var r1 = 0
var r2 = 0
var r3 = 0
var r4 = 0
var msg = ''

var rgbR = 0
var rgbG = 0
var rgbB = 0

var points = []
var rdr = []

window.onload = function(){
    loaded = true
    httpReady = true
}

function toggleSettings(){
    let sw = document.getElementById('settingsWindow')
    if(settingsOpen){
        settingsOpen = false
        sw.style.right = `3000px`
    } else if(!settingsOpen){
        settingsOpen = true
        sw.style.right = `50%`
    } else {
        settingsOpen = false
    }
}

function toggleMsg(){
    let mb = document.getElementById('msgBox')
    if(msgB){
        msgB = false
        mb.style.bottom = `-40px`
    } else if(!msgB){
        msgB = true
        mb.style.bottom = `40px`
    } else {
        msgB = false
    }
}

setInterval(() => {
    document.getElementById('throttleSensitivityTxt').innerHTML = `Throttle Sensitivity - ${document.getElementById('throttleSensitivitySlider').value}%`
    document.getElementById('steeringSensitivityTxt').innerHTML = `Steering Sensitivity - ${document.getElementById('steeringSensitivitySlider').value}%`
    if(document.getElementById('viewModeCheckbox').checked){
        mode=true
    } else {
        mode=false
    }
    msg = document.getElementById('msgBox').value.split(' ').join('$|&').replaceAll('?', '{qestmk}')
    if(msg==''){msg='nothin|to]see[here'}
},50)