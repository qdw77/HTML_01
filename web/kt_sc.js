const WidthMap =600;
const Height = 800;

// 캔버스 이름/2d로
let G_canvas = document.getElementById("gameCanvas").getContext("2d");
let G_ground = G_canvas.createLinearGradient(0, 0, WidthMap, Height);

// 게임 시작 화면
let Start_Img = document.getElementById("Start_TK");
let btn_start=document.getElementById("btn");
// 인트로
let intro=document.getElementById("intro_TK");
let intro_video=document.getElementById("intro_mp4_TK")
// UI
let game_item=document.getElementById("game_Item");
let item_icon=document.getElementById("item_icon");
let item_Time=document.getElementById("item_time");
let game_score=document.getElementById("score");
// 나중 아이템 값 ex) 아이템이 데미지 증가면 1...
let item=0;
function StartMap() {
	Start_Img.style.display = "none";
	intro_video.play();

	setTimeout(function(){
		intro.style.display ="none";
	},6000);
}

function GameMap(){
	//game 화면
}

function UIManager() {
	// UI 설정
	if (item ==1) {
		item_Time.style.backgroundColor=lightblue;
	}

	// 아이템 지정 

}

// function video_key() {
// 	//비디오 설정
// }





