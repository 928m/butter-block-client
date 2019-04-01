# BUTTER BLOCK

## Features

__3D 큐브를 이용한 그림 맞추기 게임__

- 닉네임 입력후 입장 기능 구현 (3명으로 인원수 제한)

- 3번째 유저 입장시 게임시작

- 그림그리는 유저와 문제푸는 유저 구분

- 문제 출제자인 경우 

  마우스 클릭이벤트 발생시 큐브 생성기능 추가

  큐브의 색상 선택 기능 추가

  채팅창에 정답 입력시 정답처리되지 않도록 처리



- 문제 푸는 유저인경우

  마우스 클릭이벤트 발생시 큐브 생성 불가

  큐브의 색상선택 영역 삭제

  채팅창에 정답 입력시 정답처리

- 타이머기능

- 제한시간내에 아무유저도 정답을 맞추지 못하면 다음유저, 다음문제로 넘어가도록 처리

- 문제 정답시 정답을 맞춘 유저의 닉네임 및 정답을 팝업에 노출

- 문제 정답시 정답을 맞춘 유저의 점수 상승

- 한 유저당 3문제씩 제출했을시 게임종료

- 점수를 기준으로 순위판별



## Installation

__Client__

```
https://github.com/minjihee89/butter-block-client.git
cd butter-block-client
npm install
npm start
```



__Server__

```
https://github.com/minjihee89/butter-block-server.git
cd butter-block-server
npm install
node index.js
```


## Skills

__FrontEnd__

- ES2015+
- React
- Redux
- Sass
- Styled Component
- Three.js
- Socket.io client



__BackEnd__

- Node.js
- Express
- Socket.io



## Version control and collaboration

- Trello 스케쥴 관리 및 Task 배분
- git and GitHub



## deployment

- Netlify
- AWS Elastic Beenstalk (배포중)



## Challenges

- Three.js를 사용하면서 3D에대한 개념이 없는 상태에서 작업하려니 막막했습니다. 구현하려고하는 기능은 예제가 잘 나와있어 어려움 없이 진행 할 수 있었습니다. 전반적으로 어떤식으로 돌아가는지 이해하고 작업하였습니다. 하지만 완벽하게 알고 작업했다고 하기는 부족하다고 생각하여 앞으로 조금더 공부 할 예정입니다.
- socket을 사용하면서 세세하게 모든 액션에 대하여 분리해줘야 했습니다. 그래서 작업을 하던 도중에 추가하게 되는 부분이나 수정하게 되는 부분이 많았습니다. 아직 room을 나누는 기능을 추가하지 않아 room추가시 이러한 부분을 고려하여 작업하려 합니다.
- 마우스 오른쪽 버튼 클릭시 큐브가 지워지는 로직을 구현하기 위해 Three.js에서 해당 큐브가 지워졌다는 데이터를 소켓에 넘겨줘야했습니다. 어떤식으로 지워지는 큐브의 정보를 소켓에 전달해야할지 감이 잡히지 않아 여러가지 방법으로 접근해 보았지만 생각했던것과는 다르게 진행되었습니다. cube객체가 scene에 삭제되는 로직을 다시 보면서,  scene에서 삭제할 타겟객체의 index번째의 cube객체를 삭제하고 다시 랜더하는 형식으로 삭제하는 cube객체의 index를 소켓에 전달하여 간단하게 큐브가 삭제되는 기능을 구현할수 있었습니다.



## Things to do

- client 소켓관련 로직 분리
- socket room만들기
- 게임도중 유저가 disconnect되었을때 상황 처리
- 게임 종료후 상황 처리
- 순위 판별로직 디테일하게 처리
- 채팅관련 클라이언트 로직 수정
- audio관련 파일 처리
- Three.js 용량처리
- circle ci 배포자동화


## Sincere Thanks

Ken Huh / Vanilla Coding

