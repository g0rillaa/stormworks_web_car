function toggleColourPicker(){
    let cp = document.getElementById('colourPicker')
    if(colourPickerOpen){
        cp.style.right = `-300px`
        colourPickerOpen = false
    } else {
        cp.style.right = `0px`
        colourPickerOpen = true
    }
}

setInterval(() => {
    rgbR = document.getElementById('rgbSliderR').value
    rgbG = document.getElementById('rgbSliderG').value
    rgbB = document.getElementById('rgbSliderB').value
    document.getElementById('rgbResult').style.backgroundColor = `#${rgbToHex(rgbR)}${rgbToHex(rgbG)}${rgbToHex(rgbB)}`
},50)

var rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
};