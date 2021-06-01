
let chess=function(){
    let matrix=[]
    let selectedcoin=[];
    let selectedcoinmoves=[];
    let matrixcolor=[];
    let currentplayer="pla1";
    let oppositeplayer="pla2";
    let playercoins={"pla1":[],"pla2":[]};
    let canvas=document.getElementById('mycanvas');
    let ctx=canvas.getContext('2d');

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
    playercoins["pla1"].push("♜");
    ctx.fillText("♞",130,60);
    matrix[0][1]="♞";
    playercoins["pla1"].push("♞");
    ctx.fillText("♝",230,60);
    matrix[0][2]="♝";
    playercoins["pla1"].push("♝");
    ctx.fillText("♛",330,60);
    matrix[0][3]="♛";
    playercoins["pla1"].push("♛");
    ctx.fillText("♚",430,60);
    matrix[0][4]="♚";
    playercoins["pla1"].push("♚");
    ctx.fillText("♝",530,60);
    matrix[0][5]="♝";
    playercoins["pla1"].push("♝");
    ctx.fillText("♞",630,60);
    matrix[0][6]="♞";
    playercoins["pla1"].push("♞");
    ctx.fillText("♜",730,60);
    matrix[0][7]="♜";
    playercoins["pla1"].push("♜");
    let mat=[];
    for(let i=30;i<800;i+=100){
        ctx.fillText("♟",i,160);
        mat.push("♟");
        playercoins["pla1"].push("♟");
    }
    matrix[1]=mat;
    ctx.fillStyle="black";
    ctx.font="45px Aerial"
    ctx.fillText("♖",30,760);
    matrix[7][0]="♖";
    playercoins["pla2"].push("♖");
    ctx.fillText("♘",130,760);
    matrix[7][1]="♘";
    playercoins["pla2"].push("♘");
    ctx.fillText("♗",230,760);
    matrix[7][2]="♗";
    playercoins["pla2"].push("♗");
    ctx.fillText("♕",330,760);
    matrix[7][3]="♕";
    playercoins["pla2"].push("♕");
    ctx.fillText("♔",430,760);
    matrix[7][4]="♔";
    playercoins["pla2"].push("♔");
    ctx.fillText("♗",530,760);
    matrix[7][5]="♗";
    playercoins["pla2"].push("♗");
    ctx.fillText("♘",630,760);
    matrix[7][6]="♘";
    playercoins["pla2"].push("♘");
    ctx.fillText("♖",730,760);
    matrix[7][7]="♖";
    playercoins["pla2"].push("♖");
    mat=[];
    for(let i=30;i<800;i+=100){
        ctx.fillText("♙",i,660);
        mat.push("♙");
        playercoins["pla2"].push("♙");
    }
    matrix[6]=mat;
    ctx.stroke();

    canvas.addEventListener('click', function(e) {
        getCursorPosition(canvas, e)
    })

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x =Math.round(event.clientX - rect.left);
        const y =Math.round(event.clientY - rect.top);
        console.log(x,y);
        move(x,y);
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
            if(opcoins[i]==coin) return true;
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

    let move=function(x,y){
        if(selectedcoin.length==0){
            let a=matrixposition(x,y);
            console.log(a)
            findpossiblemoves(a[0],a[1]);
        }
        else{
            let a= matrixposition(x, y);
            let flag=0;
            selectedcoinmoves.forEach(ele => {
                if(ele[0]==a[0] && ele[1]==a[1]){
                    if(matrix[a[0]][a[1]]!=0){
                        removeenemycoins(matrix[a[0]][a[1]]);
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
                    if (currentplayer=="pla1"){
                        currentplayer="pla2";
                        oppositeplayer="pla1";
                    }
                    else{
                        currentplayer="pla1";
                        oppositeplayer="pla2";
                    }
                    selectedcoin=[];
                    selectedcoinmoves=[];
                }
            });
            document.querySelector('#player').innerHTML=currentplayer;
            if(flag==0) alert("Selected move not possible");
        }

    }

    let findpossiblemoves=function(i,j){
        let coin=matrix[i][j];
        selectedcoin.push(coin,i,j);
        // console.log(coin);
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
            console.log(selectedcoinmoves);
        }
        else if(coin=="♟"){
            if(i==1){
                selectedcoinmoves.push([i+2,j]);
            }
            selectedcoinmoves.push([i+1,j]);
        }
        else if(coin=="♙"){
            if(i==6){
                selectedcoinmoves.push([i-2,j]);
            }
            selectedcoinmoves.push([i-1,j]);
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
                console.log(matrix[a][b])
                if(matrix[a][b]==0) selectedcoinmoves.push([a++,b--]);
                else if(enemycoins(matrix[a][b])==true){
                    selectedcoinmoves.push([a,b]);
                    break;
                }
                else break;
            }
        }
        else if(coin=="♚" || coin=="♔"){
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
                console.log(matrix[a][b])
                if(matrix[a][b]==0) selectedcoinmoves.push([a++,b--]);
                else if(enemycoins(matrix[a][b])==true){
                    selectedcoinmoves.push([a,b]);
                    break;
                }
                else break;
            }

        }
        else if(coin=="♕" || coin=="♛"){
            if(i+1<8 &&j+1<8){
                if(matrix[i+1][j+1]==0) selectedcoinmoves.push([i+1,j+1]);
                else if(enemycoins(matrix[i+1][j+1])==true) selectedcoinmoves.push([i+1,j+1]);
            }
            if(i-1>=0 &&j-1>=0){
                if(matrix[i-1][j-1]==0) selectedcoinmoves.push([i-1,j-1]);
                else if(enemycoins(matrix[i-1][j-1])==true) selectedcoinmoves.push([i-1,j-1]);
            }
            if(i-1>=0 && j+1<8){
                if(matrix[i-1][j+1]==0) selectedcoinmoves.push([i-1,j+1]);
                else if(enemycoins(matrix[i-1][j+1])==true) selectedcoinmoves.push([i-1,j+1]);
            }
            if(i+1<8 && j-1>=0){
                if(matrix[i+1][j-1]==0) selectedcoinmoves.push([i+1,j-1]);
                else if(enemycoins(matrix[i+1][j-1])==true) selectedcoinmoves.push([i+1,j-1]);
            }
            if(i+1<8){
                if(matrix[i+1][j]==0) selectedcoinmoves.push([i+1,j]);
                else if(enemycoins(matrix[i+1][j])==true) selectedcoinmoves.push([i+1,j]);
            }
            if(i-1>=0){
                if(matrix[i-1][j]==0) selectedcoinmoves.push([i-1,j]);
                else if(enemycoins(matrix[i-1][j])==true) selectedcoinmoves.push([i-1,j]);
            }
            if(j+1<8){
                if(matrix[i][j+1]==0) selectedcoinmoves.push([i,j+1]);
                else if(enemycoins(matrix[i][j+1])==true) selectedcoinmoves.push([i,j+1]);
            }
            if(j-1>=0){
                if(matrix[i][j-1]==0) selectedcoinmoves.push([i,j-1]);
                else if(enemycoins(matrix[i][j-1])==true) selectedcoinmoves.push([i,j-1]);
            }
        }
        else if(coin=="♘" || coin=="♞"){
            if(i+2<8 && j+1<8) selectedcoinmoves.push([i+2,j+1]);
            if(i+2<8 && j-1>=0) selectedcoinmoves.push([i+2,j-1]);
            if(i-2>=0 && j+1<8) selectedcoinmoves.push([i-2,j+1]);
            if(i-2>=0 && j-1>=0) selectedcoinmoves.push([i-2,j-1]);

            if(i+1<8 && j+2<8) selectedcoinmoves.push([i+1,j+2]);
            if(i-1>=0 && j+2<8) selectedcoinmoves.push([i-1,j+2]);
            if(i+1<8 && j-2>=0) selectedcoinmoves.push([i+1,j-2]);
            if(i-1>=0 && j-2>=0) selectedcoinmoves.push([i-1,j-2]);
        }

    }

    return{
        matrix,
        selectedcoinmoves,
        selectedcoin,
        playercoins
    }
    
}

let game=new chess();