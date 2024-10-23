

console.log("Script started: Initializing Three.js setup");


const container = document.getElementById('model-container');
const width = container.clientWidth;
const height = container.clientHeight;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });  
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;  
renderer.shadowMap.type = THREE.PCFSoftShadowMap;  
container.appendChild(renderer.domElement);

console.log("Three.js scene, camera, and renderer setup complete");

camera.position.set(0, 2, 5);  

const light = new THREE.SpotLight(0xffffff, 1);  
light.castShadow = true;  
light.shadow.mapSize.width = 1024;  
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 50;
scene.add(light);

console.log("Lighting with shadows added to the scene");

const ambientLight = new THREE.AmbientLight(0x404040, 1);  
scene.add(ambientLight);

console.log("Ambient light added");

const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });  
console.log("Default white material created");

const objLoader = new THREE.OBJLoader();
console.log("Starting to load OBJ model from: Models/Exporter.obj");

objLoader.load('Models/Exporter.obj', function(object) {

    console.log("OBJ model loaded successfully");

    object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material = whiteMaterial;
            child.castShadow = true;  
            child.receiveShadow = true;  
            console.log("White material applied to a mesh and shadows enabled");
        }
    });

    object.position.set(0, 0, 0);
    object.scale.set(0.5, 0.5, 0.5); 

    scene.add(object);
    console.log("OBJ model added to the scene");

    renderer.render(scene, camera);
    console.log("Model rendered");

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

}, undefined, function(error) {
    console.error("Error loading the OBJ model:", error);
});


const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  
controls.dampingFactor = 0.05;
controls.enableZoom = true;  
controls.rotateSpeed = 0.5;  
controls.autoRotate = false;  


window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
});

console.log("Mouse controls added and animation loop started");
