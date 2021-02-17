
const SIZE=1000;
const size = 500;
const center = {x:  0.5, y: 0.5};
const minSegmentHeight = 5;
const groundHeight = -1*(Math.random())*size;
const groundHeight1 = (Math.random())*size/2;
const color = "hsl(180, 80%, 80%)";
const roughness = 2;
const maxDifference = size / 5;



function main(){
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
	
	canvas.width=SIZE;
	canvas.height=SIZE;
	
    ctx.scale(SIZE,SIZE);
    drawCircles()
    canvas.addEventListener('mousedown', function(event) {
		secrets();
	}, false);
}

const AUDIO_CONTEXT=new (AudioContext || webkitAudioContext || window.webkitAudioContext)();	
const keys={
	C:261.626, 
	D:294.33, 
	E:327.03, 
	F:348.83, 
	G:392.44, 
	A:436.04, 
	B:490.55, 
	C2:523.25,
    A1:220.00,
    B1:246.94,
    G1:196.00,
    D1:146.83,
    Fx1:185.00,
    Fx:369.99,
    Cx1:138.59,
    Cx:277.18,
    B2:123.47,
    G2:97.999,
    D2:587.33,
    E2:659.26,
    Cx2: 554.37

};


function drawCircles(){

    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    
    
    
    ctx.beginPath();

    ctx.lineWidth = 0.007
    let h = Math.floor(Math.random()*360);
    
    let rand_color = `hsla(${h},100%, 40%, 0.6)`
    ctx.strokeStyle=rand_color;
    ctx.fillStyle = rand_color
  
    
   
    //ctx.arc(0.5,0.5,0.1,0, Math.PI * 2,true);
    ctx.arc(0.5,0.5,0.1,0, Math.PI * 2,true);
    ctx.stroke();
    ctx.fill();
   
    let circlePath = new Path2D();
    ctx.beginPath();

    circlePath= ctx.arc(0.5,0.5,0.5,0, Math.PI * 2,true);
    ctx.stroke();
    ctx.closePath();

    ctx.clip(circlePath);
    
    
}

function draw(){
    
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 0.007
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    
    let bd = document.getElementById("bd");
    

    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = "source-over";
    let h = Math.floor(Math.random()*360);
    
    let rand_color = `hsla(${h},100%, 40%, 0.6)`
    ctx.fillStyle = rand_color;
    canvas.style.background = `hsla(${h},100%, 40%, 0)`;
    bd.style.background = rand_color;
    ctx.fillRect(0, 0, size, size);

    console.log(rand_color)
    //ctx.fillStyle = "hsla(0, 0%, 10%, 0.6)"
    ctx.fillStyle = rand_color;
    
    
   ctx.globalCompositeOperation = "lighter";
    ctx.shadowBlur = 15;
    let bolt =  createPlasmaBolts();
    ctx.beginPath();
    for (let i = 0; i < bolt[0].length; i++) {
        ctx.lineTo(bolt[0][i].x, bolt[0][i].y);
    }
    ctx.stroke();

    //for (let i = 0; i < bolt[1].length; i++) {
      //  ctx.lineTo(bolt[1][i].x, bolt[1][i].y);
    //}
    //ctx.stroke();
    ctx.closePath();
    
    drawCircles();
    //setTimeout(function(){ //throttle requestAnimationFrame to 20fps
      //  requestAnimationFrame(draw)
    //}, 1000/10)
 
    //window.requestAnimationFrame(draw);
 

}

function createPlasmaBolts() {
    let segmentHeight = size*100;
    let bolt = [];
    let bolt1 = [];
    bolt.push({x:  center.x, y:  center.y});
    bolt.push({x: Math.random()* (size - 100) + 50, y: groundHeight + (Math.random() - 0.9) * 50});
    bolt1.push({x:  center.x, y:  center.y});
    bolt1.push({x: Math.random()* (size - 100) + 50, y: groundHeight1 + (Math.random() - 0.9) * 50});

    let currDiff =  maxDifference;
    
    while (segmentHeight >  minSegmentHeight) {
        let newSegments = [];
        let newSegments1 = [];
        for (let i = 0; i < bolt.length - 1; i++) {
            let start = bolt[i];
            let end = bolt[i + 1];
            let midX = (start.x + end.x) / 2;
            let newX = midX + (Math.random() * 2 - 1) * currDiff;
            let start1 = bolt1[i];
            let end1 = bolt1[i + 1];
            let midX1 = (start1.x + end1.x) / 2;
            let newX1 = midX1 + (Math.random() * 2 - 1) * currDiff;

            newSegments.push(start, {x: newX, y: (start.y + end.y) / 2});
            newSegments1.push(start1, {x: newX1, y: (start1.y + end1.y) / 2});

        }

        newSegments.push(bolt.pop());
        newSegments1.push(bolt1.pop());
        bolt = newSegments;
        bolt1 = newSegments1;

        currDiff /= 2;
        segmentHeight /= 2;
    }
    return [bolt,bolt1];
}


function secrets(){
	const step=500;
	
	let slowness=300;
    //console.log('end')
    playNote(keys.D,16*step,0*slowness);
    playNote(keys.A,16*step,0*slowness);
	playNote(keys.D,step,0*slowness);
	playNote(keys.Fx,step,1*slowness);
	playNote(keys.A,step,3*slowness);
	playNote(keys.Fx,step,4*slowness);
	playNote(keys.A,step,5*slowness);
	playNote(keys.Fx,step,6*slowness);
	playNote(keys.D,step,7*slowness);
	playNote(keys.Fx,step,8*slowness);
	playNote(keys.D,step,9*slowness);
	playNote(keys.Fx,step,10*slowness);
	playNote(keys.A,step,11*slowness);
    playNote(keys.Fx,step,12*slowness);
	playNote(keys.A,step,13*slowness);
	playNote(keys.Fx,step,14*slowness);
	playNote(keys.D,step,15*slowness);
	playNote(keys.Fx,step,16*slowness);
    playNote(keys.Cx1,16*step,16*slowness);
    playNote(keys.A,16*step,16*slowness);
	playNote(keys.Cx,step,17*slowness);
	playNote(keys.Fx,step,18*slowness);
	playNote(keys.A,step,19*slowness);
	playNote(keys.Fx,step,20*slowness);
	playNote(keys.A,step,21*slowness);
	playNote(keys.Fx,step,22*slowness);
    playNote(keys.Cx,step,23*slowness);
	playNote(keys.Fx,step,24*slowness);
	playNote(keys.Cx,step,25*slowness);
	playNote(keys.Fx,step,26*slowness);
	playNote(keys.A,step,27*slowness);
	playNote(keys.Fx,step,28*slowness);
	playNote(keys.A,step,29*slowness);
	playNote(keys.Fx,step,30*slowness);
	playNote(keys.Cx,step,31*slowness);
	playNote(keys.Fx,step,32*slowness);
    playNote(keys.Fx1,16*step,32*slowness);
    playNote(keys.B1,16*step,32*slowness);
	playNote(keys.B,step,33*slowness);
    playNote(keys.D,step,34*slowness);
	playNote(keys.B,step,35*slowness);
	playNote(keys.Fx,step,36*slowness);
	playNote(keys.B,step,37*slowness);
	playNote(keys.Fx,step,38*slowness);
	playNote(keys.B,step,39*slowness);
	playNote(keys.D,step,40*slowness);
	playNote(keys.B,step,41*slowness);
	playNote(keys.D,step,42*slowness);
	playNote(keys.B,step,43*slowness);
	playNote(keys.Fx,step,44*slowness);
    //console.log('1')
    playNote(keys.B,step,45*slowness);
	playNote(keys.Fx,step,46*slowness);
	playNote(keys.B,step,47*slowness);
    
	playNote(keys.D,step,48*slowness);
    playNote(keys.G1,16*step,48*slowness);
    playNote(keys.D1,16*step,48*slowness);
	playNote(keys.B,step,49*slowness);
	playNote(keys.D,step,50*slowness);
	playNote(keys.B,step,51*slowness);
	playNote(keys.G,step,52*slowness);
	playNote(keys.B,step,53*slowness);
	playNote(keys.G,step,54*slowness);
	playNote(keys.B,step,55*slowness);
    playNote(keys.G,step,56*slowness);
	playNote(keys.B,step,57*slowness);
	playNote(keys.D,step,58*slowness);
	playNote(keys.G,step,59*slowness);
	playNote(keys.A,step,60*slowness);
	playNote(keys.A,step,61*slowness);
	playNote(keys.A,step,62*slowness);
	playNote(keys.A,step,63*slowness);
	playNote(keys.A,step,64*slowness);
	playNote(keys.A,2*step,65*slowness);
    playNote(keys.D1,step,65*slowness);
    playNote(keys.Fx1,step,67*slowness);
    playNote(keys.A1,step,68*slowness);
    playNote(keys.Fx,10*step,68*slowness);
    playNote(keys.Fx1,step,69*slowness);
    playNote(keys.A1,step,70*slowness);
    playNote(keys.Fx1,step,71*slowness);
    playNote(keys.D1,step,72*slowness);
    playNote(keys.Fx1,step,73*slowness);
    playNote(keys.D1,step,74*slowness);
    playNote(keys.Fx1,step,75*slowness);
    playNote(keys.A1,step,76*slowness);
    playNote(keys.Fx1,step,77*slowness);
    playNote(keys.A1,step,78*slowness);
    playNote(keys.A,step,78*slowness);
    playNote(keys.A,step,79*slowness);
    playNote(keys.Fx1,step,79*slowness);
    playNote(keys.A,step,80*slowness);
    playNote(keys.D1,step,80*slowness);
    playNote(keys.Fx1,step,81*slowness);
    playNote(keys.A,step,81*slowness);
    playNote(keys.Cx1,step,82*slowness);
    playNote(keys.A,2*step,82*slowness);
    playNote(keys.Fx1,step,83*slowness);
    playNote(keys.A1,step,84*slowness);
    playNote(keys.E,2*step,84*slowness);
    playNote(keys.Fx1,step,85*slowness);
    playNote(keys.E,7*step,86*slowness);
    playNote(keys.A1,step,86*slowness);
    playNote(keys.Fx1,step,87*slowness);
    playNote(keys.Cx1,step,88*slowness);
    playNote(keys.Fx1,step,89*slowness);
    playNote(keys.A1,step,90*slowness);
    playNote(keys.A,step,91*slowness);
    playNote(keys.Fx1,step,91*slowness);
    playNote(keys.A1,step,92*slowness);
    playNote(keys.A,step,92*slowness);
    playNote(keys.Fx1,step,93*slowness);
    playNote(keys.A,step,93*slowness);
    playNote(keys.Cx1,step,94*slowness);
    playNote(keys.A,step,94*slowness);
    playNote(keys.Fx1,step,95*slowness);
    playNote(keys.A,step,95*slowness);
    
    playNote(keys.B1,step,96*slowness);
    playNote(keys.A,2*step,96*slowness);
    playNote(keys.D1,step,97*slowness);
    playNote(keys.B1,step,98*slowness);
    playNote(keys.Fx,9*step,98*slowness);
    playNote(keys.Fx1,step,99*slowness);
    playNote(keys.B1,step,100*slowness);
    playNote(keys.Fx1,step,101*slowness);
    playNote(keys.B2,step,102*slowness);
    playNote(keys.D1,step,103*slowness);
    playNote(keys.B2,step,104*slowness);
    playNote(keys.D1,step,105*slowness);
    playNote(keys.B1,step,106*slowness);
    playNote(keys.Fx1,step,107*slowness);
    playNote(keys.Fx,step,107*slowness);
    playNote(keys.Fx1,step,107*slowness);
    playNote(keys.A,step,108*slowness);
    playNote(keys.B1,step,108*slowness);
    playNote(keys.A,step,109*slowness);
    playNote(keys.Fx1,step,109*slowness);
    playNote(keys.A,step,110*slowness);
    playNote(keys.B2,step,110*slowness);
    playNote(keys.A,step,111*slowness);
    playNote(keys.D1,step,111*slowness);
    playNote(keys.A,2*step,112*slowness);
    playNote(keys.G1,step,112*slowness);
    playNote(keys.D1,step,113*slowness);
    playNote(keys.B1,step,114*slowness);
    playNote(keys.D,2*step,114*slowness);
    playNote(keys.G1,step,115*slowness);
    playNote(keys.D,8*step,116*slowness);
    playNote(keys.B1,step,116*slowness);
    playNote(keys.G1,step,117*slowness);
    playNote(keys.B1,step,118*slowness);
    playNote(keys.G1,step,119*slowness);
    playNote(keys.G2,step,120*slowness);
    playNote(keys.D1,step,121*slowness);
    playNote(keys.G1,step,122*slowness);
    playNote(keys.D1,step,123*slowness);
    
    playNote(keys.G1,step,124*slowness);
    playNote(keys.D1,step,125*slowness);
    playNote(keys.A,step,125*slowness);
    playNote(keys.G1,step,126*slowness);
    playNote(keys.A,step,126*slowness);
    playNote(keys.B,step,127*slowness);
    playNote(keys.D1,step,127*slowness);
    playNote(keys.D2,2*step,128*slowness);
    playNote(keys.Fx,2*step,128*slowness);
    playNote(keys.D1,step,128*slowness);
    playNote(keys.Fx1,step,129*slowness);
    playNote(keys.E2,2*step,130*slowness);
    playNote(keys.A1,step,130*slowness);
    playNote(keys.Fx1,step,131*slowness);
    playNote(keys.Cx2,2*step,132*slowness);
    playNote(keys.A1,step,132*slowness);
    playNote(keys.Fx1,step,133*slowness);
    playNote(keys.D2,6*step,134*slowness);
    playNote(keys.D1,step,134*slowness);
    playNote(keys.Fx1,step,135*slowness);
    playNote(keys.D1,step,136*slowness);
    playNote(keys.Fx1,step,137*slowness);
    playNote(keys.A1,step,138*slowness);
    playNote(keys.Fx1,step,139*slowness);
    playNote(keys.A1,step,140*slowness);
    playNote(keys.A,step,141*slowness);
    playNote(keys.Fx1,step,141*slowness);
    playNote(keys.A,step,142*slowness);
    playNote(keys.D1,step,142*slowness);
    playNote(keys.B,step,143*slowness);
    playNote(keys.Fx1,step,143*slowness);
    playNote(keys.Cx2,2*step,144*slowness);
    playNote(keys.Fx,2*step,144*slowness);
    playNote(keys.Cx1,step,144*slowness);
    playNote(keys.Fx1,step,145*slowness);
    playNote(keys.D2,2*step,146*slowness);
    playNote(keys.A1,step,147*slowness);
    playNote(keys.Fx1,step,148*slowness);
    playNote(keys.Cx2,2*step,149*slowness);
    playNote(keys.A1,step,149*slowness);
    playNote(keys.Fx1,step,150*slowness);
    playNote(keys.Cx2,6*step,151*slowness);
    playNote(keys.Cx1,step,151*slowness);
    playNote(keys.Fx1,step,152*slowness);
    playNote(keys.Cx1,step,153*slowness);
    playNote(keys.Fx1,step,154*slowness);
    playNote(keys.A1,step,155*slowness);
    playNote(keys.Fx1,step,156*slowness);
    playNote(keys.A1,step,157*slowness);
    playNote(keys.B,step,158*slowness);
    playNote(keys.Fx1,step,158*slowness);
    playNote(keys.B,step,159*slowness);
    playNote(keys.Cx1,step,159*slowness);
    playNote(keys.Cx2,step,160*slowness);
    playNote(keys.Fx1,step,160*slowness);
    playNote(keys.D2,2*step,161*slowness);
    playNote(keys.Fx,2*step,161*slowness);
    playNote(keys.B1,step,161*slowness);
    playNote(keys.D1,step,162*slowness);
    playNote(keys.B,2*step,163*slowness);
    playNote(keys.B1,step,163*slowness);
    playNote(keys.Fx1,step,164*slowness);
    playNote(keys.B,step,165*slowness);
    playNote(keys.B1,step,165*slowness);
    playNote(keys.A,step,166*slowness);
    playNote(keys.Fx1,step,166*slowness);
    playNote(keys.B,2*step,167*slowness);
    playNote(keys.B2,step,167*slowness);
    playNote(keys.D1,step,168*slowness);
    playNote(keys.B,4*step,169*slowness);
    playNote(keys.B2,step,169*slowness);
    playNote(keys.D1,step,170*slowness);
    playNote(keys.B1,step,171*slowness);
    playNote(keys.Fx1,step,172*slowness);
    playNote(keys.B,step,173*slowness);
    playNote(keys.B1,step,173*slowness);
    playNote(keys.B,step,174*slowness);
    playNote(keys.Fx1,step,174*slowness);
    playNote(keys.B,step,175*slowness);
    playNote(keys.B2,step,175*slowness);
    playNote(keys.Cx2,step,176*slowness);
    playNote(keys.D1,step,176*slowness);
    playNote(keys.D,2*step,177*slowness);
    playNote(keys.G,2*step,177*slowness);
    playNote(keys.G2,step,177*slowness);
    playNote(keys.D1,step,178*slowness);

    



    


    






	
}

function playNote(key,duration,offset){
    console.log(key)
	var osc = AUDIO_CONTEXT.createOscillator(); // Create oscillator node
	var envelope = AUDIO_CONTEXT.createGain()
		
	osc.connect(envelope)
	
	envelope.connect(AUDIO_CONTEXT.destination)
	osc.frequency.value = key;

	osc.type = 'triangle';
	envelope.gain.setValueAtTime(0, AUDIO_CONTEXT.currentTime+offset/1000);
	envelope.gain.linearRampToValueAtTime(0.5, AUDIO_CONTEXT.currentTime + 0.1 + offset/1000);
 
		
	osc.start(AUDIO_CONTEXT.currentTime +offset/1000);
	
	envelope.gain.exponentialRampToValueAtTime(0.001, 
			AUDIO_CONTEXT.currentTime + duration/1000 +offset/1000);
    envelope.gain.linearRampToValueAtTime(0, AUDIO_CONTEXT.currentTime + duration/100 +offset/100);       
	osc.stop(AUDIO_CONTEXT.currentTime + duration/1000 +offset/1000);

	
	setTimeout(function(){
		draw();
	},offset);
	
	setTimeout(function(){
		osc.disconnect();
	},duration+offset);
}


