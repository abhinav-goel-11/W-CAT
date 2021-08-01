let fs = require("fs");
let path = require("path");

let inputArr = process.argv.slice(2);
let optionArr = [];
let filesArr = [];

for(let i=0 ; i<inputArr.length ; i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-"){
        optionArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}

for(let i=0 ; i<filesArr.length ; i++){
    let ans = fs.existsSync(filesArr[i]);
    if(ans==false){
        console.log("files does not exist");
        return;
    }
}


let content = "";
for(let i=0 ; i<filesArr.length ; i++){
    content += fs.readFileSync(filesArr[i]) + "\r\n";
}
let contentArr = content.split("\r\n");
// console.log(optionArr);
//edge case handeled    
let BandNtogether= optionArr.includes("-n") && optionArr.includes("-b")

 if(BandNtogether==true){
    let indexN=optionArr.indexOf("-n");
    let indexB=optionArr.indexOf("-b");
    if(indexN>indexB){
       for(let i=indexN ; i<optionArr.length ; i++){
           if(optionArr[i]=="-n" || optionArr[i]=="-b"){
               optionArr.splice(i,1);
               i--;
           }
       }
        
    }else{
        for(let i=indexB; i<optionArr.length ; i++){
            if(optionArr[i]=="-n" || optionArr[i]=="-b"){
                optionArr.splice(i,1);
                i--;
            }
        }
    }

 }

let sPresent = optionArr.includes("-s");
if(sPresent){

    for(let i=0 ; i<contentArr.length ; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }else if(contentArr[i]== "" && contentArr[i-1]==null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i=0 ; i<contentArr.length ; i++){
        if(contentArr[i] !== null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;

}
// console.log(contentArr.join("\n"));

let nPresent = optionArr.includes("-n");
if(nPresent){
    
    for(let i=0 ; i<contentArr.length-1 ; i++){
        contentArr[i] = (i+1 + " "+contentArr[i]);
    }
}
// console.log(contentArr.join("\n"));

let bPresent = optionArr.includes("-b");
if(bPresent){
    let count = 1;

    for(let i=0 ; i<contentArr.length ; i++){

        if(contentArr[i]==""){
            continue;
        }else{
        contentArr[i] = (count + " "+contentArr[i]);
            count++;
        }
    }
}
console.log(contentArr.join("\n"));



