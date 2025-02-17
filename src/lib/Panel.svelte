<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import Page from '../routes/+page.svelte';

	// Simple fragment shader that renders a solid color
	const simpleFragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;

const vec3 base03 = vec3(0.0, 0.16862745098039217, 0.21176470588235294);
const vec3 base02 = vec3(0.027450980392156862, 0.21176470588235294, 0.25882352941176473);
const vec3 base01 = vec3(0.34509803921568627, 0.43137254901960786, 0.4588235294117647);
const vec3 base00 = vec3(0.396078431372549, 0.4823529411764706, 0.5137254901960784);

// Get random value
float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm(vec2 st) {
    float value = 0.;
    float amp = .55;
    float freq = 0.;

    for(int i = 0; i < OCTAVES; i++) {
        value += amp * noise(st);
        st *= 2.1;
        amp *= .35;
    }
    return value;
}

float pattern(vec2 p) {
    float f = 0.;
    vec2 q = vec2(
        fbm(p + u_time * .05 + vec2(0.)),
        fbm(p + u_time * .07 + vec2(2.4, 4.8))
    );
    vec2 r = vec2(
        fbm(q + u_time * .07 + 4. * q + vec2(3., 9.)),
        fbm(q + u_time * .05 + 8. * q + vec2(2.4, 8.4))
    );
    f = fbm(p + r * 2. + u_time * .02);
    return f;
}

vec3 getColor(float v) {
    vec3 col;
    if (v < 1.0 / 7.0)
        col = base00; // base00: Yellow
    else if (v < 2.0 / 7.0)
        col = base01; // base01: Orange
    else if (v < 3.0 / 7.0)
        col = base02; // base02: Red
    else if (v < 4.0 / 7.0)
        col = base03; // base03: White
    else
        col = base03; // base03: White (fallback color)
    return col;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    float value = pattern(uv);
    vec3 color = getColor(value);

    gl_FragColor = vec4(color, 1.0);
}

`;

	var baseVertexShader = `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(
			window.innerWidth / -2,
			window.innerWidth / 2,
			window.innerHeight / 2,
			window.innerHeight / -2,
			1,
			1000
		);

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);

		const container = document.getElementById('threejs-panel');

		if (container != null) {
			container.appendChild(renderer.domElement);
		}

		const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

		let materialUniforms = {
			u_resolution: { value: new THREE.Vector2() },
			u_time: { value: 0.0 }
		};

		// Create custom shader material
		const material = new THREE.ShaderMaterial({
			uniforms: materialUniforms,
			fragmentShader: simpleFragmentShader,
			vertexShader: baseVertexShader,
			side: THREE.DoubleSide
		});

		const plane = new THREE.Mesh(geometry, material);
		plane.position.set(0, 0, 0);
		scene.add(plane);

		camera.position.z = 1;

		function updateUniforms() {
			material.uniforms.u_resolution.value.x = window.innerWidth;
			material.uniforms.u_resolution.value.y = window.innerHeight;
			material.uniforms.u_time.value += 0.01; // or any other value you want
		}

		function animate() {
			updateUniforms();
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		}

		animate();
	});
</script>
