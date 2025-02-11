const WidthMap =1500;
const Height = 800;

// 캔버스 이름/2d로
let Game_canvas=document.getElementById("gameCanvas");
let ctx=Game_canvas.getContext("2d");

// 게임 시작 화면
let Start_Img = document.getElementById("Start_TK");
let btn_start=document.getElementById("btn");

// 인트로
let intro=document.getElementById("intro_TK");
let intro_video=document.getElementById("intro_mp4_TK");

// UI
let GameSkill=document.getElementById("Game_Skill");
let item_Time=document.getElementById("skill_time");
let Skill=document.getElementById("Skill_icon");

// HP
let life=5;

// 아이템 
// let item_icon=document.getElementById("item_icon");
// let iconA=document.getElementById("item_iconA");
// let iconB=document.getElementById("item_iconB");
// let iconC=document.getElementById("item_iconC");

// 보스 시간 / 시간에 따라 줄어들도록 
let Boss_time=document.getElementById("time_limit");
let bossTimer=0; 
let Reality_stone=false;

// 점수
let game_score=document.getElementById("score");
// 게임 화면 조정 후 주석 해제
intro_video.style.objectFit="cover";

// 나중 아이템 값 ex) 아이템이 데미지 증가면 1...
let item=0;
// 게임 화면 조정 후 주석 해제
function StartMap() {
	Start_Img.style.display = "none";
	intro_video.play();

	setTimeout(function(){
		intro.style.display ="none";
	},6000);
}

// function GameMap(){
// 	//game 화면
// 	G_canvas.
// }

function UIManager() {
	// UI 설정
	// 아이템 지정 만약 먹었다면 안 먹었다면 
	// item_time.style.backgroundColor="..."
	// visibility: visible;
}

// 리얼리티 스톤 180도 회전
function start_Boss_PhaseA() {
	if (!Reality_stone){
		Reality_stone=true;

		let Game_canvas=document.getElementById("gameCanvas");
		Game_canvas.style.transform = "rotate(180deg)";

	}
}
// start_Boss_PhaseA()


function BossTimer() {
	
}


// 데미지를 받으면 하트 하나씩 사라짐

// function up_life() {
// 	let lifeHtml="";
// 	for(let i =0; i<5; i++){
// 		if(i<life){
// 			lifeHtml+="❤️";
// 		}else{
// 			lifeHtml+="";
// 		}
// 	}
// }

// 쫄
// 

//기본 총알 클래스
// class Bullet{
//     constructor(x, y, dx, dy) {
//         this.x = x;
//         this.y = y;
        
//         //이동좌표
//         this.dx = dx;
//         this.dy = dy;
//         this.size = 8;
//     }

//     move() {
//         this.x += this.dx;
//         this.y += this.dy;
//     }

//     draw() {
//         ctx.fillStyle = "pink";
//         ctx.beginPath();
//         ctx.arc(this.x, this.y-10, this.size, 0, Math.PI * 2);
//         ctx.arc(this.x-60, this.y-10, this.size, 0, Math.PI * 2);
//         ctx.arc(this.x+60, this.y-10, this.size, 0, Math.PI * 2);
//         ctx.fill();
//     }

//     soulDraw(){
//         ctx.fillStyle = "skyblue";
//         ctx.beginPath();
//         ctx.arc(this.x, this.y-10, this.size, 0, Math.PI * 2);
//         ctx.arc(this.x-60, this.y-10, this.size, 0, Math.PI * 2);
//         ctx.arc(this.x+60, this.y-10, this.size, 0, Math.PI * 2);
//         ctx.fill();
//     }
// }

// // 총알 발사

// shoot(){
//       if (this.shootCooldown <= 0) {
//         bullets.push(new Bullet(this.x + this.width / 2, this.y + this.height, 0, 1));
//         this.shootCooldown = 100;
//     } else {
//         this.shootCooldown--;
//     }
//  }

// // 총알 이동 및 그리기
// bullets.forEach((bullet) => {
//     bullet.move();
//     bullet.draw();
// });

// 병사 좌표 값
// class Soldier{
// 	constructor(x,y,speed){
// 		this.x=x;
// 		this.y=y;
// 		this.speed=speed;
// 		this.size=40;
// 	}

// 	draw(){
// 		ctx.fillStyle="red";
// 		ctx.fillStyle(this.x,this.y,this.size,this.size);
// 	}

// 	move(){
// 		this.y += this.speed;
// 	}
// }

// let soldier=[];
// function g_Soldier() {
// 	for(let i =0; i<3; i++){
// 		const x = Math.random() * (WidthMap - 40);
// 		const y = Math.random() * (Height - 40);
// 		const speed = Math.random() * 3 + 1;
// 		soldiers.push(new Soldier(x, y, speed));
// 	}
// }

// function drawSolder(){
// 	soldiers.forEach(soldier=>{
// 		soldier.move();
// 		soldier.d();
// 	});
// }

