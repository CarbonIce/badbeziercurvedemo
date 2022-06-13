canvas = document.getElementById("the")
ctx = canvas.getContext("2d")
var cp0 = [100, 100]
var cp1 = [100, 200]
var cp2 = [200, 250]
var cp3 = [300, 100]
var cps = [cp0, cp1, cp2, cp3]
var Selected = null
var canvasX = 0
var canvasY = 0
var RelativePosition = [null, null]
let mouseDown = 0;  
var mouseJUSTdown = false
var mouseJUSTup = false
var t = 0
var SPACED = false
window.onmousedown = () => {  
  ++mouseDown;
  mouseJUSTdown = true
}  
window.onmouseup = () => {  
  mouseJUSTup = true
}
function dot(x, y){
  ctx.beginPath()
  ctx.strokeStyle = "red"
  ctx.fillStyle = "red"
  ctx.arc(x, y, 5, 0, 360, false)
  ctx.fillText("(" + x.toPrecision(3) + ", " + y.toPrecision(3) + ")", x, y-10)
  ctx.stroke()
  ctx.fill()
}
function bluedot(x, y){
  ctx.beginPath()
  ctx.strokeStyle = "blue"
  ctx.fillStyle = "blue"
  ctx.arc(x, y, 5, 0, 360, false)
  ctx.fillText("(" + x.toPrecision(3) + ", " + y.toPrecision(3) + ")", x, y-10)
  ctx.stroke()
  ctx.fill()
}
function CalculateLinesAndPoints(points){
  newpoints = []
  for(var v in points){
    if(parseInt(v)+1 < points.length){
      newpoints.push([points[v][0] * t + points[parseInt(v)+1][0] * (1-t), points[v][1] * t + points[parseInt(v)+1][1] * (1-t)])
      bluedot(points[v][0] * t + points[parseInt(v)+1][0] * (1-t), points[v][1] * t + points[parseInt(v)+1][1] * (1-t))
    }
  }
  if(newpoints.length != 1){
    for(var p in newpoints){
      if(parseInt(p)+1 < newpoints.length){
        ctx.beginPath()
        ctx.moveTo(newpoints[p][0], newpoints[p][1])
        ctx.lineTo(newpoints[parseInt(p)+1][0], newpoints[parseInt(p)+1][1])
        ctx.stroke()
      }
    }
    return CalculateLinesAndPoints(newpoints)
  }
  else{
    dot(newpoints[0][0], newpoints[0][1])
  }
}
function doathing(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if(t == 0){
    for(var r in cps){
      if(((canvasX - cps[r][0])**2 + (canvasY - cps[r][1])**2)**(1/2) <= 5 || r == Selected){
        if(mouseJUSTdown){
          mouseJUSTdown = false
          Selected = r
          RelativePosition = [canvasX - cps[r][0], canvasY - cps[r][1]]
        }
        if(mouseJUSTup){
          mouseJUSTup = false
          mouseDown = 0
          Selected = null
          RelativePosition = [null, null]
        }
        if(RelativePosition[0] != null){
          eval("cp" + r.toString() + " = [canvasX - RelativePosition[0], canvasY - RelativePosition[1]]")
          cps[r] = [canvasX - RelativePosition[0], canvasY - RelativePosition[1]]
        }
        bluedot(cps[r][0], cps[r][1])
      }else{
        dot(cps[r][0] ,cps[r][1])
      }
    }
  }else{
    CalculateLinesAndPoints(cps)
    t += 0.0025
    if(t >= 1 && !SPACED){
      t = 0
    }
  }
  ctx.stroke();
  ctx.fillStyle = "black"
  ctx.strokeStyle = "black"
  ctx.moveTo(cp0[0], cp0[1])
  ctx.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], cp3[0], cp3[1])
  ctx.stroke();
  ctx.lineWidth = 2
  for(var r in cps){
    if(cps[parseInt(r)+1] != undefined){
      ctx.beginPath()
      ctx.moveTo(cps[r][0], cps[r][1])
      ctx.lineTo(cps[parseInt(r)+1][0], cps[parseInt(r)+1][1])
      ctx.stroke()
    }
  }
}
setInterval(doathing, 20)
canvas.addEventListener("mousemove", function(e) { 
  var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
  canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
  canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
});
document.getElementById('amongus').addEventListener("click", function() {
  t = 0.01
  SPACED = false
})
document.getElementById('SPACE').addEventListener("click", function() {
  t = 0.01
  SPACED = true
})