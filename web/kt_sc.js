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

// 아이템
let SkillA = document.getElementById("Skill_A");
let SkillB = document.getElementById("Skill_B");
// HP
// let life=5;
let life=document.getElementsByClassName("life");

// 보스 시간 / 시간에 따라 줄어들도록 
// 보스 시간
let Boss_time=document.getElementById("time_limit");
let bossTimer=0; 
// 리얼리티 스톤 t/f
let Reality_stone=false;
// let boss_timerStart=false;

// 보스 hp
let Boss_Hp=document.getElementById("life_boss");

// 레벨
let game_LV=document.getElementById("LV_bar");
let lv_Skill=0;
// 게임 화면 조정 후 주석 해제
intro_video.style.objectFit="cover";


// 게임 화면 조정 후 주석 해제
function StartMap() {
	//시작 이미지
   Start_Img.style.display = "none";
   //비디오 시작
   intro_video.play();

   setTimeout(function(){
   	  //비디오 종료
      intro.style.display ="none";
      // 타이머
      timerBoss();
      // 리얼리티스톤 호출
      // start_Boss_PhaseA();
   },6000);
   // //8초 후 원상복귀
   // setTimeout(function(){
   // 	Stop_Boss();
   // },8000)
}

// function stop(){
// 	setTimeout(function(){
// 		Stop_Boss();
// 	},10000);
// }

// stop();

function LV() {
	// 레벨이 4면 스킬 1 레벨이 10이면 스킬 2 
	if (lv_Skill==4) {
		Skill.style.display="none";
		SkillA.style.display="block";
	}if (lv_Skill==10) {
		SkillB.style.display="block";
	}
}

function timerBoss(){
   let timeRemaining = 100;  // 100%에서 시작
   let timerInterval = setInterval(function() {
    if (timeRemaining <= 0) {
        clearInterval(timerInterval); // 타이머 종료
        // 보스 등장 함수 호출
        // start_Boss_PhaseA();
       } else {
           timeRemaining -= 1; // 1%씩 감소

           // 타이머 색상이 위에서부터 사라지도록 설정
           Boss_time.style.backgroundImage = `linear-gradient(to top, red ${timeRemaining}%, white ${timeRemaining}%)`;
       }
   }, 1000);  // 1초마다 감소
}

// function BossHP(hp) {
// 	let bosshp=100; // 우선 100%로 설정
// 	if () { // 0이 되었을 경우
// 		// 승리 이미지 Start_TK.style.backgroundImage= / Start_Img.style.display = "block";
// 	}else{
		// if (life[0]=='') { // 아닐경우 만약 아이언맨이 0이 되었을 경우 / 그게 아니라면 보스 hp가 갂임
			// 게임 오버 이미지 Start_TK.style.backgroundImage= / Start_Img.style.display = "block";
		// }else{
		// 		bosshp -= 1;
		// 		Boss_Hp.style.backgroundImage=`linear-gradient(to top, red ${bosshp}%, white ${bosshp}%)`;
	// 	}

// 		}

// }


// 좌표 값 확인하느라 잠시 이미지 넣어봄
// let testImg=new Image();
// testImg.src="images/하트2.png";

// testImg.onload=function() {
// 	ctx.drawImage(testImg,100,100,50,50);
// };

// 리얼리티 스톤 180도 회전
function start_Boss_PhaseA() {
   if (!Reality_stone){
      Reality_stone=true;

      // 캔버스 gameCanvas
      let Game_canvas=document.getElementById("gameCanvas");

      // 이거는 깜빡이는 애니메이션 / opacity 투명도 ease-out 속도? 그런거
      Game_canvas.style.transition="opacity 0.5s ease-out";
      Game_canvas.style.opacity=0;
      start_boss= setTimeout(function() {
      	// 원래대로 돌아오는 것
      	Game_canvas.style.opacity=1;
      	// 이게 회전
      	Game_canvas.style.transform = "rotate(180deg)";
      },500);

   }
}


// 원래대로 되돌아가는 것

function Stop_Boss(){
	//혹시 몰라서 clear 필요할까봐 주석으로라도 달아놓음
	// clearTimeout(start_boss);
	// 깜빡이는 거, 투명도 및 속도
	Game_canvas.style.transition="opacity 0.5s ease-out";
	Game_canvas.style.opacity=0;
	setTimeout(function(){
		//원상복귀
		Game_canvas.style.opacity=1;
		Game_canvas.style.transform="rotate(360deg)";
	},500);
}


// 데미지를 받으면 하트 하나씩 사라지도록 
// 만약 타노스 스킬이 1이다 그러면 1개가 깎이고 2이면 2개가 깎임
// function ionHP(life){
// 	this.life;
// }
// this.life-=damage;

// function life_ca() {
// 	life[0].parentNode.removeChild(life[0]);
// }


// 쫄
// 
// 랜덤 값을 구하고 소수점을 버림
// Math.floor(Math.random()*100);
// width 값 - 쫄 width 값 > 0~1400 사이 난수 랜점
// Math.floor(Math.random()*1400);
// let randomA=randomNum();
// // getE 여기가 쫄이 들어갈 곳(html)
// getE.style.left=randomA+"px";

// function randomNum(){
// 	let ranL14 = Math.floor(Math.random()*1400);

// 	return ranL14;
// }

// ranT가 캔버스 너머로 갈때 멈추기

// setInterval(function() {
// 	// top 값 확인 후 split으로 px 삭제 새로 배열 생성된 0번쨰 값 저장 + 10칸씩 움직이게
// 	let ranT=Number(getE.style.top.split("px")[0])+10;

// 	if (ranT > 캔버스 Height - 쫄 Height) { return; }
// 	getE.style.top = ranT+"px";
// },100);

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

// // 병사 좌표 값
// class Soldier{
//    constructor(x,y,speed){
//       this.x=x;
//       this.y=y;
//       this.speed=speed;
//       this.size=40;
//    }

//    draw(){
//       ctx.fillStyle="red";
//       ctx.fillStyle(this.x,this.y,this.size,this.size);
//    }

//    move(){
//       this.y += this.speed;
//    }
// }

// let soldier=[];
// function g_Soldier() {
//    for(let i =0; i<3; i++){
//       const x = Math.random() * (WidthMap - 40);
//       const y = Math.random() * (Height - 40);
//       const speed = Math.random() * 3 + 1;
//       soldiers.push(new Soldier(x, y, speed));
//    }
// }

// function drawSolder(){
//    soldiers.forEach(soldier=>{
//       soldier.move();
//       soldier.d();
//    });
// }



