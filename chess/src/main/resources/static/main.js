let matrix=[];
let currentplayer="Pla1";
let oppositeplayer="Pla2";
let gameid="";
let check={"Pla1":["♔",false],"Pla2":["♚",false]};

let chess=function(){
    let selectedcoin=[];
    let selectedcoinmoves=[];
    let matrixcolor=[];
    let blackcoins=["♜","♞","♝","♛","♚","♝","♞","♜","♟","♟","♟","♟","♟","♟","♟","♟"];
    let whitecoins=["♖","♘","♗","♕","♔","♗","♘","♖","♙","♙","♙","♙","♙","♙","♙","♙"];
    let rungame=true;
    let playercoins={"Pla1":[],"Pla2":[]};
    let canvas=document.getElementById('mycanvas');
    let ctx=canvas.getContext('2d');
    var alertaudio = new Audio("ding.mp3");
    //for check mate

    function initialize(){  
        let col="grey";
        for(let i=100;i<801;i+=100){
            let col1=col;
            let colmat=[];
            for(let j=100;j<801;j+=100){
                colmat.push(col1);
                ctx.fillStyle=col1;
                ctx.fillRect(i-100,j-100,100,100);
                if(col1=="grey") col1="white";
                else col1="grey";
            }
            if(col=="grey") col="white";
            else col="grey";
            matrixcolor.push(colmat);
        }
        //coins insert on board
        ctx.fillStyle="black";
        ctx.font="45px Aerial"
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(matrix[i][j]!="0"){
                    ctx.fillText(matrix[i][j],(j*100)+30,(i*100)+60);

                    //for inserting specific player coins
                    for(let a=0;a<blackcoins.length;a++){
                        if(matrix[i][j]==blackcoins[a]){ 
                            playercoins["Pla2"].push(matrix[i][j]);
                            break;
                        }
                    }
                    for(let a=0;a<whitecoins.length;a++){
                        if(matrix[i][j]==whitecoins[a]){ 
                            playercoins["Pla1"].push(matrix[i][j]);
                            break;
                        }
                    }
                }
            }
        }


        //for palyer identification
        ctx.font="25px Aerial"
        ctx.fillText(check["Pla1"][2],810,760);
        ctx.fillText(check["Pla2"][2],810,60);
        ctx.font="15px Aerial"
        if(currentplayer=="Pla1"){
            ctx.fillText("⬅️ Your Move",800,650);
            oppositeplayer=="Pla2";
        }
        else{
            ctx.fillText("⬅️ Your Move",800,150);
            oppositeplayer=="Pla1";
        }
        ctx.font="45px Aerial"
        ctx.stroke();
    }

    canvas.addEventListener('click', function(e) {
        getCursorPosition(canvas, e)
    })

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x =Math.round(event.clientX - rect.left);
        const y =Math.round(event.clientY - rect.top);
        if(rungame==true) movement(x,y);
        else alert("Game over !. Restart game");
    }

    let matrixposition=function(x,y){
        let a=0;
        let b=0;
        for(let i=0;i<800;i+=100){
            for(let j=0;j<800;j+=100){
                if(x>=i && x<=i+100 && y>=j && y<=j+100){
                    return [b,a];
                }
                b++;
            }
            a++;
            b=0;
        }
        return b,a;
    }

    let enemycoins=function(coin){
        let opcoins=playercoins[oppositeplayer];
        for(let i=0;i<opcoins.length;i++){
            if(opcoins[i]==coin && opcoins[i]!="0") return true;
        }
        return false;
    }

    let removeenemycoins=function(coin){
        let opcoins=playercoins[oppositeplayer];
        for(let i=0;i<opcoins.length;i++){
            if(opcoins[i]==coin) {
                opcoins[i]="0";
                break;
            }
        }
    }

    let findcurrentplayer=function(coin){
        let opcoins=playercoins[currentplayer];
        for(let i=0;i<opcoins.length;i++){
            if(opcoins[i]==coin && opcoins[i]!="0") return true;
        }
        return false;
    }

    let selectedcoinhighlight=function(coin,x,y){
        ctx.fillStyle="#38DF96";
        ctx.fillRect(x*100,y*100,100,100);
        ctx.fillStyle="black";
        ctx.fillText(coin,(x*100)+30,(y*100)+60);
    }

    let kingcheckmoves=function(i,j){
        //for vertical moves
        for(let a=i-1;a>=0;a--){
            if(enemycoins(matrix[a][j])==true){
                if(matrix[a][j]=="♖" || matrix[a][j]=="♕" || matrix[a][j]=="♜" || matrix[a][j]=="♛"){
                return true;
                }
                break;
            }
            else if(enemycoins(matrix[a][j])==false && matrix[a][j]!="0") break;
        }
        for(let a=i+1;a<8;a++){
            if(enemycoins(matrix[a][j])==true){
                if(matrix[a][j]=="♖" || matrix[a][j]=="♕" || matrix[a][j]=="♜" || matrix[a][j]=="♛"){
                return true;
                }
                break;
            }
        else if(enemycoins(matrix[a][j])==false && matrix[a][j]!="0") break;
        }
        //for horizontal moves
        for(let a=j-1;a>=0;a--){
            if(enemycoins(matrix[i][a])==true){
                if(matrix[i][a]=="♖" || matrix[i][a]=="♕" || matrix[i][a]=="♜" || matrix[i][a]=="♛"){
                return true;
                }
                break;
            }
            else if(enemycoins(matrix[i][a])==false && matrix[i][a]!="0") break;
        }
        for(let a=j+1;a<8;a++){
            if(enemycoins(matrix[i][a])==true){
                if(matrix[i][a]=="♖" || matrix[i][a]=="♕" || matrix[i][a]=="♜" || matrix[i][a]=="♛"){
                return true;
                }
                break;
            }
            else if(enemycoins(matrix[i][a])==false && matrix[i][a]!="0") break;
        }

        //for vertical diagonal
        let a=i+1;
        let b=j+1;
        while(a<8 && b<8){
            if(enemycoins(matrix[a][b])==true){
                if(matrix[a][b]=="♝" || matrix[a][b]=="♗" || matrix[a][b]=="♕" || matrix[a][b]=="♛"){
                return true;
                }
                break;
            }
            else if(enemycoins(matrix[a][b])==false && matrix[a][b]!="0") break;
            a++;
            b++;
        }

        a=i-1;
        b=j-1;
        while(a>=0 && b>=0){
            if(enemycoins(matrix[a][b])==true){
                if(matrix[a][b]=="♝" || matrix[a][b]=="♗" || matrix[a][b]=="♕" || matrix[a][b]=="♛"){
                return true;
                }
                break;
            }
            else if(enemycoins(matrix[a][b])==false && matrix[a][b]!="0") break;
            a--;
            b--;
        }
        //for horizontal diagonal
        a=i-1;
        b=j+1;
        while(a>=0 && b<8){
            if(enemycoins(matrix[a][b])==true){
                if(matrix[a][b]=="♝" || matrix[a][b]=="♗" || matrix[a][b]=="♕" || matrix[a][b]=="♛"){
                return true;
                }
                break;
            }
            else if(enemycoins(matrix[a][b])==false && matrix[a][b]!="0") break;
            a--;
            b++;
        }

        a=i+1;
        b=j-1;
        while(a<8 && b>=0){
            if(enemycoins(matrix[a][b])==true){
                if(matrix[a][b]=="♝" || matrix[a][b]=="♗" || matrix[a][b]=="♕" || matrix[a][b]=="♛"){
                return  true;
                }
                break;
            }
            else if(enemycoins(matrix[a][b])==false && matrix[a][b]!="0") break;
            a++;
            b--;
        }

        //for l movement
        if(i+2<8 && j+1<8){
            if(enemycoins(matrix[i+2][j+1])==true) {
                if(matrix[i+2][j+1]=="♘" || matrix[i+2][j+1]=="♞") return true;
            }
        }
        if(i+2<8 && j-1>=0){
            if(enemycoins(matrix[i+2][j-1])==true){
                if(matrix[i+2][j-1]=="♘" || matrix[i+2][j-1]=="♞") return true;
            }
        }
        if(i-2>=0 && j+1<8){
            if(enemycoins(matrix[i-2][j+1])==true){
                if(matrix[i-2][j+1]=="♘" || matrix[i-2][j+1]=="♞") return true;
            }
        }
        if(i-2>=0 && j-1>=0){
            if(enemycoins(matrix[i-2][j-1])==true) {
                if(matrix[i-2][j-1]=="♘" || matrix[i-2][j-1]=="♞") return true;
            }
        }

        if(i+1<8 && j+2<8){
            if(enemycoins(matrix[i+1][j+2])==true) {
                if(matrix[i+1][j+2]=="♘" || matrix[i+1][j+2]=="♞") return true;
            }
        }
        if(i-1>=0 && j+2<8){
            if(enemycoins(matrix[i-1][j+2])==true){
                if(matrix[i-1][j+2]=="♘" || matrix[i-1][j+2]=="♞") return true;
            }
        }
        if(i+1<8 && j-2>=0){
            if(enemycoins(matrix[i+1][j-2])==true){
                if(matrix[i+1][j-2]=="♘" || matrix[i+1][j-2]=="♞") return true;
            }
        }
        if(i-1>=0 && j-2>=0){
            if(enemycoins(matrix[i-1][j-2])==true){
                if(matrix[i-1][j-2]=="♘" || matrix[i-1][j-2]=="♞") return true;
            }
        }
        //for pawn moves
        if(check[currentplayer][0]=="♚"){
            if(i+1<8 && j+1<8){
                if(enemycoins(matrix[i+1][j+1])==true){
                    if(matrix[i+1][j+1]=="♙") return true;
                }
            }
            if(i+1<8 && j-1>=0){
                if(enemycoins(matrix[i+1][j-1])==true){
                    if(matrix[i+1][j-1]=="♙") return true;
                }
            }
        }
        if(check[currentplayer][0]=="♔"){
            if(i-1>=0 && j-1>=0){
                if(enemycoins(matrix[i-1][j-1])==true){
                    if(matrix[i-1][j-1]=="♟") return true;
                }
            }
            if(i-1>=0 && j+1<8){
                if(enemycoins(matrix[i-1][j+1])==true){
                    if(matrix[i-1][j+1]=="♟") return true;
                }
            }
        }

        return false;
    }

    let checkmovepossible=function(player){
        //console.log("Check logic");
        let king=check[player][0];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(matrix[i][j]==king){
                    if(kingcheckmoves(i,j)==true) {
                        check[player][1]=true;
                        return true;
                    }
                }
            }
        }
        check[player][1]=false;
        return false;
    }

    let clearselected=function(){
        let col=matrixcolor[selectedcoin[1]][selectedcoin[2]];
        ctx.fillStyle=col;
        ctx.fillRect(selectedcoin[2]*100,selectedcoin[1]*100,100,100);
        ctx.fillStyle="black";
        ctx.fillText(selectedcoin[0],(selectedcoin[2]*100)+30,(selectedcoin[1]*100)+60);
        selectedcoin=[];
        selectedcoinmoves=[];
    }
    
    let movement=function(x,y){
        if(window.Worker){
            // chrome doesnt allow worker files from local
            try{
                var myWorker = new Worker('matrixposition.js');
                myWorker.postMessage([x,y]);
                myWorker.onmessage = function(e){
                    a=e.data;
                    move(a);
                    myWorker.terminate();
                }
            }
            catch{
                let a=matrixposition(x,y);
                move(a);
            }
        }
        else{
            let a=matrixposition(x,y);
            move(a);
        }
    }

    let move=function(a){
        if(selectedcoin.length==0){
            let coin=matrix[a[0]][a[1]];
            if(findcurrentplayer(coin)==true){
                findpossiblemoves(a[0],a[1]);
                selectedcoinhighlight(coin,a[1],a[0]);
            }
        }
        else if(selectedcoin[1]==a[0] && selectedcoin[2]==a[1]){
            clearselected();
        }
        else{
            let flag=0;
            selectedcoinmoves.forEach(ele => {
                if(ele[0]==a[0] && ele[1]==a[1]){
                    if(check[currentplayer][1]==true){
                        let ene=matrix[a[0]][a[1]];
                        matrix[selectedcoin[1]][selectedcoin[2]]="0";
                        matrix[a[0]][a[1]]=selectedcoin[0];
                        checkmovepossible(currentplayer);
                        matrix[selectedcoin[1]][selectedcoin[2]]=selectedcoin[0];
                        matrix[a[0]][a[1]]=ene;
                    }
                    if(check[currentplayer][1]==false){
                        if(matrix[a[0]][a[1]]!="0"){
                            removeenemycoins(matrix[a[0]][a[1]]);
                            alertaudio.play();
                        }
                        matrix[selectedcoin[1]][selectedcoin[2]]="0"
                        //for pawn promotion
                        if(selectedcoin[0]=="♟" && a[0]==7) selectedcoin[0]="♛";
                        if(selectedcoin[0]=="♙" && a[0]==0) selectedcoin[0]="♕";
                        matrix[a[0]][a[1]]=selectedcoin[0];
                        let col=matrixcolor[selectedcoin[1]][selectedcoin[2]];
                        ctx.fillStyle=col;
                        ctx.fillRect(selectedcoin[2]*100,selectedcoin[1]*100,100,100);
                        ctx.fillStyle=matrixcolor[a[0]][a[1]];
                        ctx.fillRect(a[1]*100,a[0]*100,100,100);
                        ctx.fillStyle="black";
                        ctx.fillText(selectedcoin[0],(a[1]*100)+30,(a[0]*100)+60);
                        flag=1;
                        if (currentplayer=="Pla1"){
                            currentplayer="Pla2";
                            oppositeplayer="Pla1";
                            ctx.font="15px Aerial"
                            ctx.fillText("⬅️ Your Move",800,150);
                            ctx.fillStyle="rgb(118, 186, 255)";
                            ctx.fillRect(800,600,100,100);
                        }
                        else{
                            currentplayer="Pla1";
                            oppositeplayer="Pla2";
                            ctx.font="15px Aerial"
                            ctx.fillText("⬅️ Your Move",800,650);
                            ctx.fillStyle="rgb(118, 186, 255)";
                            ctx.fillRect(800,100,100,100);
                        }
                        selectedcoin=[];
                        selectedcoinmoves=[];
                        if(checkmovepossible(currentplayer)==true){
                            alert("Check !");
                        }
                        updatemove();
                    }
                }
            });
            ctx.font="45px Aerial"
            if(flag==0) alert("Selected move not possible");
        }

    }

    let findpossiblemoves=function(i,j){
        let coin=matrix[i][j];
        selectedcoin.push(coin,i,j);
        //console.log(coin);
        if(coin==="♜" || coin==="♖"){
            //for vertical moves
            for(let a=i-1;a>=0;a--){
                if(matrix[a][j]=="0"){
                    matrix[a][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,j]);
                    matrix[a][j]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[a][j])==true){
                    let ene=matrix[a][j];
                    matrix[a][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,j]);
                    matrix[a][j]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
            for(let a=i+1;a<8;a++){
                if(matrix[a][j]=="0"){
                    matrix[a][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,j]);
                    matrix[a][j]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[a][j])==true){
                    let ene=matrix[a][j];
                    matrix[a][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,j]);
                    matrix[a][j]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }

            //for horizontal move
            for(let a=j-1;a>=0;a--){
                if(matrix[i][a]=="0"){
                    matrix[i][a]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,a]);
                    matrix[i][a]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i][a])==true){
                    let ene=matrix[i][a]
                    matrix[i][a]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,a]);
                    matrix[i][a]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
            for(let a=j+1;a<8;a++){
                if(matrix[i][a]=="0"){
                    matrix[i][a]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,a]);
                    matrix[i][a]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i][a])==true){
                    let ene=matrix[i][a];
                    matrix[i][a]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,a]);
                    matrix[i][a]=ene;
                    matrix[i][j]=coin;
                    break;
                }
            }
        }
        else if(coin=="♟"){
            if(i==1 && matrix[i+2][j]=="0"){
                matrix[i+2][j]=coin;
                matrix[i][j]="0";
                if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+2,j]);
                matrix[i+2][j]="0";
                matrix[i][j]=coin;
            }
            if(matrix[i+1][j]=="0"){
                matrix[i+1][j]=coin;
                matrix[i][j]="0";
                if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j]);
                matrix[i+1][j]="0";
                matrix[i][j]=coin;
            }

            if(enemycoins(matrix[i+1][j+1])==true){
                let ene=matrix[i+1][j+1];
                matrix[i+1][j+1]=coin;
                matrix[i][j]="0";
                if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j+1]);
                matrix[i+1][j+1]=ene;
                matrix[i][j]=coin;
            }
            if(enemycoins(matrix[i+1][j-1])==true){
                let ene=matrix[i+1][j-1];
                matrix[i+1][j-1]=coin;
                matrix[i][j]="0";
                if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j-1]);
                matrix[i+1][j-1]=ene;
                matrix[i][j]=coin;
            }
        }
        else if(coin=="♙"){
            if(i==6 && matrix[i-2][j]=="0"){
                matrix[i-2][j]=coin;
                matrix[i][j]="0";
                if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-2,j]);
                matrix[i-2][j]="0";
                matrix[i][j]=coin;
            }
            if(matrix[i-1][j]=="0"){
                matrix[i-1][j]=coin;
                matrix[i][j]="0";
                if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j]);
                matrix[i-1][j]="0";
                matrix[i][j]=coin;
            }

            if(enemycoins(matrix[i-1][j+1])==true){
                let ene=matrix[i-1][j+1];
                matrix[i-1][j+1]=coin;
                matrix[i][j]="0";
                if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j+1]);
                matrix[i-1][j+1]=ene;
                matrix[i][j]=coin;
            }
            if(enemycoins(matrix[i-1][j-1])==true){
                let ene=matrix[i-1][j-1];
                matrix[i-1][j-1]=coin;
                matrix[i][j]="0";
                if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j-1]);
                matrix[i-1][j-1]=ene;
                matrix[i][j]=coin;
            }
        }
        else if(coin=="♝" || coin=="♗"){
            //for diagonal
            let a=i+1;
            let b=j+1;
            while(a<8 && b<8){
                if(matrix[a][b]=="0"){
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]="0";
                    matrix[i][j]=coin;
                    a++;
                    b++;
                }
                else if(enemycoins(matrix[a][b])==true){
                    let ene=matrix[a][b];
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
            a=i-1;
            b=j-1;
            while(a>=0 && b>=0){
                if(matrix[a][b]=="0"){
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]="0";
                    matrix[i][j]=coin;
                    a--;
                    b--;
                }
                else if(enemycoins(matrix[a][b])==true){
                    let ene=matrix[a][b];
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
            //for opposite diagonal
            a=i-1;
            b=j+1;
            while(a>=0 && b<8){
                if(matrix[a][b]=="0"){
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]="0";
                    matrix[i][j]=coin;
                    a--;
                    b++;
                }
                else if(enemycoins(matrix[a][b])==true){
                    let ene=matrix[a][b];
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
            a=i+1;
            b=j-1;
            while(a<8 && b>=0){
                if(matrix[a][b]=="0"){
                    matrix[a][b]=coin;
                    matrix[i][j]='0';
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]="0";
                    matrix[i][j]=coin;
                    a++;
                    b--;
                }
                else if(enemycoins(matrix[a][b])==true){
                    let ene=matrix[a][b];
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
        }
        else if(coin=="♕" || coin=="♛"){
            //for vertical moves
            for(let a=i-1;a>=0;a--){
                if(matrix[a][j]=="0"){
                    matrix[a][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,j]);
                    matrix[a][j]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[a][j])==true){
                    let ene=matrix[a][j];
                    matrix[a][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,j]);
                    matrix[a][j]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
            for(let a=i+1;a<8;a++){
                if(matrix[a][j]=="0"){
                    matrix[a][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,j]);
                    matrix[a][j]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[a][j])==true){
                    let ene=matrix[a][j];
                    matrix[a][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,j]);
                    matrix[a][j]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }

            //for horizontal move
            for(let a=j-1;a>=0;a--){
                if(matrix[i][a]=="0"){
                    matrix[i][a]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,a]);
                    matrix[i][a]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i][a])==true){
                    let ene=matrix[i][a]
                    matrix[i][a]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,a]);
                    matrix[i][a]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
            for(let a=j+1;a<8;a++){
                if(matrix[i][a]=="0"){
                    matrix[i][a]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,a]);
                    matrix[i][a]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i][a])==true){
                    let ene=matrix[i][a];
                    matrix[i][a]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,a]);
                    matrix[i][a]=ene;
                    matrix[i][j]=coin;
                    break;
                }
            }

            //for diagonal
            let a=i+1;
            let b=j+1;
            while(a<8 && b<8){
                if(matrix[a][b]=="0"){
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]="0";
                    matrix[i][j]=coin;
                    a++;
                    b++;
                }
                else if(enemycoins(matrix[a][b])==true){
                    let ene=matrix[a][b];
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
            a=i-1;
            b=j-1;
            while(a>=0 && b>=0){
                if(matrix[a][b]=="0"){
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]="0";
                    matrix[i][j]=coin;
                    a--;
                    b--;
                }
                else if(enemycoins(matrix[a][b])==true){
                    let ene=matrix[a][b];
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
            //for opposite diagonal
            a=i-1;
            b=j+1;
            while(a>=0 && b<8){
                if(matrix[a][b]=="0"){
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]="0";
                    matrix[i][j]=coin;
                    a--;
                    b++;
                }
                else if(enemycoins(matrix[a][b])==true){
                    let ene=matrix[a][b];
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
            a=i+1;
            b=j-1;
            while(a<8 && b>=0){
                if(matrix[a][b]=="0"){
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]="0";
                    matrix[i][j]=coin;
                    a++;
                    b--;
                }
                else if(enemycoins(matrix[a][b])==true){
                    let ene=matrix[a][b];
                    matrix[a][b]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([a,b]);
                    matrix[a][b]=ene;
                    matrix[i][j]=coin;
                    break;
                }
                else break;
            }
        }
        else if(coin=="♔" || coin=="♚"){
            if(i+1<8 &&j+1<8){
                if(matrix[i+1][j+1]=="0") {
                    //for checking mate
                    matrix[i+1][j+1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j+1]);
                    matrix[i][j]=coin;
                    matrix[i+1][j+1]="0";
                }
                else if(enemycoins(matrix[i+1][j+1])==true){
                    let ene=matrix[i+1][j+1];
                    matrix[i+1][j+1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j+1]);
                    matrix[i][j]=coin;
                    matrix[i+1][j+1]=ene;
                }
            }
            if(i-1>=0 &&j-1>=0){
                if(matrix[i-1][j-1]=="0"){
                    matrix[i-1][j-1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j-1]);
                    matrix[i-1][j-1]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i-1][j-1])==true) {
                    let ene=matrix[i-1][j-1];
                    matrix[i-1][j-1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j-1]);
                    matrix[i-1][j-1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i-1>=0 && j+1<8){
                if(matrix[i-1][j+1]=="0") {
                    matrix[i-1][j+1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j+1]);
                    matrix[i-1][j+1]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i-1][j+1])==true) {
                    let ene=matrix[i-1][j+1];
                    matrix[i-1][j+1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j+1]);
                    matrix[i-1][j+1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i+1<8 && j-1>=0){
                if(matrix[i+1][j-1]=="0"){
                    matrix[i+1][j-1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j-1]);
                    matrix[i+1][j-1]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i+1][j-1])==true){
                    let ene=matrix[i+1][j-1];
                    matrix[i+1][j-1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j-1]);
                    matrix[i+1][j-1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i+1<8){
                if(matrix[i+1][j]=="0"){
                    matrix[i+1][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j]);
                    matrix[i+1][j]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i+1][j])==true) {
                    let ene=matrix[i+1][j];
                    matrix[i+1][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j]);
                    matrix[i+1][j]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i-1>=0){
                if(matrix[i-1][j]=="0"){
                    matrix[i-i][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j]);
                    matrix[i-i][j]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i-1][j])==true) {
                    let ene=matrix[i-1][j];
                    matrix[i-i][j]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j]);
                    matrix[i-i][j]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(j+1<8){
                if(matrix[i][j+1]=="0"){
                    matrix[i][j+1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,j+1]);
                    matrix[i][j+1]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i][j+1])==true) {
                    let ene=matrix[i][j+1];
                    matrix[i][j+1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,j+1]);
                    matrix[i][j+1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(j-1>=0){
                if(matrix[i][j-1]=="0"){
                    matrix[i][j-1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,j-1]);
                    matrix[i][j-1]="0";
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i][j-1])==true) {
                    let ene=matrix[i][j-1];
                    matrix[i][j-1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,j-1]);
                    matrix[i][j-1]=ene;
                    matrix[i][j]=coin;
                }
            }
        }
        else if(coin=="♘" || coin=="♞"){
            if(i+2<8 && j+1<8){
                if(matrix[i+2][j+1]=="0" || enemycoins(matrix[i+2][i+1])==true){
                    let ene=matrix[i+2][j+1];
                    matrix[i+2][j+1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+2,j+1]);
                    matrix[i+2][j+1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i+2<8 && j-1>=0){
                if(matrix[i+2][j-1]=="0" || enemycoins(matrix[i+2][j-1])==true){
                    let ene=matrix[i+2][j-1];
                    matrix[i+2][j-1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+2,j-1]);
                    matrix[i+2][j-1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i-2>=0 && j+1<8){
                if(matrix[i-2][j+1]=="0" || enemycoins(matrix[i-2][j+1])==true){
                    let ene=matrix[i-2][j+1];
                    matrix[i-2][j+1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-2,j+1]);
                    matrix[i-2][j+1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i-2>=0 && j-1>=0){
                if(matrix[i-2][j-1]=="0" || enemycoins(matrix[i-2][j-1])==true){
                    let ene=matrix[i-2][j-1];
                    matrix[i-2][j-1]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-2,j-1]);
                    matrix[i-2][j-1]=ene;
                    matrix[i][j]=coin;
                }
            }

            if(i+1<8 && j+2<8){
                if(matrix[i+1][j+2]=="0" || enemycoins(matrix[i+1][j+2])==true){
                    let ene=matrix[i+1][j+2];
                    matrix[i+1][j+2]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j+2]);
                    matrix[i+1][j+2]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i-1>=0 && j+2<8){
                if(matrix[i-1][j+2]=="0" || enemycoins(matrix[i-1][j+2])==true){
                    let ene=matrix[i-1][j+2];
                    matrix[i-1][j+2]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j+2]);
                    matrix[i-1][j+2]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i+1<8 && j-2>=0){
                if(matrix[i+1][j-2]=="0" || enemycoins(matrix[i+1][j-2])==true){
                    let ene=matrix[i+1][j-2];
                    matrix[i+1][j-2]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j-2]);
                    matrix[i+1][j-2]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i-1>=0 && j-2>=0){
                if(matrix[i-1][j-2]=="0" || enemycoins(matrix[i-1][j-2])==true){
                    let ene=matrix[i-1][j-2];
                    matrix[i-1][j-2]=coin;
                    matrix[i][j]="0";
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j-2]);
                    matrix[i-1][j-2]=ene;
                    matrix[i][j]=coin;
                }
            }
        }

    }
    
    return{
        initialize
    }
}


function loadGame(gameidTemp){
    if(gameidTemp==null) gameidTemp=document.querySelector("#gameid").value;
    $.ajax({ 
        type: 'GET',
        url: '/loadgame?gameid='+gameidTemp, 
        success: function(response){
            try {
                let json=JSON.parse(response.board);
                matrix=json;
            } catch (error) {
                matrix=response.board;
            }
            if(matrix.length>=0){
                document.querySelector(".game").innerHTML=`<canvas id="mycanvas" width="900px" height="800px" style="display: block;margin-top: 20px;"></canvas>`;
                document.querySelector("#gameid_show").textContent=response.gameid;
                game=new chess();
                currentplayer=response.currentplayer;
                oppositeplayer="Pla2";
                gameid=response.gameid;
                check["Pla1"].push(response.pla1);
                check["Pla2"].push(response.pla2);
                game.initialize();
            }
        },
        error: function(response){
            console.log(response);
        }
    });
}

function updatemove(){
    arr={"gameid":gameid,"board":matrix,"currentPlayer":currentplayer};
    $.ajax({ 
        type: 'POST',
        url: '/updategame', 
        data: JSON.stringify(arr),
        headers: {
            'Content-Type': 'application/json',
        },
        success: function(response){ 
            console.log(response);
        },
        error: function(response){
            console.log(response);
        }
    });
}

function createGame(){
    let pla1=document.getElementById("pla1").value;
    let pla2=document.getElementById("pla2").value;
    let arr={"pla1":pla1,"pla2":pla2,"gamtype":""};
    let radios=document.getElementsByName("gametype");
    for(let ele of radios){
        if(ele.selected) arr["gamtype"]=ele;
    }
    $.ajax({ 
        type: 'POST',
        url: '/newgame', 
        data: JSON.stringify(arr),
        headers: {
            'Content-Type': 'application/json',
        },
        success: function(response){ 
            console.log(response);
            loadGame(response.gameid);
        },
        error: function(response){
            console.log(response);
        }
    });
}
