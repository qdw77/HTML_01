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
      mob_Loop();
   },6000);
   // //8초 후 원상복귀
   // setTimeout(function(){
   //    Stop_Boss();
   // },8000)
}

// function stop(){
//    setTimeout(function(){
//       Stop_Boss();
//    },10000);
// }

// stop();

// function LV() {
//    // 레벨이 4면 스킬 1 레벨이 10이면 스킬 2 
//    if (lv_Skill==5) {
//       Skill.style.display="none";
//       SkillA.style.display="block";
//    }if (lv_Skill==10) {
//       SkillB.style.display="block";
//    }
// }

function timerBoss(){
   let timeRemaining = 100;  // 100%에서 시작
   let timerInterval = setInterval(function() {
    if (timeRemaining <= 0) {
        clearInterval(timerInterval); // 타이머 종료
        // 보스 등장 함수 호출
        // start_Boss_PhaseA();
       } else {
           timeRemaining -= 10; // 10%씩 감소
           // 타이머 색상이 위에서부터 사라지도록 설정
           Boss_time.style.backgroundImage = `linear-gradient(to top, red ${timeRemaining}%, white ${timeRemaining}%)`;
       }
   }, 1000);  // 1초마다 감소
}

// 좌표 값 확인하느라 잠시 이미지 넣어봄
// let testImg=new Image();
// testImg.src="images/하트2.png";

// testImg.onload=function() {
//    ctx.drawImage(testImg,100,100,50,50);
// };


// 보스 HP 초기화
// let bossHp = 100;  // 보스의 초기 HP 값 (100%)

// 보스 HP를 깎는 함수
function bossDamage(bossAttack) {
    let bossHpElement = document.getElementById("boss_Hp");
    let currentHp = parseInt(bossHpElement.style.width) || 100; // 기본 100%에서 시작

    // 데미지만큼 HP가 깎임
    let newHp = currentHp - bossAttack;
    if (newHp < 0) newHp = 0;  // HP는 0보다 적을 수 없음

    // 새로운 HP 비율 계산
    let hpPercentage = newHp + "%";

    // 보스 HP의 width와 background-color를 변경
    bossHpElement.style.width = hpPercentage;
    bossHpElement.style.backgroundColor = `linear-gradient(to right, red ${hpPercentage}, white ${hpPercentage})`;

    if (newHp ==0) {
        // 보스 HP가 0이면 게임 오버 처리
        setTimeout(()=>{
         alert("보스를 처치했습니다!");
         // 여기에 Start_Img.style.display = "block"; 같은 걸로 이미지 새로  
      },1000)
    }
}


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

// 아이언맨 HP 
const hpIcon = ['HP_1', 'HP_2', 'HP_3', 'HP_4', 'HP_5'];

// 데미지를 받아오는 함수 
function Damage(damageCount) { 
    // 데미지만큼 HP 아이콘을 숨김
    for (let i = 0; i < damageCount; i++) {
        // HP에  hpIcon[damageCount]를 받아오고 데미지만큼만 깎임 
        const HP = hpIcon[i];
        const life = document.getElementById(HP);
        
        // 아이콘을 숨김
        if (life) {
            life.style.display = 'none';
        }
    }
}

// 적 담는 곳
let soldiers = [];

class Minion {

      constructor() {
          // x 위치는 0부터 캔버스의 가로 길이 사이에서 랜덤하게 결정
          this.x = Math.random() * (WidthMap - 40);  // 쫄의 가로 크기(40px)을 제외한 범위에서 랜덤 x값을 설정
          this.y = -50;  // 쫄은 화면 위쪽(-50)에서부터 시작
          this.width = 40;  // 쫄의 가로 크기
          this.height = 40;  // 쫄의 세로 크기
          this.speed = Math.random() * 2 + 0.5;  // 쫄의 속도는 0.5 ~ 1.5 사이로 랜덤하게 설정
          this.isAlive = true;  // 쫄이 살아있는지 여부
          this.spacing = Math.random() * 150 + 50; // 각 쫄의 떨어지는 간격을 설정 (최소 50px, 최대 150px)
      }

      moveMob(){
         this.y += this.speed;  // Y축으로 속도만큼 내려감

         // 화면 아래로 나가면 사망 처리
         if (this.y > Height) this.isAlive = false;  // Y 값이 화면 높이를 초과하면 사망 처리
      }

      drawMob() {
          ctx.fillStyle = 'blue';  // 쫄의 색상은 빨간색
         // let img = new image();
         // img.src=''
          ctx.fillRect(this.x, this.y, this.width, this.height);  // 쫄을 캔버스에 그리기
      }
}

class Minionbullet{
   constructor(x, y, angle, speed){
     this.x = x;
     this.y = y;
     this.angle = angle;
     this.speed = speed;
     this.time = 0;
     this.size = 8;
   }

   M_move(){
     this.x += Math.cos(this.angle) * this.speed;
     this.y += Math.sin(this.angle) * this.speed;
   }

   M_draw(ctx){
      // 총알 이미지
      ctx.drawImage();
   }
}

function createSoldier(){
   let numSoldiers=Math.floor(Math.random()*2)+1
   for (let i =0; i<numSoldiers; i++){
      let newSoldiers =new Minion();
      let canCreate = true;

      for (let j =0; j<soldiers.length; j++){
         if(Math.abs(soldiers[j].y-newSoldiers.y)<50){
            canCreate=false;
            break;
         }
      }
      if(canCreate){
         soldiers.push(newSoldiers);
      }
   }
}

function updateSoldiers(){
   soldiers.forEach(soldier=>{
      soldier.moveMob();
      soldier.drawMob();
   });
}

function removeSoldier(){
   soldiers=soldiers.filter(soldier=>soldier.isAlive);
}

function mob_Loop(){
    ctx.clearRect(0, 0, WidthMap, Height);

    updateSoldiers();
    removeSoldier();

    requestAnimationFrame(mob_Loop);
}

setInterval(function() {
   createSoldier();  // 새로운 쫄 생성
}, 1000);



// //적 만들기
// function CreateSoldier(){
//    const soldierNum={
//       x:Math.random() * (Game_canvas.width-40),
//       y:0,
//       width: 40, // 적의 너비
//       height: 40, // 적의 높이
//       speed: 2, // 적이 내려오는 속도
//    }
//    soldier.push(soldierNum);
// }

// function drowSoldier() {
//    soldier.forEach((soldierNum)=>{
//       ctx.fillStyle = 'red'; // 적의 색상을 빨간색으로 설정
//       ctx.fillRect(soldierNum.x, soldierNum.y, soldierNum.width, soldierNum.height); // 적을 그립니다.
//    });
// }

// function upSoldier(){
//    soldier.forEach((soldierNum,index)=>{
//    soldierNum.y += soldierNum.speed;

//       if (soldierNum.y>Game_canvas.height) {
//          soldier.splice(index,1);
//       }

//    });
// }

// setInterval(CreateSoldier,1000);


// 데미지를 적용할 예시
// Damage(1);  // 1만큼 데미지를 주면, 1개가 사라짐
// 아마 넘겨 받을 때 Damage() < 추가 데미지 시 원래 있던 값에 플러스 되도록 해야할 듯
// 아니면 따로 또 만들고 내부에 넣든가 해야할 듯


// // 쫄 생성 함수
// function createMinions() {
//     let numberOfMinions = Math.floor(Math.random() * 3) + 1;  // 1~3개의 쫄을 랜덤으로 생성
//     for (let i = 0; i < numberOfMinions; i++) {
//         minions.push(new Minion());  // 새로운 쫄을 minions 배열에 추가
//     }
// }

// // 쫄 업데이트 함수
// function updateMinions() {
//     minions.forEach(minion => {
//         minion.move();  // 쫄 이동
//         minion.draw();  // 쫄 그리기
//     });
// }

// // 죽은 쫄 제거 함수
// function removeDeadMinions() {
//     minions = minions.filter(minion => minion.isAlive);  // 살아있는 쫄만 남기기
// }

// // 게임 루프 처리 (requestAnimationFrame 사용)
// function gameLoop() {
//     // 화면을 매 프레임마다 지우고 다시 그리기
//     ctx.clearRect(0, 0, WidthMap, Height);  // 캔버스 초기화 (기존 내용 삭제)

//     createMinions();  // 새로운 쫄 생성
//     updateMinions();  // 쫄들 업데이트
//     removeDeadMinions();  // 죽은 쫄들 제거

//     requestAnimationFrame(gameLoop);  // 다음 프레임 요청 (애니메이션 루프)
// }

// // 게임 루프 시작
// gameLoop();
