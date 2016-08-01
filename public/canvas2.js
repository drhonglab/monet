
    
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    // Global Variables for Audio
    var audioContext, osc, gain, analyserNode, javascriptNode, amplitudeArray, ctx;
    var audioPlaying = false;
    var sampleSize = 1024;  
    var column = 0;
    var canvasWidth  = 800;
    var canvasHeight = 256;

    window.onload = function() {
canvas22 = document.getElementById('canvastwo');
ctx = canvas22.getContext('2d');
        // the AudioContext is the primary 'container' for all your audio node objects
        try {
            audioContext = new AudioContext();
        } catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
        
    };
    function setupAudioNodes() {
       gain = audioContext.createGain();
      osc = audioContext.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = 1;
       gain.gain.value = 0.7;
       osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(0);
         audioPlaying = true;
     
        analyserNode   = audioContext.createAnalyser();
        javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);
        amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
        // Now connect the nodes together
       
        gain.connect(analyserNode);
        analyserNode.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
    }
    function aa() {
   
            column = 0;
            setupAudioNodes();
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
            javascriptNode.onaudioprocess = function () {
              
                if (audioPlaying == true) {
                    requestAnimFrame(drawTimeDomain);
                }
            }
      
        };
  function bb() {
    
       
            osc.stop(0);
            audioPlaying = false;
        };

  
    function drawTimeDomain() {
amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
                analyserNode.getByteTimeDomainData(amplitudeArray);
        var minValue = 9999999;
        var maxValue = 0;
        for (var i = 0; i < amplitudeArray.length; i++) {
            var value = amplitudeArray[i] / 256;
            if(value > maxValue) {
                maxValue = value;
            } else if(value < minValue) {
                minValue = value;
            }
        }
        var y_lo = canvasHeight - (canvasHeight * minValue) - 1;
        var y_hi = canvasHeight - (canvasHeight * maxValue) - 1;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(column,y_lo, 1, y_hi - y_lo);
        // loop around the canvas when we reach the end
        column += 1;
        if(column >= canvasWidth) {
            column = 0;
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        }
    }
var knob222 = document.getElementById('ver2222');
knob222.addEventListener("change",knob1212,false);
function knob1212(data) {
str= 0;
str= data.target.value
osc.frequency.value = str;
}
