
let chess=function(){
    let canvas=document.getElementById('mycanvas');
    let ctx=canvas.getContext('2d');
    ctx.moveTo(0,0);
    ctx.lineTo(800,0);
    ctx.moveTo(800,0);
    ctx.lineTo(800,800);
    ctx.moveTo(800,800);
    ctx.lineTo(0,800);
    ctx.moveTo(0,800);
    ctx.lineTo(0,0);
    let col="grey";
    for(let i=100;i<801;i+=100){
        let col1=col;
        for(let j=100;j<801;j+=100){
            ctx.fillStyle=col1;
            ctx.fillRect(i-100,j-100,100,100);
            if(col1=="grey") col1="white";
            else col1="grey";
        }
        if(col=="grey") col="white";
        else col="grey";
    }
    //for black
    ctx.fillStyle="black";
    ctx.font="45px Aerial"
    ctx.fillText("♜",30,60);
    ctx.fillText("♞",130,60);
    ctx.fillText("♝",230,60);
    ctx.fillText("♛",330,60);
    ctx.fillText("♚",430,60);
    ctx.fillText("♝",530,60);
    ctx.fillText("♞",630,60);
    ctx.fillText("♜",730,60);
    for(let i=30;i<800;i+=100){
        ctx.fillText("♟",i,160);
    }

    ctx.fillStyle="black";
    ctx.font="45px Aerial"
    ctx.fillText("♖",30,760);
    ctx.fillText("♘",130,760);
    ctx.fillText("♗",230,760);
    ctx.fillText("♕",330,760);
    ctx.fillText("♔",430,760);
    ctx.fillText("♗",530,760);
    ctx.fillText("♘",630,760);
    ctx.fillText("♖",730,760);
    for(let i=30;i<800;i+=100){
        ctx.fillText("♙",i,660);
    }

    ctx.stroke();

    
}