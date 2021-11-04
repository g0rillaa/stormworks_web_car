function clickAction(cb) {
    var x = cb.clientX
    var y = cb.clientY

    var canvas = document.getElementById(`canvas`)
    let w = canvas.width
    let h = canvas.height
    
    if(x > (w/2)-20 && x < (w/2)+20 && y > h-100 && y < h-60){
        driveT = 0.2
        driveB = 0
        driveS = 0
    }

    if(x > (w/2)-20 && x < (w/2)+20 && y > h-50 && y < h-10){
        driveT = 0
        driveB = 0.2
        driveS = 0
    }

    if(x > (w/2)-70 && x < (w/2)-30 && y > h-50 && y < h-10){
        driveS = 0.2
    }

    if(x > (w/2)+30 && x < (w/2)+70 && y > h-50 && y < h-10){
        driveS = -0.2
    }
}
document.addEventListener("click", clickAction);

document.addEventListener('keydown', keyDownHandlerR, false);
function keyDownHandlerR(event) {
	var keyCode = event.keyCode;
    if(msgB){return}
    if(keyCode == 82) {
        if(driveR==1){
            driveR=0
        } else if(driveR==0){
            driveR=1
        } else {
            driveR=0
        }
    }
}
document.addEventListener('keydown', keyDownHandlerX, false);
function keyDownHandlerX(event) {
	var keyCode = event.keyCode;
    if(msgB){return}
    if(keyCode == 65) {
        aB = true;
    }
    if(keyCode == 68) {
        dB = true;
    }
}
document.addEventListener('keydown', keyDownHandlerY, false);
function keyDownHandlerY(event) {
var keyCode = event.keyCode;
if(msgB){return}
if(keyCode == 83) {
    	sB = true;
    }
    if(keyCode == 87) {
    	wB = true;
    }
}
document.addEventListener('keyup', keyUpHandlerX, false);
function keyUpHandlerX(event) {
	var keyCode = event.keyCode;
    if(msgB){return}
    if(keyCode == 65) {
        aB = false;
    }
    if(keyCode == 68) {
        dB = false;
    }
}
document.addEventListener('keyup', keyUpHandlerY, false);
function keyUpHandlerY(event) {
	var keyCode = event.keyCode;
    if(msgB){return}
    if(keyCode == 83) {
    	sB = false;
    }
    if(keyCode == 87) {
    	wB = false;
    }
}

setInterval(() => {
    let ts = document.getElementById('throttleSensitivitySlider').value/100
    let ss = document.getElementById('steeringSensitivitySlider').value/100
    if(wB){driveT=ts} else {driveT=0}
    if(sB){driveB=ts} else {driveB=0}
    if(aB){driveS=ss} else if(dB){driveS=-ss} else {driveS=0}

    let b = document.getElementById('reverseButton')
    let t = document.getElementById('reverseTxt')
    if(driveR==1){
        b.style.background = 'rgb(146,146,146)'
        t.style.color = 'rgb(10,10,10)'
    } else {
        b.style.background = 'rgb(43,43,43)'
        t.style.color = 'rgb(255,255,255)'
    }
},50)


function toggleReverse(){
    if(driveR==1){
        driveR=0
    } else if(driveR==0){
        driveR=1
    } else {
        driveR=0
    }
}