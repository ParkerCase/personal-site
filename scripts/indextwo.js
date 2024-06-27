import * as THREE from "three";
// control the orbit
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.getElementById("container3D").appendChild(renderer.domElement);

// 75 degrees makes it a good field of view. 5 degrees would be narrow fov and 180 would be too large.

const fov = 75;
const aspect = w / h;
// 0.1 is when it will start rendering. Anything closer than this will be invisible.
const near = 0.1;
// anything further than 10 will be invisible
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// a little bit further back just so we can see what is at the center of the scene
camera.position.z = 2;
const scene = new THREE.Scene();
// the code above allows us to render something. We then pass the function below and can do it.

scene.background = new THREE.Color(0x657677);

// This will allow us to use the clicker to control the ball, but wait it gets better
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Three.js has built in geometric shapes and this is how to access some of them. In the parameters we pass size and detail.
const geo = new THREE.IcosahedronGeometry(1.0, 4);
// We want to put a material on that item from above. This one will want some properties, but the only one we will worry about for now is the color property. So we do:
// If we change from basic to stadard material, it interacts with lights. Therefore we must add lights to see.
const mat = new THREE.MeshStandardMaterial({
  color: 0xfff099,
  flatShading: true,
});
// pass in the geo and mat from above
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// we want to add even more details, so we're going to do
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
  setSize: 5,
});

const wireMesh = new THREE.Mesh(geo, wireMat);
// to help with the skipping, we can scale it up slightly by adding:
wireMesh.scale.setScalar(1.001);
// generally we could do scene.add, but if we want the two objects to move together, we would add this mesh to the mesh above
mesh.add(wireMesh);

// light and it will be white on top black on bottom(swap that we changing them to be blue on top and orangish pink on bottom)
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

// We're going to wrap our renderer in a function so that it animates it and calls it over and over again so that we can have movement.
function animate(t = 0) {
  //pass in the name of the function and we're good to go. However
  requestAnimationFrame(animate);
  //   We want to add some animation and rotation.
  mesh.rotation.x = t * 0.0001;

  mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();
}

// dont forget to call the function on the first time
animate();
