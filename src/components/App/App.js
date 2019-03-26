import React, { Component, Fragment } from 'react';
import './App.scss';
import Login from '../block/Login';
import Cube from '../elements/Cube';
import styled from 'styled-components';
import * as THREE from 'three';
import threeOrbitControls from 'three-orbit-controls';
import defaultShape from './defaultShape';
import bgSound from '../../audio/bg.mp3';
import correctSound from '../../audio/correct.mp3';
import createCubeSound from '../../audio/createCube.mp3';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubes, faCrown, faSyncAlt, faPalette, faEraser, faUserEdit } from '@fortawesome/free-solid-svg-icons'

const OrbitControls = threeOrbitControls(THREE);

library.add(faCrown);
library.add(faCubes);
library.add(faSyncAlt);
library.add(faPalette);
library.add(faEraser);
library.add(faUserEdit);

class ThreeScene extends Component{
  constructor(props) {
    super(props);

    this.end = this.end.bind(this);
    this.init = this.init.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onDown = this.onDown.bind(this);
    this.screenRemove = this.screenRemove.bind(this);
    this.quizScreenRender = this.quizScreenRender.bind(this);
    this.onRemoveCube = this.onRemoveCube.bind(this);
    this.on = true;
  }

  componentDidMount(){
    const { socket } = this.props;

    socket.on('cubes', (cubes) => {
      this.quizScreenRender(cubes);
    });

    socket.on('delete cube', (removeIndex) => {
      this.quizScreenRender(null, removeIndex);
    });

    this.init();
    // this.quizScreenRender(defaultShape);
  }

  componentWillUnmount(){
    this.end();
  }

  shouldComponentUpdate(nextProps) {
    const { isStart, isPass, isTimeout } = nextProps;
    const currentTimeout = this.props.isTimeout;
    const currentPass = this.props.isPass;
    const isFirstStart = (this.on && isStart);
    const isPassed = !currentPass && (currentPass !== isPass);
    const isTimedOut = !currentTimeout && (currentTimeout !== isTimeout);

    if (isPassed || isFirstStart || isTimedOut) {
      this.screenRemove();
      this.on = false;

      return true;
    }

    return false;
  }

  end() {
    this.mount.removeChild(this.renderer.domElement);
  }

  init() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.objects = [];
    this.cubes = {};
    //ADD SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xf0f0f0 );

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera( 45, width / height, 1, 10000 );
    this.camera.position.set( 500, 800, 1300 );
    this.camera.lookAt( 0, 0, 0 );

    // roll-over helpers
    this.rollOverGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
    this.rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true , wireframe: false } );
    this.rollOverMesh = new THREE.Mesh( this.rollOverGeo, this.rollOverMaterial );
    // this.scene.add( this.rollOverMesh );

    // cubes
    this.cubeGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
    this.cubeMaterial = new THREE.MeshLambertMaterial( { color: this.props.color } );

    // grid
    const gridHelper = new THREE.GridHelper( 1000, 20, 0xb4c1cb, 0xb4c1cb );
    this.scene.add( gridHelper );

    //
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
    this.geometry.rotateX( - Math.PI / 2 );
    this.plane = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
    this.scene.add( this.plane );
    this.objects.push( this.plane );

    // lights
    this.ambientLight = new THREE.AmbientLight( 0x606060 );
    this.scene.add( this.ambientLight );
    this.directionalLight = new THREE.DirectionalLight( 0xffffff );
    this.directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    this.scene.add( this.directionalLight );
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    // controls
    this.controls = new OrbitControls( this.camera, this.mount );
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.controls.minDistance = 1000;
    this.controls.maxDistance = 5000;

    this.renderScene();
  }

  quizScreenRender(cube, deleteCubeIndex) {
    if (deleteCubeIndex) {
      const deleteCube = this.objects[deleteCubeIndex];

      this.scene.remove(deleteCube);
      this.objects.splice(deleteCubeIndex, 1);
    } else {
      const cubeMaterial = new THREE.MeshLambertMaterial( { color: cube.color } );
      const voxel = new THREE.Mesh( this.cubeGeo, cubeMaterial );

      voxel.position.x = cube.position.x;
      voxel.position.y = cube.position.y;
      voxel.position.z = cube.position.z;

      this.objects.push( voxel );
      this.scene.add( voxel );
    }

    this.renderScene();
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  onMove(event) {
    const { isStart, submissionUserId, id } = this.props;

    if (isStart && (submissionUserId === id)) {
      this.scene.add( this.rollOverMesh );
    }

    this.mouse.set(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.objects);

    if (this.intersects.length > 0) {
      this.intersect = this.intersects[0];
      this.rollOverMesh.position.copy(this.intersect.point).add(this.intersect.face.normal);
      this.rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    }

    this.renderScene();
  }

  onRemoveCube() {
    const { isStart, submissionUserId, id, removeCube } = this.props;

    if (!isStart || submissionUserId !== id) {
      return false;
    }

    if ( this.intersects.length > 0 ) {
      if ( this.intersect.object !== this.plane ) {
        const removeIndex = this.objects.indexOf( this.intersect.object );

        removeCube(removeIndex);
        this.scene.remove( this.intersect.object );
        this.objects.splice( removeIndex, 1 );

        if (this.objects[removeIndex]) {
          const removeCubeId = this.objects[removeIndex].uuid;
          delete this.cubes[removeCubeId];
        }
      }
    }
  }

  onDown(event) {
    const { isStart, submissionUserId, id, createCube } = this.props;

    if (!isStart || submissionUserId !== id) {
      return false;
    }

    this.mouse.set(( event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.objects);
    this.cubeMaterial = new THREE.MeshLambertMaterial( { color: this.props.color } );

    if ( this.intersects.length > 0 ) {
      this.intersect = this.intersects[0];

      const voxel = new THREE.Mesh( this.cubeGeo, this.cubeMaterial );

      voxel.position.copy( this.intersect.point ).add( this.intersect.face.normal );
      voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

      this.scene.add( voxel );
      this.objects.push( voxel );

      this.cubes[voxel.uuid] = {
        position: voxel.position,
        color: this.props.color
      };

      createCube({
        position: voxel.position,
        color: this.props.color
      });

      this.renderScene();
    }
  }

  screenRemove() {
    this.end();
    this.init();
  }

  render() {
    return(
      <Fragment>
        <div className="screen">
          <div
            style={{ width: '100%', height: '100vh' }}
            ref={(mount) => { this.mount = mount }}
            onMouseMove={this.onMove}
            onClick={this.onDown}
            onContextMenu={this.onRemoveCube}
          />
        </div>
      </Fragment>
    )
  }
}

const MessageContent = styled.p`
  display: block;
  position: absolute;
  top: 30%;
  right: 80%;
  z-index: 100;
  padding: 10px 20px;
  font-size: 12px;
  border-radius: 15px 15px 0 15px;
  background: rgba(255, 255, 255, .5);
  color: #181818;
  font-weight: 700;
  animation: message .5s;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  @keyframes message {
    0% { transform: translateY(20px); }
    100% { transform: translateY(0); }
  }
`;

const ChatWrap = styled.div`
  display: block;
  width: 40%;
  height: 50px;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);

  &:before {
    display: block;
    content: 'chat';
    line-height: 50px;
    text-transform: uppercase;
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    color: #000000;
    letter-spacing: 2px;
    position: absolute;
    top: 0;
    left: 20px;
    z-index: 30;
  }

  &:after {
    display: block;
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #000000;
    position: absolute;
    top: 50%;
    left: -3px;
    z-index: 20;
    transform: translateY(-50%);
  }
`;

const ChatInput = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  font-size: 13px;
  padding: 0 30px 0 70px;
  box-sizing: border-box;
  border-radius: 15px;
  font-weight: 500;
  color: #999999;
  background: rgba(255, 255, 255, .8);
  box-shadow: 0 3px 5px rgba(0, 0, 0, .05);
  position: relative;
  z-index: 10;
  transition: all .5s;

  &:focus {
    background: rgba(252, 220, 75, .7);
    color: #000000;
  }

  &::placeholder {
    text-transform: uppercase;
    text-align: center;
    color: #cccccc;
  }
`;

class Message extends Component {
  render() {
    return <MessageContent>{this.props.text}</MessageContent>;
  }
}

const UserList = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 0;
  margin: 30px 0 0;
  position: relative;

  &:first-child {
    margin-top: 0;
  }

  &.me {
    span {
      display: block;
      text-align: center;
      position: relative;

      &:before {
        display: inline-block;
        content: 'me';
        background: #181818;
        font-size: 8px;
        font-weight: 500;
        padding: 5px;
        color: #ffffff;
        border-radius: 4px;
        margin: 0 10px 0 0;
      }
    }
  }

  &.on {
    &:before {
      display: block;
      content: '';
      width: 120px;
      height: 120px;
      border-top: 5px solid #ff3aa6;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-radius: 50%;
      position: absolute;
      top: -5px;
      left: 30%;
      opacity: .5;
      animation: rt 2s infinite linear;
    }

    @keyframes rt {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .cube-wrap {
    display: inline-block;
    transform: scale(0.7) translateX(50%);
    animation: enter .6s ease-in-out;
  }

  @keyframes enter {
    0% {
      transform: scale(0.1) translateX(50%);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    80% {
      transform: scale(0.8) translateX(50%);
    }
    100% {
      transform: scale(0.7) translateX(50%);
    }
  }

  span {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    margin: 10px 0 0;
  }

  .score {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    display: inline-block;
    line-height: 30px;
    color: #ffffff;
    border-radius: 25px 25px 0 25px;
    background: #ff7754;
    text-align: center;
    padding: 0 10px;
    position: absolute;
    top: 0;
    left: 30px;
  }
`;

class Users extends Component {
  render() {
    const { users, submissionUserId, id } = this.props;

    return (
      <ul className="users">
        {
          users.map((user) => (
            <UserList
              key={user.id}
              data-id={user.id}
              className={`${(submissionUserId === user.id) && 'on'} ${(id === user.id) && 'me'}`}
            >
              <Cube />
              <span>{user.nickname}</span>
              <em className="score">{user.score}</em>
              {user.message && <Message text={user.message} />}
            </UserList>
          ))
        }
      </ul>
    );
  }
};

class Chat extends Component {
  constructor(props) {
    super(props);

    this.onChangeValue = this.onChangeValue.bind(this);
    this.input = React.createRef();
  }

  onChangeValue(ev) {
    const value = ev.target.value;
    const { onSubmitMessage, id } = this.props;

    if (ev.key === 'Enter' && value) {
      onSubmitMessage(id, value);
      this.input.current.value = '';
    }
  }

  render() {
    return (
      <ChatWrap>
        <ChatInput
          type="value"
          onKeyPress={this.onChangeValue}
          ref={this.input}
          placeholder="Press enter to enter."
        />
      </ChatWrap>
    );
  }
}

const Keyword = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  min-width: 250px;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px;
  border-radius: 0 0 20px 20px;
  background: rgba(0,0,0,.8);
  color: #ffffff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ProblemKeyword = (props) => {
  const { keyword, keywordLength, submissionUserId, id } = props;
  return (
    <Keyword>
      {
        (keyword && submissionUserId === id)
          ? `${keyword}`
          : `keyword length is ${keywordLength}.`
      }
    </Keyword>
  );
};

const Colors = styled.ul`
  position: fixed;
  top: 40px;
  left: 40px;
  z-index: 100;
`;

const ColorItem = styled.li`
  display: flex;
  overflow: hidden;
  padding: 10px;
  cursor: pointer;
  transition: all .5s;

  em {
    display: inline-block;
    font-size: 8px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
    font-style: normal;
    line-height: 40px;
    opacity: 0;
    transition: all .5s;
  }

  &:before {
    display: inline-block;
    content: '';
    width: 40px;
    height: 40px;
    background: ${props => props.color};
    border-radius: 10px;
    box-shadow: 0 0 10px ${props => props.color};
    position: relative;
    z-index: 10;
    transition: all .5s;
  }

  &.on,
  &:hover {
    background: #ffffff;
    border-radius: 50px;

    &:before {
      border-radius: 50%;
      transform: rotate(45deg);
      box-shadow: 0 0 15px ${props => (props.color === '#ffffff') ? '#cccccc' : 'transparent'};
    }

    em {
      margin-left: 10px;
      opacity: 1;
    }
  }
`;

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.color
    };
  }

  onClickColor(ev) {
    const { onChangeColor } = this.props;
    const selectedColor = ev.currentTarget.dataset.color;

    this.setState({ selected: selectedColor });
    onChangeColor(selectedColor);
  }

  render() {
    const { colors } = this.props;

    return (
      <Colors>
        {
          colors.map((color) => {
            const hexColor = color.slice(2, color.length);
            return (
              <ColorItem
                data-color={color}
                color={`#${hexColor}`}
                key={color}
                onClick={this.onClickColor.bind(this)}
                className={(this.state.selected === color) ? 'on' : ''}
              >
                <em>{`#${hexColor}`}</em>
              </ColorItem>
            )
          })
        }
      </Colors>
    );
  }
}

const TimerBox = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.color};
  background: transparent;
  text-align: center;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 50px;
  border-radius: 10px;
  letter-spacing: 2px;
`;

class Timer extends Component {
  render() {
    const { time } = this.props;
    let min = Math.floor(time / 60000);
    let sec = time % 60000 / 1000;

    min = (min < 10) ? `0${min}` : min;
    sec = (sec < 10) ? `0${sec}` : sec;

    return (
      <TimerBox color={`${time >= (1000 * 30) ? '#2777CE' : '#F44336'}`}>
        <span>{min}</span>:<span>{sec}</span>
      </TimerBox>
    );
  }
}

const QuizHeader = styled.div`
  display: block;
  min-width: 250px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
`;

class Game extends Component {
  constructor(props) {
    super(props);
    this.countStart = false;
  }

  componentDidMount() {
    const { socket, onSetTimer, receiveMessage, onCorrectAnswer, onGameOver, onTimeOut } = this.props;

    socket.on('message', ({ id, message }) => {
      receiveMessage(id, message);
    });

    socket.on('pass', ({ id, solution, userNickName, users }) => {
      onCorrectAnswer(id, solution, userNickName, users);
    });

    socket.on('time out', () => {
      onTimeOut();
    });

    socket.on('end', (users) => {
      onGameOver(users);
    });

    socket.on('time counter', (time) => {
      onSetTimer(time);
    });
  }

  render() {
    const {
      users,
      isStart,
      onChangeColor,
      colors,
      color,
      onSubmitMessage,
      submissionUserId,
      id,
      time,
      createCube,
      socket,
      isPass,
      isTimeout,
      quizKeywordLength,
      quizKeyword,
      removeCube
    } = this.props;

    return (
      <div className="game-wrap">
        {
          isStart
          && (
            <QuizHeader>
              <ProblemKeyword
                keyword={quizKeyword}
                keywordLength={quizKeywordLength}
                submissionUserId={submissionUserId}
                id={id}
              />
              <Timer time={time} />
            </QuizHeader>
          )
        }
        {
          (submissionUserId === id)
          && <ColorPicker colors={colors} onChangeColor={onChangeColor} color={color} />
        }
        <ThreeScene
          isStart={isStart}
          color={color}
          submissionUserId={submissionUserId}
          id={id}
          createCube={createCube}
          removeCube={removeCube}
          socket={socket}
          isPass={isPass}
          isTimeout={isTimeout}
        />
        <Chat id={id} onSubmitMessage={onSubmitMessage} />
        <Users users={users} socket={socket} submissionUserId={submissionUserId} id={id} />
      </div>
    );
  }
}

const PopupWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: linear-gradient(0, rgba(0,0,0,.5) 0%, #000000 104%);
  color: #ffffff;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  animation: popup 1s;

  p {
    width: 100%;
  }

  @keyframes popup {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const PopupInner = styled.div`
  padding: 50px;
  border-radius: 20px;
  background: rgba(255, 255, 255, .7);
  color: #181818;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
`;

const PopContent = styled.div`
  display: flex;
  min-width: 150px;
  flex-wrap: wrap;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  position: relative;

  .quizSolutionKeyword {
    text-align: center;
    font-weight: 500;
    margin: 0 0 30px;
  }

  .cube-wrap {
    transform: translateX(50%);
  }

  ul {
    display: flex;
    width: 100%;

    li {
      min-width: 130px;
      text-align: center;

      .icon {
        display: inline-block;
        font-size: 30px;
        padding: 10px;
        color: #181818;
        border: 3px solid #181818;
        border-radius: 5px;
      }

      span {
        display: block;
        text-align: center;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 700;
        margin: 10px 0 0;
      }

      b {
        display: inline-block;
        text-align: center;
        line-height: 20px;
        font-size: 13px;
        text-transform: uppercase;
        font-weight: 700;
        margin: 10px 0 0;
        background: #f6d365;
        padding: 0 5px;
      }
    }
  }

  .quiz-owner {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: center;

    .cube-wrap {
      transform: scale(0.7) translateX(40px);
      margin: 0 0 15px;
    }

    span {
      display: inline-block;
      font-size: 20px;
      font-weight: 700;
      width: 100%;
      text-align: center;
      color: #494e51;
      letter-spacing: 2px;
    }
  }

  .correctUser {
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;

    .cube-wrap {
      transform: translate(50%, 17px);
    }

    p {
      font-weight: 700;
      font-size: 30px;
      letter-spacing: 3px;
      margin: 50px 0 0;
    }
  }
`;

const PopupTitle = styled.h1`
  font-size: 15px;
  font-weight: 700;
  padding: 0 25px;
  line-height: 40px;
  color: #ffffff;
  border-radius: 40px;
  letter-spacing: 3px;
  background: linear-gradient(145deg, #f6d365, #fda085);
  color: #ffffff;
  text-transform: uppercase;
  position: fixed;
  top: -20px;
  left: 50%;
  transform: translate(-50%);
`;

const GameScoreList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    border-top: 1px solid #cccccc;

    .cube-wrap {
      flex-grow: 2;
    }

    &:first-child {
      border-top: 0;

      .cube-wrap { transform: scale(.7) translateX(50%); }
      .score {
        font-size: 40px;
        color: #ffffff;
        text-shadow: 2px 2px 0 #ffd684,
        4px 4px 0 #fbbc05,
        6px 6px 0 #e8b64c;
      }
    }
    &:nth-child(2) {
      .cube-wrap { transform: scale(.6) translateX(50%); }
    }
    &:nth-child(3) {
      .cube-wrap { transform: scale(.5) translateX(50%); }
    }

    span {
      flex-grow: 5;
    }

    .score {
      flex-grow: 3;
      font-style: normal;
      font-weight: 700;
    }
  }
`;

const WinnerArea = styled.div`
  margin: 0 0 50px;
  position: relative;

  .icon { margin: 0 10px 0 0; }

  span {
    font-size: 30px;
    font-weight: 700;
  }
`;

const WinnerPopup = (props) => {
  const { gameResult } = props;

  return (
    <PopContent>
      <PopupTitle>game over</PopupTitle>
      <WinnerArea>
        <FontAwesomeIcon icon="crown" className="icon" />
        <span>{gameResult[0].nickname}</span>
      </WinnerArea>
      <GameScoreList>
        {
          gameResult.map((user) => (
            <li key={user.id}>
              <Cube />
              <span>{user.nickname}</span>
              <em className="score">{user.score}</em>
            </li>
          ))
        }
      </GameScoreList>
    </PopContent>
  );
};

const QuizCorrectPopup = (props) => {
  const { quizSolution, correctNickName } = props;

  return (
    <PopContent>
      <PopupTitle>correct!</PopupTitle>
      <p className="quizSolutionKeyword">{quizSolution}</p>
      <div className="correctUser">
        <Cube />
        <p>{correctNickName}</p>
      </div>
    </PopContent>
  );
};

const NextQuizPopup = (props) => {
  const {
    id,
    submissionUserId,
    submissionUserNickName
  } = props;

  return (
    <PopContent>
        <PopupTitle>
          {
            (submissionUserId === id) ? 'how to use' : 'drawer'
          }
        </PopupTitle>
        {
          (submissionUserId === id)
          ? (
            <ul>
              <li>
                <FontAwesomeIcon icon="cubes" className="icon" />
                <span>create</span>
                <b>click</b>
              </li>
              <li>
                <FontAwesomeIcon icon="eraser" className="icon" />
                <span>remove</span>
                <b>right click</b>
              </li>
              <li>
                <FontAwesomeIcon icon="sync-alt" className="icon" />
                <span>rotate</span>
                <b>drag</b>
              </li>
              <li>
                <FontAwesomeIcon icon="palette" className="icon" />
                <span>color</span>
              </li>
            </ul>
          )
          : (
            <div className="quiz-owner">
              <Cube />
              <span>{submissionUserNickName}</span>
            </div>
          )
        }
      </PopContent>
  );
};

const Popup = (props) => {
  const {
    id,
    submissionUserNickName,
    submissionUserId,
    quizSolution,
    correctNickName,
    isOver,
    gameResult
  } = props;

  return (
    <PopupWrap>
      <PopupInner>
        {
          isOver
            ? <WinnerPopup gameResult={gameResult} />
            : (correctNickName
              ? <QuizCorrectPopup
                  quizSolution={quizSolution}
                  correctNickName={correctNickName}
                />
              : <NextQuizPopup
                  id={id}
                  submissionUserId={submissionUserId}
                  submissionUserNickName={submissionUserNickName}
                />
            )
        }
      </PopupInner>
    </PopupWrap>
  );
};

class App extends Component {
  render() {
    const {
      user,
      onLogin,
      users,
      quiz,
      createCube,
      removeCube,
      socket,
      onSubmitMessage,
      receiveMessage,
      onChangeColor,
      onCorrectAnswer,
      screen,
      correct,
      isPass,
      isTimeout,
      onGameOver,
      gameResult,
      onTimeOut,
      onStartTimeCounter,
      onSetTimer,
      popup
    } = this.props;
    const {
      isStart,
      isOver,
      time,
      submissionUserId,
      submissionUserNickName,
      problem,
      problemLength
    } = quiz;
    const { id } = user;
    const { color, colors } = screen;
    const { correctNickName, quizSolution } = correct;

    return (
      <Fragment>
        {/* <audio ref="audio_tag" src={createCubeSound} autoPlay /> */}
        {/* <audio src={bgSound} loop autoPlay /> */}
        {
          isPass
          && <audio src={correctSound} autoPlay />
        }
        {
          user.id
            ? <Game
                onTimeOut={onTimeOut}
                onStartTimeCounter={onStartTimeCounter}
                users={users}
                isStart={isStart}
                isTimeout={isTimeout}
                submissionUserId={submissionUserId}
                id={id}
                removeCube={removeCube}
                createCube={createCube}
                socket={socket}
                onSubmitMessage={onSubmitMessage}
                receiveMessage={receiveMessage}
                onChangeColor={onChangeColor}
                color={color}
                colors={colors}
                onCorrectAnswer={onCorrectAnswer}
                isPass={isPass}
                isTimeout={isTimeout}
                quizKeywordLength={problemLength}
                quizKeyword={problem}
                onGameOver={onGameOver}
                time={time}
                onSetTimer={onSetTimer}
              />
            : <Login onClickLogin={onLogin} />
        }
        {
          popup
          && <Popup
              submissionUserNickName={submissionUserNickName}
              correctNickName={correctNickName}
              quizSolution={quizSolution}
              submissionUserId={submissionUserId}
              id={id}
              isOver={isOver}
              gameResult={gameResult}
            />
        }
      </Fragment>
    );
  }
}

export default App;
