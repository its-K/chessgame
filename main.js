
let chess=function(){
    let matrix=[]
    let selectedcoin=[];
    let selectedcoinmoves=[];
    let matrixcolor=[];
    let currentplayer="Pla1";
    let oppositeplayer="Pla2";
    let rungame=true;
    let playercoins={"Pla1":[],"Pla2":[]};
    let canvas=document.getElementById('mycanvas');
    let ctx=canvas.getContext('2d');
    var alertaudio = new Audio("ding.mp3");
    //for check mate
    let check={"Pla1":["♔",false],"Pla2":["♚",false]};
    let col="grey";
    for(let i=100;i<801;i+=100){
        let col1=col;
        let mat=[];
        let colmat=[];
        for(let j=100;j<801;j+=100){
            mat.push(0);
            colmat.push(col1);
            ctx.fillStyle=col1;
            ctx.fillRect(i-100,j-100,100,100);
            if(col1=="grey") col1="white";
            else col1="grey";
        }
        if(col=="grey") col="white";
        else col="grey";
        matrix.push(mat);
        matrixcolor.push(colmat);
    }
    //for black
    ctx.fillStyle="black";
    ctx.font="45px Aerial"
    ctx.fillText("♜",30,60);
    matrix[0][0]="♜";
    playercoins["Pla2"].push("♜");
    ctx.fillText("♞",130,60);
    matrix[0][1]="♞";
    playercoins["Pla2"].push("♞");
    ctx.fillText("♝",230,60);
    matrix[0][2]="♝";
    playercoins["Pla2"].push("♝");
    ctx.fillText("♛",330,60);
    matrix[0][3]="♛";
    playercoins["Pla2"].push("♛");
    ctx.fillText("♚",430,60);
    matrix[0][4]="♚";
    playercoins["Pla2"].push("♚");
    ctx.fillText("♝",530,60);
    matrix[0][5]="♝";
    playercoins["Pla2"].push("♝");
    ctx.fillText("♞",630,60);
    matrix[0][6]="♞";
    playercoins["Pla2"].push("♞");
    ctx.fillText("♜",730,60);
    matrix[0][7]="♜";
    playercoins["Pla2"].push("♜");
    let mat=[];
    for(let i=30;i<800;i+=100){
        ctx.fillText("♟",i,160);
        mat.push("♟");
        playercoins["Pla2"].push("♟");
    }
    matrix[1]=mat;
    ctx.fillStyle="black";
    ctx.font="45px Aerial"
    ctx.fillText("♖",30,760);
    matrix[7][0]="♖";
    playercoins["Pla1"].push("♖");
    ctx.fillText("♘",130,760);
    matrix[7][1]="♘";
    playercoins["Pla1"].push("♘");
    ctx.fillText("♗",230,760);
    matrix[7][2]="♗";
    playercoins["Pla1"].push("♗");
    ctx.fillText("♕",330,760);
    matrix[7][3]="♕";
    playercoins["Pla1"].push("♕");
    ctx.fillText("♔",430,760);
    matrix[7][4]="♔";
    playercoins["Pla1"].push("♔");
    ctx.fillText("♗",530,760);
    matrix[7][5]="♗";
    playercoins["Pla1"].push("♗");
    ctx.fillText("♘",630,760);
    matrix[7][6]="♘";
    playercoins["Pla1"].push("♘");
    ctx.fillText("♖",730,760);
    matrix[7][7]="♖";
    playercoins["Pla1"].push("♖");
    mat=[];
    for(let i=30;i<800;i+=100){
        ctx.fillText("♙",i,660);
        mat.push("♙");
        playercoins["Pla1"].push("♙");
    }
    matrix[6]=mat;
    ctx.font="25px Aerial"
    ctx.fillText("Pla1",810,760);
    ctx.fillText("Pla2",810,60);
    ctx.font="15px Aerial"
    ctx.fillText("⬅️ Your Move",800,650);
    ctx.font="45px Aerial"
    ctx.stroke();

    canvas.addEventListener('click', function(e) {
        getCursorPosition(canvas, e)
    })

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x =Math.round(event.clientX - rect.left);
        const y =Math.round(event.clientY - rect.top);
        if(rungame==true) move(x,y);
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
            if(opcoins[i]==coin && opcoins[i]!=0) return true;
        }
        return false;
    }

    let removeenemycoins=function(coin){
        let opcoins=playercoins[oppositeplayer];
        for(let i=0;i<opcoins.length;i++){
            if(opcoins[i]==coin) {
                opcoins[i]=0;
                break;
            }
        }
    }

    let findcurrentplayer=function(coin){
        let opcoins=playercoins[currentplayer];
        for(let i=0;i<opcoins.length;i++){
            if(opcoins[i]==coin && opcoins[i]!=0) return true;
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
            else if(enemycoins(matrix[a][j])==false && matrix[a][j]!=0) break;
        }
        for(let a=i+1;a<8;a++){
            if(enemycoins(matrix[a][j])==true){
                if(matrix[a][j]=="♖" || matrix[a][j]=="♕" || matrix[a][j]=="♜" || matrix[a][j]=="♛"){
                return true;
                }
                break;
            }
        else if(enemycoins(matrix[a][j])==false && matrix[a][j]!=0) break;
        }
        //for horizontal moves
        for(let a=j-1;a>=0;a--){
            if(enemycoins(matrix[i][a])==true){
                if(matrix[i][a]=="♖" || matrix[i][a]=="♕" || matrix[i][a]=="♜" || matrix[i][a]=="♛"){
                return true;
                }
                break;
            }
            else if(enemycoins(matrix[i][a])==false && matrix[i][a]!=0) break;
        }
        for(let a=j+1;a<8;a++){
            if(enemycoins(matrix[i][a])==true){
                if(matrix[i][a]=="♖" || matrix[i][a]=="♕" || matrix[i][a]=="♜" || matrix[i][a]=="♛"){
                return true;
                }
                break;
            }
            else if(enemycoins(matrix[i][a])==false && matrix[i][a]!=0) break;
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
            else if(enemycoins(matrix[a][b])==false && matrix[a][b]!=0) break;
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
            else if(enemycoins(matrix[a][b])==false && matrix[a][b]!=0) break;
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
            else if(enemycoins(matrix[a][b])==false && matrix[a][b]!=0) break;
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
            else if(enemycoins(matrix[a][b])==false && matrix[a][b]!=0) break;
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

        return false;
    }

    let checkmovepossible=function(player){
        console.log("Check logic");
        let king=check[player][0];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(matrix[i][j]==king){
                    if(kingcheckmoves(i,j)==true) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    let checkmate=function(){
        let opcoins=playercoins[oppositeplayer];
        for(let i=0;i<opcoins.length;i++){
            if(opcoins[i]=="♚" || opcoins[i]=="♔") return false
        }
        return true;
    }

    let findking=function(player){
        let coin=check[player][0];
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(matrix[i][j]==coin) return [i,j];
            }
        }
    }

    let move=function(x,y){
        let a=matrixposition(x,y);
        if(selectedcoin.length==0){
            let coin=matrix[a[0]][a[1]];
            if(findcurrentplayer(coin)==false) alert("This is not your move !") 
            else{
                findpossiblemoves(a[0],a[1]);
                selectedcoinhighlight(coin,a[1],a[0]);
            }
        }
        else{
            let flag=0;
            selectedcoinmoves.forEach(ele => {
                if(ele[0]==a[0] && ele[1]==a[1]){
                    if(matrix[a[0]][a[1]]!=0){
                        removeenemycoins(matrix[a[0]][a[1]]);
                        alertaudio.play();
                    }
                    matrix[selectedcoin[1]][selectedcoin[2]]=0
                    matrix[a[0]][a[1]]=selectedcoin[0];
                    let col=matrixcolor[selectedcoin[1]][selectedcoin[2]];
                    ctx.fillStyle=col;
                    ctx.fillRect(selectedcoin[2]*100,selectedcoin[1]*100,100,100);
                    ctx.fillStyle=matrixcolor[a[0]][a[1]];
                    ctx.fillRect(a[1]*100,a[0]*100,100,100);
                    ctx.fillStyle="black";
                    ctx.fillText(selectedcoin[0],(a[1]*100)+30,(a[0]*100)+60);
                    flag=1;
                    if(checkmate()==true){
                        alert(`${currentplayer} wins  🎉`)
                        rungame=false;
                    }
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
                        ctx.font="45px Aerial"
                        let a=findking(currentplayer);
                        findpossiblemoves(a[0],a[1]);
                        selectedcoinhighlight(matrix[a[0]][a[1]],a[1],a[0]);
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
                if(matrix[a][j]==0) selectedcoinmoves.push([a,j]);
                else if(enemycoins(matrix[a][j])==true){
                    selectedcoinmoves.push([a,j]);
                    break;
                }
                else break;
            }
            for(let a=i+1;a<8;a++){
                if(matrix[a][j]==0) selectedcoinmoves.push([a,j]);
                else if(enemycoins(matrix[a][j])==true){
                    selectedcoinmoves.push([a,j]);
                    break;
                }
                else break;
            }

            //for horizontal move
            for(let a=j-1;a>=0;a--){
                if(matrix[i][a]==0) selectedcoinmoves.push([i,a]);
                else if(enemycoins(matrix[i][a])==true){
                    selectedcoinmoves.push([i,a]);
                    break;
                }
                else break;
            }
            for(let a=j+1;a<8;a++){
                if(matrix[i][a]==0) selectedcoinmoves.push([i,a]);
                else if(enemycoins(matrix[i][a])==true){
                    selectedcoinmoves.push([i,a]);
                    break;
                }
            }
        }
        else if(coin=="♟"){
            if(i==1 && matrix[i+2][j]==0) selectedcoinmoves.push([i+2,j]);
            if(matrix[i+1][j]==0) selectedcoinmoves.push([i+1,j]);

            if(enemycoins(matrix[i+1][j+1])==true) selectedcoinmoves.push([i+1,j+1]);
            if(enemycoins(matrix[i+1][j-1])==true) selectedcoinmoves.push([i+1,j-1]);
        }
        else if(coin=="♙"){
            if(i==6 && matrix[i-2][j]==0) selectedcoinmoves.push([i-2,j]);
            if(matrix[i-1][j]==0) selectedcoinmoves.push([i-1,j]);

            if(enemycoins(matrix[i-1][j+1])==true) selectedcoinmoves.push([i-1,j+1]);
            if(enemycoins(matrix[i-1][j-1])==true) selectedcoinmoves.push([i-1,j-1]);
        }
        else if(coin=="♝" || coin=="♗"){
            //for diagonal
            let a=i+1;
            let b=j+1;
            while(a<8 && b<8){
                if(matrix[a][b]==0) selectedcoinmoves.push([a++,b++]);
                else if(enemycoins(matrix[a][b])==true){
                    selectedcoinmoves.push([a,b]);
                    break;
                }
                else break;
            }
            a=i-1;
            b=j-1;
            while(a>=0 && b>=0){
                if(matrix[a][b]==0) selectedcoinmoves.push([a--,b--]);
                else if(enemycoins(matrix[a][b])==true){
                    selectedcoinmoves.push([a,b]);
                    break;
                }
                else break;
            }
            //for opposite diagonal
            a=i-1;
            b=j+1;
            while(a>=0 && b<8){
                if(matrix[a][b]==0) selectedcoinmoves.push([a--,b++]);
                else if(enemycoins(matrix[a][b])==true){
                    selectedcoinmoves.push([a,b]);
                    break;
                }
                else break;
            }
            a=i+1;
            b=j-1;
            while(a<8 && b>=0){
                if(matrix[a][b]==0) selectedcoinmoves.push([a++,b--]);
                else if(enemycoins(matrix[a][b])==true){
                    selectedcoinmoves.push([a,b]);
                    break;
                }
                else break;
            }
        }
        else if(coin=="♕" || coin=="♛"){
            //for vertical moves
            for(let a=i-1;a>=0;a--){
                if(matrix[a][j]==0) selectedcoinmoves.push([a,j]);
                else if(enemycoins(matrix[a][j])==true){
                    selectedcoinmoves.push([a,j]);
                    break;
                }
                else break;
            }
            for(let a=i+1;a<8;a++){
                if(matrix[a][j]==0) selectedcoinmoves.push([a,j]);
                else if(enemycoins(matrix[a][j])==true){
                    selectedcoinmoves.push([a,j]);
                    break;
                }
                else break;
            }

            //for horizontal move
            for(let a=j-1;a>=0;a--){
                if(matrix[i][a]==0) selectedcoinmoves.push([i,a]);
                else if(enemycoins(matrix[i][a])==true){
                    selectedcoinmoves.push([i,a]);
                    break;
                }
                else break;
            }
            for(let a=j+1;a<8;a++){
                if(matrix[i][a]==0) selectedcoinmoves.push([i,a]);
                else if(enemycoins(matrix[i][a])==true){
                    selectedcoinmoves.push([i,a]);
                    break;
                }
            }

            //for diagonal
            let a=i+1;
            let b=j+1;
            while(a<8 && b<8){
                if(matrix[a][b]==0) selectedcoinmoves.push([a++,b++]);
                else if(enemycoins(matrix[a][b])==true){
                    selectedcoinmoves.push([a,b]);
                    break;
                }
                else break;
            }
            a=i-1;
            b=j-1;
            while(a>=0 && b>=0){
                if(matrix[a][b]==0) selectedcoinmoves.push([a--,b--]);
                else if(enemycoins(matrix[a][b])==true){
                    selectedcoinmoves.push([a,b]);
                    break;
                }
                else break;
            }
            //for opposite diagonal
            a=i-1;
            b=j+1;
            while(a>=0 && b<8){
                if(matrix[a][b]==0) selectedcoinmoves.push([a--,b++]);
                else if(enemycoins(matrix[a][b])==true){
                    selectedcoinmoves.push([a,b]);
                    break;
                }
                else break;
            }
            a=i+1;
            b=j-1;
            while(a<8 && b>=0){
                if(matrix[a][b]==0) selectedcoinmoves.push([a++,b--]);
                else if(enemycoins(matrix[a][b])==true){
                    selectedcoinmoves.push([a,b]);
                    break;
                }
                else break;
            }

        }
        else if(coin=="♔" || coin=="♚"){
            if(i+1<8 &&j+1<8){
                if(matrix[i+1][j+1]==0) {
                    //for checking mate
                    matrix[i+1][j+1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j+1]);
                    matrix[i][j]=coin;
                    matrix[i+1][j+1]=0;
                }
                else if(enemycoins(matrix[i+1][j+1])==true){
                    let ene=matrix[i+1][j+1];
                    matrix[i+1][j+1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j+1]);
                    matrix[i][j]=coin;
                    matrix[i+1][j+1]=ene;
                }
            }
            if(i-1>=0 &&j-1>=0){
                if(matrix[i-1][j-1]==0){
                    matrix[i-1][j-1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j-1]);
                    matrix[i-1][j-1]=0;
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i-1][j-1])==true) {
                    let ene=matrix[i-1][j-1];
                    matrix[i-1][j-1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j-1]);
                    matrix[i-1][j-1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i-1>=0 && j+1<8){
                if(matrix[i-1][j+1]==0) {
                    matrix[i-1][j+1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j+1]);
                    matrix[i-1][j+1]=0;
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i-1][j+1])==true) {
                    let ene=matrix[i-1][j+1];
                    matrix[i-1][j+1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j+1]);
                    matrix[i-1][j+1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i+1<8 && j-1>=0){
                if(matrix[i+1][j-1]==0){
                    matrix[i+1][j-1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j-1]);
                    matrix[i+1][j-1]=0;
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i+1][j-1])==true){
                    let ene=matrix[i+1][j-1];
                    matrix[i+1][j-1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j-1]);
                    matrix[i+1][j-1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i+1<8){
                if(matrix[i+1][j]==0){
                    matrix[i+1][j]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j]);
                    matrix[i+1][j]=0;
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i+1][j])==true) {
                    let ene=matrix[i+1][j];
                    matrix[i+1][j]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i+1,j]);
                    matrix[i+1][j]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(i-1>=0){
                if(matrix[i-1][j]==0){
                    matrix[i-i][j]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j]);
                    matrix[i-i][j]=0;
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i-1][j])==true) {
                    let ene=matrix[i-1][j];
                    matrix[i-i][j]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i-1,j]);
                    matrix[i-i][j]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(j+1<8){
                if(matrix[i][j+1]==0){
                    matrix[i][j+1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,j+1]);
                    matrix[i][j+1]=0;
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i][j+1])==true) {
                    let ene=matrix[i][j+1];
                    matrix[i][j+1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,j+1]);
                    matrix[i][j+1]=ene;
                    matrix[i][j]=coin;
                }
            }
            if(j-1>=0){
                if(matrix[i][j-1]==0){
                    matrix[i][j-1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,j-1]);
                    matrix[i][j-1]=0;
                    matrix[i][j]=coin;
                }
                else if(enemycoins(matrix[i][j-1])==true) {
                    let ene=matrix[i][j-1];
                    matrix[i][j-1]=coin;
                    matrix[i][j]=0;
                    if(checkmovepossible(currentplayer)==false) selectedcoinmoves.push([i,j-1]);
                    matrix[i][j-1]=ene;
                    matrix[i][j]=coin;
                }
            }
        }
        else if(coin=="♘" || coin=="♞"){
            if(i+2<8 && j+1<8){
                if(matrix[i+2][j+1]==0 || enemycoins(matrix[i+2][i+1])==true)
                selectedcoinmoves.push([i+2,j+1]);
            }
            if(i+2<8 && j-1>=0){
                if(matrix[i+2][j-1]==0 || enemycoins(matrix[i+2][j-1])==true)
                selectedcoinmoves.push([i+2,j-1]);
            }
            if(i-2>=0 && j+1<8){
                if(matrix[i-2][j+1]==0 || enemycoins(matrix[i-2][j+1])==true)
                selectedcoinmoves.push([i-2,j+1]);
            }
            if(i-2>=0 && j-1>=0){
                if(matrix[i-2][j-1]==0 || enemycoins(matrix[i-2][j-1])==true)
                selectedcoinmoves.push([i-2,j-1]);
            }

            if(i+1<8 && j+2<8){
                if(matrix[i+1][j+2]==0 || enemycoins(matrix[i+1][j+2])==true)
                selectedcoinmoves.push([i+1,j+2]);
            }
            if(i-1>=0 && j+2<8){
                if(matrix[i-1][j+2]==0 || enemycoins(matrix[i-1][j+2])==true)
                selectedcoinmoves.push([i-1,j+2]);
            }
            if(i+1<8 && j-2>=0){
                if(matrix[i+1][j-2]==0 || enemycoins(matrix[i+1][j-2])==true)
                selectedcoinmoves.push([i+1,j-2]);
            }
            if(i-1>=0 && j-2>=0){
                if(matrix[i-1][j-2]==0 || enemycoins(matrix[i-1][j-2])==true)
                selectedcoinmoves.push([i-1,j-2]);
            }
        }

    }
    //checkmovepossible()
    return{
        check
    }
    
}
let game=new chess();