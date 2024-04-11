
<script lang="ts">

import { onMount } from 'svelte';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

onMount(() => {

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth/2, window.innerHeight/2);
renderer.setClearColor(0xFDF6E3);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const container = document.getElementById("threejs-contrainer")

if (container != null) {
container.appendChild(renderer.domElement);
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 6);

// Look into these in the future and tailor to website 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const light = new THREE.AmbientLight(0xffffff)

const loader = new GLTFLoader();
loader.load('dev_tobbe.gltf', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

  mesh.position.set(0, 1.05, -1);
  scene.add(mesh);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
});
</script>

<div  class="m-auto"/>