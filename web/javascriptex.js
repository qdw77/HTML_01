function over(obj){
	// obj<매개변수 src
	obj.src="샴.jpg";
}	


function out(obj){
	obj.src="먼치킨.jpg";
}


// document.write("<h3>AAAAAAAAAA외부 스크립트 document.write로 작성</h3>");
// // head에 작성 시 맨 위로 / body에 작성 시 맨 아래로
// console.log("123 console.log 작성");
// // console.log < print 처럼 오류 점검
// let ret=prompt("이름","박");
// if (ret==null) {
// 	console.log("null case");
// }
// else if(ret==""){
// 	console.log("문자열 입력 없이 확인을 누른 경우(empty)");
// }
// else{
// 	console.log(ret);
// }
// 문법 형태가 자바와 같음

// alert("입력이 되지 않았습니다.");
// confirm("확실합니까?");
// confirm("질문 a b"); true/false

// js 변수 데이터 타입
// a_1 a1 aa A a
// 문장의 구분 ;
// 주석문 //
// 자바스크립트의 데이터 타입
// 숫자타입/논리타입/문자열타입/객체타입/null(참조 값이 없음)


// 변수 선언
// let / var /const 사용 가능
// var는 자바스크립트 언어 도입 시점부터 존재하던 변수 선언 타입
// ECMAscript es6 시점 이후에 let / const가 생겨남

// 변수의 범위

// 전역 변수: 함수 밖에서 선언하거나 var/let 키워드 없이 아무 곳에서 선언된 변수
// 전역 변수는 프로그램 실행시점부터 종료 시점까지 살아있는 변수이다.
// 프로그램 전역적으로 접근하여 사용할 수 있음


// 지역 변수
// 함수 내에서 var/let 키워드로 선언된 변수, 함수가 시작되면 생성되고 함수가 종료되면 소멸
// 함수 내에서만 사용 가능

// 블록 변수
// let키워드로 if/while/for 등 블록(스코프) 내에서 선언된 변수, 블록 내에서만 사용, 블록이 끝나면 사라짐
// 블록이 끝나면 사라지므로 블록 밖에서는 접근불가
// let으로 선언된 변수는 암시적으로 전역 객체에 속하지 않음(무조껀은 아님)/ 지역&블록 변수 만들 떄 적합

// let x;
// // 전역 변수 x선언 , var로 선언해도 동일
// function f(){ // 함수 f 정의
// 	let y; // 함수 내 지역 변수 y선언, var로 선언해도 동일
// 	x=10; // 전역 변수 x 10 초기화
// 	y=20; // 지역 변수 y 값 재할당
// 	z=30; // 전역 변수 z 선언 및 30 초기화(처음 생겨서)
// 	if(y==20){ // 지역 변수 y
// 		let b=40; // 블록 변수 b 선언 및 초기화
// 		b++; // 블록 변수 값 +1 처리
// 	}
// 	// 1. b제외 전부 접근 가능
// }
// // 2. x와 z 접근 가능



// var x=10; // 전역 변수 x 선언
// function xx(){
// 	var x; // 지역 변수 x 선언
// 	x=1; // 지역 변수 값 할당
// 	this.x=100; // 전역 변수 x에 100할당
// 	// 여기 this는 전역 변수
// }

//let으로 선언된 전역변수는 this로 접근 불가


//var로 선언된 전역 변수: var로 선언된 전역 변수는 전역 객체의 속성으로 저장된다.
// 브라우저 환경에서 전역 객체란? => window 객체
// BOM / DOM < 객체화?
// window.
// https://velog.io/@juhan/DOM%EC%9D%B4%EB%9E%80  < 윈도우 객체&DOM
// console.log(window.document);
// console.log(window.location);
// console.log(window.name);

// 여기선 html 사용 불가 객체화된 무언가를 사용/ 그거에 따라 작성

// var로 선언된 전역변수: var로 선언된 전역변수는 전역 객체의 속성으로 저장된다.
// 브러우저 환경애서 전역 객체란? -> window 객체이고 this로 접근, window과 this 같다
// var로 선언된 전역변수 window 객테 프로퍼티로 저장 -> this 가능

var globalvar=100;
console.log(this.globalvar);
console.log(this.location);

// var와 let의 작동상 차이점
// var는 동일한 변수를 재선언 할 수 있음
// let은 동일한 변수를 재선언 할 수 없음
// let은 변수의 사용범위를 블록으로 제한
// var은 제한 없음

// const는 상수로 변하지 않는 값(최종값)을 가지는 키워드
const MAX=10;
// const 상수는 대문자 식별자 이름
// 상수는 값 변경 x
// 상수는 재선언 x
// 상수는 선언된 블록 내에서만 사용


// 리터럴: 값
// 자바스크립트에서 리터럴 타입 종류
// 정수 8진수 10진수 16진수
// 실수
// 논리
// 문자열
// null: 값이 없음을 뜻
// NaN: 수가 아님을 뜻


// 연산자: 자바와 동일
// --a 
// a--

// 논리 or -> || / and -> && / not -> !




// 기본 문법은 for if while dowhile function 등 기본 문법은 자바와 동일하다


// 자바스크립트의 객체
// 1. 코어 객체: Array/Date/Atring/Math 코어객체 생성 시 new 키워드 사용 
// > import datetime 등
let today=new Date();
let msg=new String("안녕하세요");
// 객체에 대한 접근: .을 찍어서 접근
// 객체 프로퍼티와 메서드가 있음
// 자바스크립트에서는 객체의 소명 방법 없음
// 가비지컬렉터에 의해 자동 소명, 자동 관리 됨

// Array객체
let arr=["A","B"];
let n=[1,2,3];
// 인덱스로 접근 가능
arr[0]="C"; // 인덱스 통한 접근 후 값 변경
// for(초기값,어디까지,증감식) 자바와 동일
let a= new Array("1","2","3","4");
let b= new Array(7);
// 7칸 짜리 배열 제작
b[0]="1";
let c=new Array(); // 빈 배열 생성

// 배열의 length프로퍼티: 배열 요소 수 리턴
// 배열에는 여러 타입 데이터가 섞여 저장될 수 있음


// Array 객체의 주요 메서드

// concat() 배열 이어 붙이기
// join([sparator]) 배열의 모든 원소를 연결하여 하나의 문자열로 리턴
// reverse() 뒤집는다 
// slice() 자른다
// sort() 정렬한다
// toString() 요소를 모두 연결해서 문자열로 만들어 리턴


// Date객체
// Date객체는 시간 정보를 담는 객체
// new 키워드로 생성
// 실제 Date객체 생성된 시간 정보(코드가 실행된 시점)
// let d= new Date(2024,11,1); //24년도 11월 1일
// let now = new Date(); // 현 시점 객체 생성
// let date = now.getDate(); // 날짜 값 리턴
// let hour= now.getHours(); // 시간 값 리턴
// getFullYear()4자리 연도 리턴
// getMonth() 0~11 사이 월 값 리턴
// getDate() 한달 내 날짜 리턴 1~31
// getDay() 한주 내 요일 값을 정수 형태로 리턴 0=일요일 6=토요일
// getTime() UTC 기준 경과 초

// Math 객체
// Math 객체의 주요 메서드
// abs()절대값
// sin()
// cos()
// random(): 0~1 사이 임의 실수 리턴
// floor(x): x보다 작거나 같은 수 중 가장 큰 수 리턴
// round(x): x 반올림한 수
// sqrt(x): x의 제곱근 리턴

// eval()함수: 문자열로 구성된 수식의 연산 결과 리턴
// eva("7*7")하면 리턴 49옴

// random
// 사용 prompt("")

// prompt("랜덤A * 랜덤B");

// var / let
ra= Math.random();

// 2. DOM 객체

// document.getElementById();
// document.body.style.backgroundColor='red';
// 위 문장을 if문 내 실행문으로 활동해서 현재 시간이 짝수초면 바디를 빨간 색으로 홀수초면 파란색으로 표현하세요
// if 짝수

let now = new Date();
// 현재 날짜,시간 등의 값
let hour = now.getHours();
// 시간 값만
if(hour/2 == 0){
	console.log(hour)
	document.body.style.backgroundColor='red';
}else{
	console.log(hour)
	document.body.style.backgroundColor='#5ABEFF';
}
// 

// 3. BOM 객체
// 4. window 객체







