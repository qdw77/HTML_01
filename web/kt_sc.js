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

//
// 클리어 수정
let clear_video=document.getElementById("clear_mp4_TK");
let clear_boss=document.getElementById("Video_img_clear");

// 게임 오버 수정
let over_video=document.getElementById("over_mp4_TK");
let over_player=document.getElementById("Video_img_over");


// UI
let GameSkill=document.getElementById("Game_Skill");

// HP
// let life=5;
let life=document.getElementsByClassName("life");

// 보스 시간
let Boss_time=document.getElementById("time_limit");
let bossTimer=0; 
// 리얼리티 스톤 t/f
// let Reality_stone=false;
// let boss_timerStart=false;

// 보스 hp
let Boss_Hp=document.getElementById("life_boss");

//여기 수정
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
      intro_video.style.display ="none";
      // 타이머
      timerBoss();
      // 리얼리티스톤 호출
      // start_Boss_PhaseA();
      // 쫄몹 소환
      // mob_Loop();
      
   },6000);
   // //8초 후 원상복귀
   // setTimeout(function(){
   //    clear_mob();
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

// 스킬 수정

window.addEventListener("keydown",(e)=>{
   if (e.key==='k') {
      console.log("k성공");
      // 여기에 스킬A 함수 호출 
   }
});

//여기 클리어 / 게임오버 추가하긴 했음
function onDeath() {
  console.log("보스가 쓰러졌습니다!");
  clear_video.style.objectFit="cover";
  clear_video.style.display="block";
  intro_video.style.display="none";
  intro.style.display="block";
  clear_video.play();
   setTimeout(()=>{
    alert("게임 클리어!");
    location.reload(); // 게임 재시작(새로 고침)
   },8000);
}

function gameOver() {
   console.log("게임 오버!");
   over_video.style.objectFit="cover";
   over_video.style.display="block";
   intro_video.style.display="none";
   intro.style.display="block";
   over_video.play();
   setTimeout(()=>{
      alert("💀 게임 오버! 💀");
      location.reload(); // 게임 재시작(새로 고침)
   },8000);
   // location.reload(); // 게임 재시작(새로 고침)
}

document.getElementById("clear_Boss_btn").addEventListener("click", function () {
    onDeath();
});

document.getElementById("over_btn").addEventListener("click",function(){
   gameOver();
})

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

// // 리얼리티 스톤 180도 회전
// function start_Boss_PhaseA() {
//    if (!Reality_stone){
//       Reality_stone=true;

//       // 캔버스 gameCanvas
//       let Game_canvas=document.getElementById("gameCanvas");

//       // 이거는 깜빡이는 애니메이션 / opacity 투명도 ease-out 속도? 그런거
//       Game_canvas.style.transition="opacity 0.5s ease-out";
//       Game_canvas.style.opacity=0;
//       start_boss= setTimeout(function() {
//          // 원래대로 돌아오는 것
//          Game_canvas.style.opacity=1;
//          // 이게 회전
//          Game_canvas.style.transform = "rotate(180deg)";
//       },500);

//    }
// }


// 원래대로 되돌아가는 것
// function Stop_Boss(){
//    //혹시 몰라서 clear 필요할까봐 주석으로라도 달아놓음
//    // clearTimeout(start_boss);
//    // 깜빡이는 거, 투명도 및 속도
//    Game_canvas.style.transition="opacity 0.5s ease-out";
//    Game_canvas.style.opacity=0;
//    setTimeout(function(){
//       //원상복귀
//    Game_canvas.style.opacity=1;
//    Game_canvas.style.transform="rotate(360deg)";
//    },500);
// }



// //경험치 수정
// // 초기 변수 설정
// let currentLevel = 1; // 현재 레벨
// let currentExp = 0; // 현재 경험치
// let maxExp = 100; // 레벨업 필요 경험치

// // 경험치를 추가하는 함수
// function addExperience(expAmount) {
//     if (currentExp >= 10) return; // 최대 레벨 제한

//     currentExp += expAmount; // 경험치 추가

//     // 경험치가 최대치를 넘으면 레벨업
//     while (currentExp >= maxExp) {
//          currentExp -= maxExp; // 초과한 경험치는 다음 레벨로 이월
//          levelUp();
//     }
//     updateExpBar(); // 경험치 바 업데이트
// }

// // 경험치 바 업데이트 함수
// function updateExpBar() {
//     let expPercentage = (currentExp / maxExp) * 100;
//     expBar.style.width = expPercentage + '%'; // 경험치 바 채우기
// }

// // 레벨 업 함수
// function levelUp() {
//    if (currentLevel>=10) return; 

//     currentLevel++; // 레벨 증가
//     levelDisplay.innerText = "레벨: "+currentLevel; // 현재 레벨 표시 업데이트

//     // 레벨에 따라 스킬 아이콘 표시
//     if (currentLevel >= 1) {
//         Skill.style.display = 'block'; // 기본 스킬 아이콘 활성화
//     }
//     if (currentLevel >= 5) {
//        Skill.style.display = 'none';
//         SkillA.style.display = 'flex'; // 레벨 5 이상에서 스킬 A 활성화
//     }
//     if (currentLevel >= 10) {
//         SkillB.style.display = 'flex'; // 레벨 10 이상에서 스킬 B 활성화
//     }
// }

// // 버튼으로 경험치 추가 테스트 (HTML에 버튼이 있어야 함)
// document.getElementById("expButton").addEventListener("click", function () {
//     addExperience(100); // 클릭할 때마다 경험치 20 추가
// });

// // let inputSkill=document.querySelector('#SK_a');
// // inputSkill.addEventListener


// window.addEventListener("keyup",(e)=>{
//       if (currentLevel>=5) {
//          if (e.key==='k') {
//             console.log("k종료");
//          }
//       }

//       if (currentLevel>=10) {
//          if (e.key==="m") {
//             console.log("m종료");
//          }
//       }
// })

// function Skill_click(){
//    if () { // k 키
//       if (currentLevel >= 5) {
//          // 여기에 A 스킬 호출
//          console.log("A성공");
//       }
//    } else if(window.event.keyCode==77){ // m 키
//       if (currentLevel>=10) {
//          // 여기에 B 스킬 호출
//          console.log("B성공");
//       }
//    }kkkkk
// }

// // 적 담는 곳
// let soldiers = [];

// class Minion {

//       constructor() {
//           // x 위치는 0부터 캔버스의 가로 길이 사이에서 랜덤하게 결정
//           this.x = Math.random() * (WidthMap - 40);  // 쫄의 가로 크기(40px)을 제외한 범위에서 랜덤 x값을 설정
//           this.y = -50;  // 쫄은 화면 위쪽(-50)에서부터 시작
//           this.width = 40;  // 쫄의 가로 크기
//           this.height = 40;  // 쫄의 세로 크기
//           this.speed = Math.random() * 2 + 0.5;  // 쫄의 속도는 0.5 ~ 1.5 사이로 랜덤하게 설정
//           this.isAlive = true;  // 쫄이 살아있는지 여부
//           this.spacing = Math.random() * 150 + 50; // 각 쫄의 떨어지는 간격을 설정 (최소 50px, 최대 150px)
//       }

//       moveMob(){
//          this.y += this.speed;  // Y축으로 속도만큼 내려감

//          // 화면 아래로 나가면 사망 처리
//          if (this.y > Height) this.isAlive = false;  // Y 값이 화면 높이를 초과하면 사망 처리
//       }

//       drawMob() {
//           ctx.fillStyle = 'blue';  // 쫄의 색상은 빨간색
//          // let img = new image();
//          // img.src=''
//           ctx.fillRect(this.x, this.y, this.width, this.height);  // 쫄을 캔버스에 그리기
//       }
// }

// class Minionbullet{
//    constructor(x, y, angle, speed){
//      this.x = x;
//      this.y = y;
//      this.angle = angle;
//      this.speed = speed;
//      this.time = 0;
//      this.size = 8;
//    }

//    M_move(){
//      this.x += Math.cos(this.angle) * this.speed;
//      this.y += Math.sin(this.angle) * this.speed;
//    }

//    M_draw(ctx){
//       // 총알 이미지
//       ctx.drawImage();
//    }
// }

// function createSoldier(){
//    let numSoldiers=Math.floor(Math.random()*2)+1
//    for (let i =0; i<numSoldiers; i++){
//       let newSoldiers =new Minion();
//       let canCreate = true;

//       for (let j =0; j<soldiers.length; j++){
//          if(Math.abs(soldiers[j].y-newSoldiers.y)<50){
//             canCreate=false;
//             break;
//          }
//       }
//       if(canCreate){
//          soldiers.push(newSoldiers);
//       }
//    }
// }

// function updateSoldiers(){
//    soldiers.forEach(soldier=>{
//       soldier.moveMob();
//       soldier.drawMob();
//    });
// }

// function removeSoldier(){
//    soldiers=soldiers.filter(soldier=>soldier.isAlive);
// }

// function mob_Loop(){
//     ctx.clearRect(0, 0, WidthMap, Height);

//     updateSoldiers();
//     removeSoldier();

//     requestAnimationFrame(mob_Loop);
// }

// Mob_out=setInterval(function() {
//    createSoldier();  // 새로운 쫄 생성
// }, 1000);

// function clear_mob(){
//    clearInterval(Mob_out);
// }


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
