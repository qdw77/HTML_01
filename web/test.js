const WidthMap =1500;
const Height = 800;

// 캔버스 이름/2d로
let canvas=document.getElementById("gameCanvas");
let ctx=canvas.getContext("2d");

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

// 보스 시간 / 시간에 따라 줄어들도록 
let Boss_time=document.getElementById("time_limit");
let bossTimer=0; 
let Reality_stone=false;

// 점수
let game_score=document.getElementById("score");
// 게임 화면 조정 후 주석 해제
intro_video.style.objectFit="cover";

// 게임 화면 조정 후 주석 해제
function StartMap() {
	Start_Img.style.display = "none";
	intro_video.play();

	setTimeout(function(){
		intro.style.display ="none";
        timerBoss();
	},6000);
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


let bullets = []; //총알 저장
let meteo = []; // 메테오 저장
let soulBullets = []; //소울 스톤 총알
let isRotating = false; // 회전 상태 저장
let rotationAngle = 0; // 회전 각도
let selectedStone = null; // 선택된 스톤 저장
let stoneGlow = 0;
let glowing = true;
let isFlipped = false; // 맵이 뒤집혔는지 여부

let PlayerBullet = []; //player 총알을 저장할 리스트
let PlayerItemList = []; //아이템을 먹었을 때 저장할 리스트 

//아이언맨 이미지.
const IronManImage = new Image();
IronManImage.onload = () =>console.log('이미지가 구현되었습니다.');
IronManImage.src = "images/IronMan1.png";

//아이언맨 총알에 대한 이미지.
const PlayerBulletImage = new Image();
PlayerBulletImage.onload = () => console.log("이미지 구현");
PlayerBulletImage.src = "Playerbullet.png";

// 타노스 이미지
const ThanosImage = new Image();
ThanosImage.src = "images/Thanos.png";


// 건틀렛 이미지
const gauntletImage = new Image();
gauntletImage.src = "images/gauntlet.png";


//운석 이미지
const meteoImage = new Image();
meteoImage.src = "images/meteo.png";


//스페이스 스톤 효과
const spaceEffect = new Image();
spaceEffect.src = "images/space_effect.png";

// 인피니티 스톤 효과 이미지
const stoneImages = {
    mind: new Image(),
    reality: new Image(),
    soul: new Image(),
    time: new Image(),
    power: new Image(),
    space: new Image()
};


stoneImages.mind.src = "images/mind.png";
stoneImages.reality.src = "images/reality.png";
stoneImages.soul.src = "images/soul.png";
stoneImages.time.src = "images/time.png";
stoneImages.power.src = "images/power.png";
stoneImages.space.src = "images/space.png";


// 인피니티 스톤 크기
const stoneSize = 100;


// 건틀렛 크기
const gauntletWidth = 595 * 0.2;
const gauntletHeight = 1119 * 0.2;


// 타노스 크기
const ThanosWidth = 571 * 0.7;
const ThanosHeight = 389 * 0.7;


let ThanosX = canvas.width / 2 - ThanosWidth / 2; // 중앙 정렬


//아이언맨 객체
const Player  = {
    x : canvas.width /2-20, //캔버스 안에 플레이어 x좌표 
    y : canvas.height-170, //캔버스 안에 플레이어 y좌표
    width : 360 *0.3,    // 이미지 너비
    height : 450 *0.3,     //이미지 높이
    hp: [10000,10000,10000,10000,10000],//플레이어의 기본 체력
    speed : 5,                 //플레이어의 기본 스피드값
    moveLeft: false,          // 왼쪽으로 옮겨질지에 대한 여부값
    moveRight :false,         //오른쪽으로 옮겨질지에 대한 여부값
    moveUp:false,             // 위쪽으로 옮겨질지 대한 여부값
    moveDown:false,          //
  };

  //아이언맨 캔버스 위에 이미지 그려주는 함수
function Playerdrawing(){ 
    console.log("그려짐");
    ctx.drawImage(IronManImage,Player.x,Player.y,Player.width,Player.height);
};

//플레이어에 대한 위치
function PlayerUpdate() {
    
    if (Player.moveLeft && Player.x > 0) {
        Player.x -= Player.speed;} 
    else if (Player.moveRight && Player.x + Player.width < canvas.width) {
        Player.x += Player.speed;
    } 
    else if (Player.moveUp && Player.y > 0) {
        Player.y -= Player.speed;
    } 
    else if (Player.moveDown && Player.y + Player.height < canvas.height) {
        Player.y += Player.speed;
    }
}

window.addEventListener("keydown", (e)=>{
//왼쪽으로 움직였을 때
    if(e.key =="ArrowLeft"){
        Player.moveLeft = true;}
    
    //오른쪽으로 움직였을 때
    else if(e.key == "ArrowRight"){
        Player.moveRight = true;}
    
    // 상위쪽으로 올라갈 때
    else if(e.key == "ArrowUp"){
        Player.moveUp = true;}

    // 하위쪽으로 올라갈 때 
    else if(e.key== "ArrowDown") {
        Player.moveDown = true;} 
    });
   
   
//키보드들 뗐을 때 이벤트
window.addEventListener("keyup", (e)=>{
    
    if(e.key =="ArrowLeft"){
    Player.moveLeft = false;}
    //오른쪽으로 움직였을 때
    else if(e.key == "ArrowRight"){
    Player.moveRight = false;}
    
    // 상위쪽으로 올라갈 때
    else if(e.key == "ArrowUp"){
    Player.moveUp =false;}

    // 하 
    else if(e.key== "ArrowDown") {
    Player.moveDown = false;} 

});
   
   
//총알을 공격할 때  
window.addEventListener("keydown" ,(e) => {
    
    //키보드를 공격할 때 
    if (e.key == "Enter"){
    console.log('확인');  
    Bullet.draw();//총알 이미지 그리기 
    Bullet.shoot();//총 이미지 쏘기
    PlayerBullet.push(Bullet); //총알에 대한 거 PlayerBullet의 리스트에 총알을 추가한다

    };

});

//기본 총알 클래스
class Bullet {
    constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.time = 0;
        this.size = 8;
    }

    move() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    draw() {
        ctx.fillStyle = "pink";
        ctx.beginPath();
        ctx.arc(this.x, this.y-30, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

//운석 클래스
class Meteorite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 30; // 크기 랜덤
        this.dy = Math.random() * 3 + 1; // 속도 랜덤
        this.exploded = false; // 폭발 여부 체크
        this.explosionTime = 0; // 폭발 후 유지 시간
    }

    move() { //아래로만 떨어짐
        if (!this.exploded) {
            this.y += this.dy;
        }
    }

    explode() { // 터졌을때
        let numBullets = 10; // 폭발 시 발사할 총알 개수
        for (let i = 0; i < numBullets; i++) {
            let angle = (Math.PI * 2 * i) / numBullets; // 360도 방향으로 총알 배치
            let speed = 2;
            bullets.push(new Bullet(this.x, this.y, angle, speed)); // 폭발 총알 추가
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.fillStyle = "brown";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        else {
            if (this.explosionTime === 0) {
                this.explode();
            }

            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();

            this.explosionTime++;
            if (this.explosionTime > 100) {
                return true; // 폭발 후 제거
            }
        }
        return false;
    }

    checkCollision() {
        if (this.y + this.size >= canvas.height) {
            this.exploded = true; // 바닥에 닿으면 폭발
            return true;
        }
        return false;
    }
}

//소울 스톤
class SoulBullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.dy = 1;
        this.hasExploded = false;
        this.explosionTime = 0;
        this.angle = 0;
    }

    move() {
        if (!this.hasExploded) {
            this.y += this.dy;
            if (this.y >= canvas.height/2) {
                this.hasExploded = true;
            }
        }
    }

    draw() {
        if (!this.hasExploded) {
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

        }
        else {
            let numBullets = 12;
            let radius = this.explosionTime;
            for (let i = 0; i < numBullets; i++) {
                let set_angle = (Math.PI * 2 * i) / numBullets;
                let bulletX = this.x + Math.cos(set_angle + this.angle) * radius;
                let bulletY = this.y + Math.sin(set_angle + this.angle) * radius;
                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.arc(bulletX, bulletY, 6, 0, Math.PI * 2);
                ctx.fill();
            }
            this.angle += 0.005;

            this.explosionTime++;

            if (this.explosionTime > 1000) {
                return true;
            }
        }
        return false;
    }
}



// 보스 클래스
class Boss {
    constructor(x, y) {
        this.x = x; // 보스 X 좌표
        this.y = y; // 보스 Y 좌표
        this.hp = 10000; // 보스 체력
        this.phase = 1; // 보스 페이즈
        this.attackPattern = ["mind", "soul", "time", "power", "reality","space"]; // 인피니티 스톤 패턴
        this.width = ThanosWidth;
        this.height = ThanosHeight;
        this.movePattern = Math.floor(Math.random() * 3) + 1;
        this.shootCooldown = 0;
        this.meteorCooldown = 0;
        this.soulCooldown = 0;
    }


    // 보스 이동


    // 보스 이동 패턴 1 (좌우 이동)
    move1() {
        this.x += Math.sin(Date.now() / 1000) * 1;
        // console.log(this.x);
    }


    // 보스 이동 패턴 2 (위아래 이동)
    move2() {
        this.y += Math.sin(Date.now() / 500) * 1;
    }

    // 보스 이동 패턴 3 (대각선 이동)
    move3() {
        this.x += Math.sin(Date.now() / 500) * 1;
        this.y += Math.cos(Date.now() / 500) * 1;
    }


    // 기본 총알
    shoot() {
        if (this.shootCooldown <= 0) {
            let numBullets = 36; // << 한 번에 발사할 총알 개수
            for (let i = 0; i < numBullets; i++) {
                let angle = (Math.PI * 2 * i) / numBullets; //총알 각도
                let speed = 1; // 총알 속도
                bullets.push(new Bullet(this.x + this.width / 2, this.y + this.height, angle, speed));
            }
            this.shootCooldown = 400;
        } else {
            this.shootCooldown--;
        }
    }

    //파워스톤사용
    usePowerStone() {
        if (this.meteorCooldown <= 0) {
            for (let i = 0; i < 5; i++) {
                let meteorX = Math.random() * canvas.width;
                meteo.push(new Meteorite(meteorX, -50));
            }
            this.meteorCooldown = 1000;
        } else {
            this.meteorCooldown--;
        }
    }

    //소울스톤 사용
    useSoulStone() {
        if (this.soulCooldown <= 0) {
            soulBullets.push(new SoulBullet(this.x + this.width / 2, this.y + this.height));

            this.soulCooldown = 300; // 다음 공격까지 쿨타임 설정
        } else {
            this.soulCooldown--;
        }
    }

    //리얼리티 스톤 사용
    useRealityStone() {
        if (this.isUsingRealityStone) return;
    
        this.isUsingRealityStone = true;
        let originalWidth = canvas.width;
        let duration = 5000;

        canvas.style.transition = "width 4s ease-in-out"; // 부드러운 변화
        canvas.style.transition = "width 2s ease-in"
        canvas.style.width = "600px";
        canvas.style.height = "800px";
        
        //10초 후 원래 크기로 복구
        setTimeout(() => {
            canvas.style.width = originalWidth + "px"; // 원래 크기로 복구
            setTimeout(() => {
                this.isUsingRealityStone = false;
            }, 5000);
        }, duration);
    }

    //스페이스 스톤사용
    // useSpaceStone(){
        
    // }
    
    
    // 랜덤 스톤 선택
    chooseRandomStone() {
        const randomIndex = Math.floor(Math.random() * this.attackPattern.length);
        selectedStone = this.attackPattern[randomIndex]; // 스톤 고정
        console.log(`선택된 스톤: ${selectedStone}`);
        return selectedStone;
    }






    // 보스 & 건틀렛 그리기
    draw() {
        ctx.save(); // 현재 캔버스 상태 저장


        // 건틀렛 회전
        let gauntletX = this.x + 240;
        let gauntletY = this.y - 20;
        ctx.translate(gauntletX + gauntletWidth / 2, gauntletY + gauntletHeight / 2);
        ctx.rotate(rotationAngle * Math.PI / 180); // 각도를 라디안 값으로 변환
        ctx.translate(-gauntletX - gauntletWidth / 2, -gauntletY - gauntletHeight / 2);
        ctx.drawImage(gauntletImage, gauntletX, gauntletY, gauntletWidth, gauntletHeight);
        ctx.restore(); // 캔버스 상태 복원


        //타노스 그리기
        ctx.drawImage(ThanosImage, this.x, this.y, this.width, this.height);


        //선택된 스톤을 건틀렛 위에 표시
        if (selectedStone) {1
            ctx.globalAlpha = stoneGlow;
            if (selectedStone === "mind"){
                ctx.drawImage(stoneImages[selectedStone],gauntletX+1,gauntletY+30,stoneSize,stoneSize);
            }
            else if (selectedStone === "power"){
                ctx.drawImage(stoneImages[selectedStone],gauntletX+30,gauntletY+5,stoneSize,stoneSize);
            }
            else if (selectedStone === "reality"){
                ctx.drawImage(stoneImages[selectedStone],gauntletX-8,gauntletY+5,stoneSize,stoneSize);
            }
            else if (selectedStone === "space"){
                ctx.drawImage(stoneImages[selectedStone],gauntletX+12,gauntletY+5,stoneSize,stoneSize);
            }
            else if (selectedStone === "time"){
                ctx.drawImage(stoneImages[selectedStone],gauntletX+60,gauntletY+55,stoneSize,stoneSize);
            }
            else if (selectedStone === "soul"){
                ctx.drawImage(stoneImages[selectedStone],gauntletX-23,gauntletY+5,stoneSize,stoneSize);
            }
            ctx.globalAlpha = 1;
        }
    }


    // 보스 상태 업데이트
    update() {
        setTimeout(() => {
            this.movePattern = 1;
            console.log(this.movePattern);
        }, 5000);
   
        setTimeout(() => {
            this.movePattern = 2;
            console.log(this.movePattern);
        }, 10000);
   
        setTimeout(() => {
            this.movePattern = 3;
            console.log(this.movePattern);
        }, 15000);


        if (this.movePattern === 1) {
            this.move1();
        }
        else if (this.movePattern === 2) { 
            this.move2();
        }
        else {
            this.move3();
        }
        
        this.shoot();


        if (selectedStone === "power") {
            this.usePowerStone();
        }
        if (selectedStone === "soul") {
            this.useSoulStone();
        }
        if (selectedStone === "reality") {
            this.useRealityStone();
        }
        // if (selectedStone === "space"){
        //     this.useSpaceStone();
        // }
        
    }
}


// 보스 객체 생성
let boss = new Boss(canvas.width / 2 - ThanosWidth / 2, 50);
let mete = new Meteorite(canvas.width / 2 - ThanosWidth / 2, 50);


// 임시 이벤트 (회전 및 스톤 선택)
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        isRotating = true;
        selectedStone = null;
    }
});
 
window.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
        isRotating = false;
        rotationAngle = 0;
        boss.chooseRandomStone();
    }
});


function glow(){
    if (glowing){
        stoneGlow += 0.05;
        if (stoneGlow >= 3){
            glowing = false;
        }
    }
    else{
        stoneGlow -= 0.05;
        if (stoneGlow <=0.05){
            glowing = true;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    PlayerUpdate();
    Playerdrawing();
    
    boss.update();
    boss.draw();

    // 기본 총알
    bullets.forEach((bullet) => {
        bullet.move();
        bullet.draw();
    });

    //운석
    meteo.forEach((mete, index) => {
        mete.move();

        if (mete.checkCollision() && !mete.exploded) {
            mete.exploded = true;
        }

        if (mete.exploded && mete.explosionTime >= 20) {
            meteo.splice(index, 1); // 폭발 후 제거
        } else {
            mete.draw();
        }
    });

    //소울 스톤
    soulBullets.forEach((bullet, index) => {
        bullet.move();
        if (bullet.draw()) {
            soulBullets.splice(index, 1); // 폭발 후 제거
        }
    });

    if (isRotating) {
        rotationAngle += 10;
    }

    glow();
    requestAnimationFrame(gameLoop);
}





// 게임 시작
gameLoop();




