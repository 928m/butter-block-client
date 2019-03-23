import React, { Component, Fragment } from 'react';
import './App.scss';
import Login from '../block/Login';
import Cube from '../elements/Cube';
import styled from 'styled-components';
import * as THREE from 'three';
import threeOrbitControls from 'three-orbit-controls';
import defaultShape from './defaultShape';
const OrbitControls = threeOrbitControls(THREE);

class ThreeScene extends Component{
  constructor(props) {
    super(props);

    this.end = this.end.bind(this);
    this.init = this.init.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onDown = this.onDown.bind(this);
    this.screenRemove = this.screenRemove.bind(this);
    this.quizScreenRender = this.quizScreenRender.bind(this);
    this.on = true;
  }

  componentDidMount(){
    const { socket } = this.props;

    socket.on('cubes', (cubes) => {
      this.quizScreenRender(cubes);
    });

    this.init();
    this.quizScreenRender(defaultShape);
  }

  componentWillUnmount(){
    this.end();
  }

  shouldComponentUpdate(nextProps) {
    const { isStart, isPass } = nextProps;

    if ((this.on && isStart) || isPass) {
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
    const gridHelper = new THREE.GridHelper( 1000, 20 );
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
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.controls.minDistance = 1000;
    this.controls.maxDistance = 5000;

    this.renderScene();
  }

  quizScreenRender(cubes) {
    cubes.forEach((item) => {
      const cubeMaterial = new THREE.MeshLambertMaterial( { color: item.color } );
      const voxel = new THREE.Mesh( this.cubeGeo, cubeMaterial );

      voxel.position.x = item.position.x;
      voxel.position.y = item.position.y;
      voxel.position.z = item.position.z;

      this.scene.add( voxel );
    });

    this.renderScene();
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  onMove(event) {
    const { isStart, submissionUser, id } = this.props;

    if (isStart && submissionUser === id) {
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

  onDown(event) {
    const { isStart, submissionUser, id, createCube } = this.props;

    if (!isStart || submissionUser !== id) {
      return false;
    }

    this.mouse.set(( event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.objects);
    this.cubeMaterial = new THREE.MeshLambertMaterial( { color: this.props.color } );

    if ( this.intersects.length > 0 ) {
      this.intersect = this.intersects[ 0 ];
      // delete cube
      if ( this.isShiftDown ) {
        if ( this.intersect.object !== this.plane ) {
          this.scene.remove( this.intersect.object );
          this.objects.splice( this.objects.indexOf( this.intersect.object ), 1 );
        }
        // create cube
      } else {
        const voxel = new THREE.Mesh( this.cubeGeo, this.cubeMaterial );
        voxel.position.copy( this.intersect.point ).add( this.intersect.face.normal );
        voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

        createCube({
          position: voxel.position,
          color: this.props.color
        });

        this.scene.add( voxel );
        this.objects.push( voxel );

        this.renderScene();
      }
    }
  }

  screenRemove() {
    this.end();
    this.init();
  }

  render() {
    return(
      <div className="screen">
        <div
          style={{ width: '100%', height: '100vh' }}
          ref={(mount) => { this.mount = mount }}
          onMouseMove={this.onMove}
          onClick={this.onDown}
        />
      </div>
    )
  }
}

const MessageContent = styled.p`
  display: block;
  position: absolute;
  top: 30%;
  left: 0;
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
      border-top: 5px solid #ffffff;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-radius: 50%;
      position: absolute;
      top: -5px;
      left: 30%;
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
  }
`;

class Users extends Component {
  render() {
    const { users, submissionUser, id } = this.props;

    return (
      <ul className="users">
        {
          users.map((user) => (
            <UserList
              key={user.id}
              data-id={user.id}
              className={`${(submissionUser === user.id) && 'on'} ${(id === user.id) && 'me'}`}
            >
              <Cube />
              <span>{user.nickname}</span>
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
  text-transform: uppercase;
  border-radius: 0 0 20px 20px;
  background: rgba(0,0,0,.8);
  color: #ffffff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Word = styled.div`
  width: 25px;
  height: 25px;
  line-height: 25px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
  color: #000000;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 0 20px #ffffff;
  animation: word 2s infinite;

  &:first-child {
    margin-left: 0;
  }

  @keyframes word {
    0% {transform: scale(1);}
    50% {transform: scale(1.2);}
    100% {transform: scale(1);}
  }
`;

const ProblemKeyword = (props) => {
  const { keyword, keywordCount } = props;
  return (
    <Keyword>
      {keyword || <Word>?</Word>}
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
    box-shadow: 0 0 15px ${props => props.color};
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
      selected: '0xfbbc05'
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

class Game extends Component {
  componentDidMount() {
    const { socket, receiveMessage, onCorrectAnswer } = this.props;

    socket.on('message', ({ id, message }) => {
      receiveMessage(id, message);
    });

    socket.on('pass', ({ id, solution, userNickName }) => {
      onCorrectAnswer(id, solution, userNickName);
    });

    socket.on('end', (users) => {
      alert('end!!');
      console.log('users : ', users);
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
      submissionUser,
      id,
      createCube,
      socket,
      isPass
    } = this.props;

    return (
      <div className="game-wrap">
        {
          isStart
          && <ProblemKeyword keyword="keyword" keywordCount={2} />
        }
        {
          (submissionUser === id)
          && <ColorPicker colors={colors} onChangeColor={onChangeColor} />
        }
        <ThreeScene
          isStart={isStart}
          color={color}
          submissionUser={submissionUser}
          id={id}
          createCube={createCube}
          socket={socket}
          isPass={isPass}
        />
        <Chat id={id} onSubmitMessage={onSubmitMessage} />
        <Users users={users} socket={socket} submissionUser={submissionUser} id={id} />
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
  align-items: center;
  justify-content: center;
  animation: popup 1s;

  @keyframes popup {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const Popup = (props) => {
  return (
    <PopupWrap>
      <p>{props.type}</p>
      <p>{props.user}</p>
      <p>{props.correctNickName}</p>
      <p>{props.quizSolution}</p>
    </PopupWrap>
  );
};

class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isPopup: false
  //   };
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.quiz.isStart , '< next start');
  //   console.log(this.props.quiz.isStart, '< current start');
  // }

  render() {
    const {
      user,
      onLogin,
      users,
      quiz,
      createCube,
      socket,
      onSubmitMessage,
      receiveMessage,
      onChangeColor,
      onCorrectAnswer,
      screen,
      correct,
      isPass,
      popup
    } = this.props;
    const { id } = user;
    const { color, colors } = screen;
    const { isStart, submissionUser } = quiz;
    const { correctUserId, correctNickName, quizSolution } = correct;

    return (
      <Fragment>
        {
          user.id
            ? <Game
                users={users}
                isStart={isStart}
                submissionUser={submissionUser}
                id={id}
                createCube={createCube}
                socket={socket}
                onSubmitMessage={onSubmitMessage}
                receiveMessage={receiveMessage}
                onChangeColor={onChangeColor}
                color={color}
                colors={colors}
                onCorrectAnswer={onCorrectAnswer}
                isPass={isPass}
              />
            : <Login onClickLogin={onLogin} />
        }
        {
          popup
          && <Popup
              user={submissionUser}
              correctNickName={correctNickName}
              quizSolution={quizSolution}
            />
        }
      </Fragment>
    );
  }
}

export default App;
