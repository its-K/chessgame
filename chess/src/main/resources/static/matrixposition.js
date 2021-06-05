onmessage = function(d) {
    let x=d.data[0]
    let y=d.data[1]
    let a=0;
        let b=0;
        for(let i=0;i<800;i+=100){
            for(let j=0;j<800;j+=100){
                if(x>=i && x<=i+100 && y>=j && y<=j+100){
                    postMessage([b,a]);
                }
                b++;
            }
            a++;
            b=0;
        }
        postMessage([b,a]);
}