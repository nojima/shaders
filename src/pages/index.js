import * as React from "react";
import * as THREE from "three";

const newScene = () => {
  return new THREE.Scene();
}

const newCamera = () => {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.z = 10;
  return camera;
};

const newRenderer = (mountPoint) => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xE0DDCC, 1);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;
  if (mountPoint.current) {
    mountPoint.current.appendChild(renderer.domElement);
  }
  return renderer;
}

const Home = () => {
  const mountPoint = React.useRef();

  React.useEffect(() => {
    const scene = newScene();
    const camera = newCamera();
    const renderer = newRenderer(mountPoint);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00aa00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }, [mountPoint]);

  return (
    <div class="webgl-screen" ref={mountPoint}/>
  );
}

export default Home;
