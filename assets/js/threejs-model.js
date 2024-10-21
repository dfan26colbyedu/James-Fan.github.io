// threejs-model.js

console.log("Script started: Initializing Three.js setup");

// Select the container div for rendering
const container = document.getElementById('model-container');
const width = container.clientWidth;
const height = container.clientHeight;

// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });  // Enable antialiasing for smoother edges
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;  // Enable shadow map
renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // Use soft shadow mapping
container.appendChild(renderer.domElement);

console.log("Three.js scene, camera, and renderer setup complete");

camera.position.set(0, 2, 5);  // Adjusted to view the model from further back
console.log("Camera positioned");

const light = new THREE.SpotLight(0xffffff, 1);  // Use SpotLight for soft shadows
light.position.set(10, 20, 10);
light.castShadow = true;  // Enable shadows for this light
light.shadow.mapSize.width = 1024;  // Shadow map resolution
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 50;
scene.add(light);

console.log("Lighting with shadows added to the scene");

const ambientLight = new THREE.AmbientLight(0x404040, 1);  // Soft ambient light
scene.add(ambientLight);

console.log("Ambient light added");

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

console.log("Grid helper added to the scene");

const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });  // Use MeshStandardMaterial for better lighting interaction
console.log("Default white material created");

const objLoader = new THREE.OBJLoader();
console.log("Starting to load OBJ model from: Models/Exporter.obj");

objLoader.load('Models/Exporter.obj', function(object) {

    console.log("OBJ model loaded successfully");

    object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material = whiteMaterial;
            child.castShadow = true;  // Enable shadow casting on the model
            child.receiveShadow = true;  // Enable shadow reception on the model
            console.log("White material applied to a mesh and shadows enabled");
        }
    });

    object.position.set(0, 0, 0);

    object.scale.set(0.5, 0.5, 0.5);  // Reduced scale to make the model fit better in the view

    scene.add(object);
    console.log("OBJ model added to the scene");

    renderer.render(scene, camera);
    console.log("Model rendered");

    function animate() {
        requestAnimationFrame(animate);

        object.rotation.y += 0.01;  // Slow rotation around Y-axis

        renderer.render(scene, camera);
    }
    animate();

}, undefined, function(error) {
    console.error("Error loading the OBJ model:", error);
});

window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
});

console.log("Animation loop started");
