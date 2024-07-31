
//変数（上書き可能）
let unko = "hello world!";

//定数
const BigUnko = "heeellooooo world!";


//配列（上書き不可）
let inoki = ["いーち","にーー","さーーーん","ダ〜〜〜！！"];

//console.log(inoki[3]);


//ループ文
 //let index = 0;
 //while(index < inoki.length){
 //console.log(inoki[index]);     
 //index++;
 //}

//if else文
//if(inoki.length > 5){
//console.log("ボンバイエっ！！");
//} else {
//console.log("ボンバ…！");
//}


//関数
const test = (arg) => {

if(inoki.length > arg){
console.log("ボンバイエっ！！");
} else {
console.log("ボンバ…！");
}

};

//オブジェクト
const unko2 = {
 color: "pink",
 size: "large",
 purfume: "mint",
 gotoilet: () => {
 console.log("Hello World!");
 }

};

document.getElementsByTagName("button")[0].addEventListener("click", ()=> {window.alert("Hello World!");});


