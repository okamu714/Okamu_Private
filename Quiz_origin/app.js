const quiz = [
{
  question: "漫画ワンピースの主人公の名前は何？",
  answers: [
　"ロロノア・ゾロ",
　"モンキー・D・ルフィ",
　"ナミ",
　"シャンクス"],
  correct:"モンキー・D・ルフィ"
},
{
  question: "ルフィが一番最初に出した技は？",
  answers: [
　"ゴムゴムのピストル",
　"ゴムゴムのバズーカ",
　"ゴムゴムのガトリング",
　"ゴムゴムのドーンロケット"],
  correct:"ゴムゴムのピストル"
},
{
  question: "次の内、赤髪海賊団の副船長で頂上戦争時にあの黄猿を銃で静止させた人物は？",
  answers: [
　"大谷翔平",
　"大森元貴",
　"アントニオ猪木",
　"ベン・ベックマン"],
  correct:"ベン・ベックマン"
}
];

const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;



const $button = document.getElementsByTagName('button');
const buttonlength = $button.length;

//クイズの問題文、選択肢を定義
const setupQuiz = () => {
 document.getElementById('js-question').textContent = quiz[quizIndex].question;

 let buttonIndex = 0;
 while(buttonIndex < buttonlength){
  $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
  buttonIndex++;
 }
}
setupQuiz();


//ボタンをクリックしたら正誤判定
const clickMove = (e) => {
if(quiz[quizIndex].correct === e.target.textContent){
 window.alert('正解！！！！');
score++;
} else {
 window.alert('残念💧💧💧');
}


quizIndex++;

if(quizIndex < quizLength){
//問題数あれこちら
setupQuiz();
} else {
//問題数がなければこちら
if(score+1 > quizLength){
window.alert('終了！！あなたの正解数は'　+ score + "/" + quizLength + "です！！！すごい！！！！");
} else {
window.alert('終了！！あなたの正解数は'　+ score + "/" + quizLength + "です！！！惜しい…！！");
}
};
}

let moveIndex = 0;
while (moveIndex < buttonlength) {
 $button[moveIndex].addEventListener('click', (e) => {
 clickMove(e);
 });
 moveIndex++;
}

