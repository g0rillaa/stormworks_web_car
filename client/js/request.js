var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
        var args = xmlHttp.responseText.split('?')
        spd = Number(args[0]).toFixed(2)
        batt = (Number(args[1])*100).toFixed(2)
        ShttpTimeout = Number(args[2])
        carC = Number(args[3])*6.28319
        carX = Number(args[4])
        carY = Number(args[5])
        tc = Number(args[6])*6.28319
        d1 = Number(args[7])
        d2 = Number(args[8])
        d3 = Number(args[9])
        d4 = Number(args[10])
        ping = Date.now() - Number(args[11]) 
        r1 = Number(args[12])
        r2 = Number(args[13])
        r3 = Number(args[14])
        r4 = Number(args[15])
        httpReady = true
        httpTimeout = 0
    }
}

function sendreq(){
    if(!httpReady){return}
    xmlHttp.open("GET", `http://localhost:${port}/client?${driveT}?${driveB}?${driveR}?${driveS}?${rgbR}?${rgbG}?${rgbB}?${msg}`, true);
    xmlHttp.send(null);
    httpReady = false
}

setInterval(() => {
    sendreq()
    httpTimeout = httpTimeout + 1
},50)