var time = 0 
var dtime = 0
var fps = 0
var sPing = 0
setInterval(() => {
    fps = Math.floor(1/(time-dtime))
    sPing = ping
},500)



setInterval(() => {
    httpTimeout = httpTimeout + 1
    if(!loaded){return}
    var canvas = document.getElementById(`canvas`)
    var ctx = canvas.getContext(`2d`)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let w = canvas.width
    let h = canvas.height

    ctx.fillStyle = `#131313`
    ctx.fillRect(0,0,canvas.width,canvas.height)
    if(carC>3 || carC<-3){SCarC = carC} else {SCarC = SCarC - (SCarC - carC)*0.2}
    SCarX = SCarX - (SCarX - carX)*0.2
    SCarY = SCarY - (SCarY - carY)*0.2
    sZoom = sZoom - (sZoom - zoom)*0.2
    if(mode){
        points.forEach(point => {
            ctx.fillStyle = `#E97C03`
            let x = (w/2)+(point.x-SCarX)*sZoom
            let y = (h/2)-(point.y-SCarY)*sZoom
            drawDot(ctx, x, y, 3)
        })
        rdr.forEach(point => {
            ctx.fillStyle = `#0086AF`
            let x = (w/2)+(point.x-SCarX)*sZoom
            let y = (h/2)-(point.y-SCarY)*sZoom
            drawDot(ctx, x, y, 7)
        })
    } else {
        points.forEach(point => {
            ctx.fillStyle = `#E97C03`
            let x = (w/2)+(point.x-SCarX)*sZoom
            let y = (h/2)-(point.y-SCarY)*sZoom
            let p = rP((w/2),(h/2),SCarC,x,y)
            drawDot(ctx, p.x, p.y, 3)
        })
        rdr.forEach(point => {
            ctx.fillStyle = `#0086AF`
            let x = (w/2)+(point.x-SCarX)*sZoom
            let y = (h/2)-(point.y-SCarY)*sZoom
            let p = rP((w/2),(h/2),SCarC,x,y)
            drawDot(ctx, p.x, p.y, 7)
        })
    }
    

    dtime = time
    time = Date.now()/1000
    ctx.fillStyle = `#ffffff`
    ctx.font = "20px Arial";
    ctx.fillText(`${fps} fps`, 5, 20);
    ctx.fillText(`${sPing} ms`, 5, 40);
    ctx.fillText(`${points.length} points`, 5, 60);

    ctx.fillText(`${spd} m/s`, 5, 100);
    ctx.fillText(`${batt} %`, 5, 120);

    if(w>500){ctx.font = "30px Arial"} else {ctx.font = "20px Arial"}
    ctx.textAlign = "center";
    if(httpTimeout>100){
        ctx.fillText("Client Lost Connection To Server", (w/2),(h/2)+80);
    } else if(ShttpTimeout>100){
        ctx.fillText("Server Lost Connection To Car", (w/2),(h/2)+80)
    }

    addPoint(points, carX, carY, tc+1.5707, d1)
    addPoint(points, carX, carY, tc, d2)
    addPoint(points, carX, carY, tc-1.5707, d3)
    addPoint(points, carX, carY, tc+3.1416, d4)

    addRdr(rdr, carX, carY, tc+1.5707, r1, 1)
    addRdr(rdr, carX, carY, tc, r2, 2)
    addRdr(rdr, carX, carY, tc-1.5707, r3, 3)
    addRdr(rdr, carX, carY, tc+3.1416, r4, 4)

    for(var i=0; i<rdr.length; i++){
        rdr[i].t = rdr[i].t + 1
        if(rdr[i].t > 120){
            rdr.splice(i,1)
        }
    }


    ctx.fillStyle = `#777777`
    drawCar(ctx, w, h, SCarC)
    
    

    compass(ctx, w-50, 50, 20, carC)
    
    if(zoom<2){zoom=2} else if(zoom>24){zoom=24}
}, 16);


function addPoint(points, x, y, a, d){
    if(d<1){return}
    let nx = (d*Math.cos(a)+x).toFixed(1)
    let ny = (d*Math.sin(a)+y).toFixed(1)
    let found = false
    points.forEach(point => {
        if(point.x==nx && point.y==ny){found=true}
    })
    if(!found){
        points.push({x:nx, y:ny})
    }
    
}

function addRdr(rdr, x, y, a, d, type){
    if(d<1){return}
    let nx = (d*Math.cos(a)+x).toFixed(1)
    let ny = (d*Math.sin(a)+y).toFixed(1)
    let found = false
    if(type==1){}
    rdr.forEach(point => {
        if(point.x==nx && point.y==ny){found=true}
    })
    if(!found){
        rdr.push({x:nx, y:ny, t:0})
    }
    
}

function zoomIn(){zoom=zoom+2}
function zoomOut(){zoom=zoom-2}

function drawCar(ctx, w, h, a){
    ctx.strokeStyle = '#777777'
    ctx.lineWidth = 10
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    if(mode){
        let car = {
            _1: rP(w/2,h/2,-a,(w/2)-zoom,(h/2)-zoom*1.5),
            _2: rP(w/2,h/2,-a,(w/2)+zoom,(h/2)-zoom*1.5),
            _3: rP(w/2,h/2,-a,(w/2)+zoom,(h/2)+zoom*1.5),
            _4: rP(w/2,h/2,-a,(w/2)-zoom,(h/2)+zoom*1.5),
        }
        ctx.beginPath()
        ctx.moveTo(car._1.x, car._1.y)
        ctx.lineTo(car._2.x, car._2.y)
        ctx.lineTo(car._3.x, car._3.y)
        ctx.lineTo(car._4.x, car._4.y)
        ctx.lineTo(car._1.x, car._1.y)
        ctx.stroke()
        ctx.closePath()
    } else {
        ctx.beginPath()
        ctx.moveTo((w/2)-zoom, (h/2)-zoom*1.5)
        ctx.lineTo((w/2)+zoom, (h/2)-zoom*1.5)
        ctx.lineTo((w/2)+zoom, (h/2)+zoom*1.5)
        ctx.lineTo((w/2)-zoom, (h/2)+zoom*1.5)
        ctx.lineTo((w/2)-zoom, (h/2)-zoom*1.5)
        ctx.stroke()
        ctx.closePath()
    }
    ctx.lineWidth = 1
}

function rP(cx,cy,a,px,py){
    let s=Math.sin(a);
    let c=Math.cos(a);
    px=px-cx;
    py=py-cy;
    let xnew=px*c-py*s;
    let ynew=px*s+py*c;
    px=xnew+cx;
    py=ynew+cy;
    return {x:px,y:py}
}

function compass(ctx, x, y, r, a){
    let nx = r*Math.cos(a-1.5708)+x
    let ny = r*Math.sin(a-1.5708)+y
    let sx = r*Math.cos(a+1.5708)+x
    let sy = r*Math.sin(a+1.5708)+y
    let ex = r*Math.cos(a)+x
    let ey = r*Math.sin(a)+y
    let wx = r*Math.cos(a+3.1416)+x
    let wy = r*Math.sin(a+3.1416)+y
    ctx.textAlign = "center";
    ctx.font = "20px Arial"
    ctx.fillStyle = "#cc3333";
    ctx.fillText("N", nx,ny);
    ctx.fillStyle = `#777777`
    ctx.fillText("S", sx,sy);
    ctx.fillText("E", ex,ey);
    ctx.fillText("W", wx,wy);
}

function drawDot(ctx, x, y, r) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI, false)
    ctx.fill()
}