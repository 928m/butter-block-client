import React, { Component, Fragment } from 'react';
import './App.scss';
import Login from '../block/Login';
import Cube from '../elements/Cube';
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

  componentDidMount(){
    this.init();
    this.quizScreenRender(defaultShape);
  }

  componentWillUnmount(){
    this.end();
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
    this.cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfbbc05 } );

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

  shouldComponentUpdate(nextProps) {
    const { socket, isStart } = nextProps;

    isStart && this.screenRemove();

    socket.on('cubes', (cubes) => {
      this.quizScreenRender(cubes);
      return true;
    });

    return false;
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
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
        const custumColor = 0xb4c1cb;
        voxel.position.copy( this.intersect.point ).add( this.intersect.face.normal );
        voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

        createCube({
          position: voxel.position,
          color: custumColor
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

const Users = (props) => {
  return (
    <ul className="users">
      {
        props.users.map((name, index) => (
          <li key={`${name}${index}`}>
            <Cube />
            <span>{name}</span>
          </li>
        ))
      }
    </ul>
  );
};

class Game extends Component {
  render() {
    const { users, isStart, submissionUser, id, createCube, socket } = this.props;

    return (
      <div className="game-wrap">
        <ThreeScene isStart={isStart} submissionUser={submissionUser} id={id} createCube={createCube} socket={socket} />
        <Users users={users} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    const { user, onLogin, users, quiz, createCube, socket } = this.props;
    const { id } = user;
    const { isStart, submissionUser} = quiz;

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
              />
            : <Login onClickLogin={onLogin} />
        }
      </Fragment>
    );
  }
}

export default App;
