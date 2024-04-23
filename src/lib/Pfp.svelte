<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

	onMount(() => {
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.outputColorSpace = THREE.SRGBColorSpace;

		renderer.setSize(window.innerWidth, window.innerHeight / 2.5);
		renderer.setClearColor(0xfdf6e3);
		renderer.setPixelRatio(window.devicePixelRatio);

		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		const container = document.getElementById('threejs-contrainer');

		if (container != null) {
			container.appendChild(renderer.domElement);
		}

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.set(0, 0, 20);
		camera.lookAt(0, 0, 0);

		const target = new THREE.Object3D();
		target.position.z = 20000;
		const intersectionP = new THREE.Vector3();
		const planeN = new THREE.Vector3();
		const plane = new THREE.Plane();
		const mousePos = new THREE.Vector2();
		const raycaster = new THREE.Raycaster();

		// The Z position of the target. Further away, less influence the mouse movement will have.
		const influence: number = 12;

		const mediaQuery = window.matchMedia('(max-width: 768px)');

		const controls = new OrbitControls(camera, renderer.domElement);
		// Run OrbitControls setup only if viewport matches the media query
		if (mediaQuery.matches) {
			controls.enableDamping = true;
			controls.dampingFactor = 0.025;
			controls.enablePan = false;
			controls.minDistance = 1;
			controls.maxDistance = 20;
			controls.minPolarAngle = 1.5;
			controls.maxPolarAngle = 1.5;
			controls.autoRotate = false;
			controls.target = new THREE.Vector3(0, 1, 0);
			controls.update();
		}

		window.addEventListener('mousemove', function (e) {
			mousePos.x = (e.clientX / this.window.innerWidth) * 2 - 1;
			mousePos.y = -(e.clientY / this.window.innerHeight) * 2 + 1;
			planeN.copy(camera.position).normalize();
			plane.setFromNormalAndCoplanarPoint(planeN, scene.position);

			raycaster.setFromCamera(mousePos, camera);
			raycaster.ray.intersectPlane(plane, intersectionP);

			target.position.set(intersectionP.x, intersectionP.y, influence);
		});

		const light = new THREE.AmbientLight(0xffffff, 3.15);
		scene.add(light);

		let iconmesh: THREE.Group<THREE.Object3DEventMap>;

		const loader = new GLTFLoader();
		loader.load('solarizedtobbe.glb', (gltf) => {
			console.log('loading model');
			const mesh = gltf.scene;

			const scale = 0.2;
			mesh.scale.set(scale, scale, scale);

			mesh.traverse((child) => {
				if (child instanceof THREE.Mesh && child.material) {
					const material = child.material;
					material.metalness = 0;
					material.roughness = 0; // Adjust roughness as needed for even lighting
					material.flatShading = true; // Apply flat shading for no shadows
					material.vertexColors = true; // Disable vertex colors if not needed
					material.needsUpdate = true; // Ensure material updates
					// You may also need to adjust other material properties depending on your model
				}
			});

			mesh.position.set(0, 1.05, -1);
			scene.add(mesh);

			iconmesh = mesh;
		});

		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		});

		function animate() {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
			if (iconmesh) {
				iconmesh.lookAt(target.position);
			}

			controls.update();

			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		}

		animate();
	});
</script>
