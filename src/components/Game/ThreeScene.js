import React, { Component, Fragment } from 'react';
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
    this.onRemoveCube = this.onRemoveCube.bind(this);
    this.on = true;

    this.state = {
      rotate: 0
    };
    this.makeBackgroundStar = this.makeBackgroundStar.bind(this);
    this.animate = this.animate.bind(this);
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
    this.animate();
    this.initialScreenRender(defaultShape);
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

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000611 );

    this.camera = new THREE.PerspectiveCamera( 45, width / height, 1, 10000 );
    this.camera.position.set( 500, 800, 1300 );
    this.camera.lookAt( 0, 0, 0 );

    this.rollOverGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
    this.rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true , wireframe: false } );
    this.rollOverMesh = new THREE.Mesh( this.rollOverGeo, this.rollOverMaterial );

    this.cubeGeo = new THREE.BoxBufferGeometry( 50, 50, 50 );
    this.cubeMaterial = new THREE.MeshLambertMaterial( { color: this.props.color } );

    const gridHelper = new THREE.GridHelper( 1000, 20, 0xb4c1cb, 0xb4c1cb );
    this.scene.add( gridHelper );

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
    this.geometry.rotateX( - Math.PI / 2 );
    this.plane = new THREE.Mesh( this.geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
    this.scene.add( this.plane );
    this.objects.push( this.plane );

    this.ambientLight = new THREE.AmbientLight( 0x606060 );
    this.scene.add( this.ambientLight );
    this.directionalLight = new THREE.DirectionalLight( 0xffffff );
    this.directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    this.scene.add( this.directionalLight );
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls( this.camera, this.mount );
    this.controls.maxPolarAngle = Math.PI * 0.5;
    this.controls.minDistance = 1000;
    this.controls.maxDistance = 5000;

    this.makeBackgroundStar();
    this.renderScene();
  }

  initialScreenRender(cubes) {
    cubes.forEach((cube) => {
      const cubeMaterial = new THREE.MeshLambertMaterial( { color: cube.color } );
      const voxel = new THREE.Mesh( this.cubeGeo, cubeMaterial );

      voxel.position.x = cube.position.x;
      voxel.position.y = cube.position.y;
      voxel.position.z = cube.position.z;

      this.objects.push( voxel );
      this.scene.add( voxel );
    });

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

  makeBackgroundStar() {
    const colors = [0x9183fe, 0xffffff, 0xb6b096];
    const geometrys = [
      new THREE.IcosahedronGeometry(5, 0),
      new THREE.OctahedronGeometry(3, 0),
      new THREE.TetrahedronGeometry(5, 0),
      new THREE.TorusGeometry(5, 3, 16, 100)
    ];

    this.particles = new THREE.Group();
    this.scene.add(this.particles);

    for (let i = 0; i < 80; i ++) {
      const geometry = geometrys[Math.floor(Math.random() * geometrys.length)];
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        shading: THREE.FlatShading
      });

      const mesh = new THREE.Mesh(geometry, material);
      const randomPosX = (Math.random() - 0.5) * 2000;
      const randomPosY = (Math.random() - 0.5) * 2000;
      const randomPosZ = (Math.random() - 0.5) * 2000;

      mesh.position.set(randomPosX, randomPosY, randomPosZ);
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      this.particles.add(mesh);
    }
  }

  renderScene() {
    this.particles.rotation.x += 0.001;
    this.particles.rotation.y -= 0.001;
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.renderScene();
    requestAnimationFrame(this.animate);
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

export default ThreeScene;
