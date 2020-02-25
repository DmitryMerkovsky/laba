var clock = new THREE.Clock();
var container;
var camera,scene, renderer;
var loader = new THREE.TextureLoader();
var planets = []; 
var t = 0;

init();

animate();

function init() {
    container = document.getElementById( 'container' );
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
    
    camera.position.set(0, 200, 0);
    camera.lookAt(new THREE.Vector3( 0, 0.0, 0)); 

    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x0000ffff, 1);
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

    var spotlight = new THREE.PointLight(0xffffff);
    spotlight.position.set(0, 0, 0);
    scene.add(spotlight);

    var bglight = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( bglight );

    initSun();
    initStars();

    initPlanet(2, 'imgs/mercurymap.jpg', 20, 1);
    initPlanet(4,  'imgs/venusmap.jpg', 40, 2);
    initPlanet(5,  'imgs/earthmap1k.jpg', 60, 1.5);
    initPlanet(4.5, 'imgs/marsmap1k.jpg', 80, 2.5);

}

function initPlanet(r, timg, posX, v1)
{
        var geometry = new THREE.SphereGeometry( r, 32, 32 );
        var tex = loader.load( timg );
        tex.minFilter = THREE.NearestFilter;

        var material = new THREE.MeshPhongMaterial({
            map: tex,
            side: THREE.DoubleSide
        });
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(posX, 0, 0);
        scene.add( sphere ); 

        var planet = {};

        planet.planet = sphere; 
        planet.posX = posX; 
        planet.v1 = v1;
        planet.a1 = 0.0;
        planet.radius = r;

        planets.push(planet); 
    
}

function initSun()
{

        var geometry = new THREE.SphereGeometry( 10, 32, 32 );
        var tex = loader.load( 'imgs/sunmap.jpg' );
        tex.minFilter = THREE.NearestFilter;
        var material = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.DoubleSide
        });
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(0, 0, 0);
        scene.add( sphere ); 


    
}

function initStars()
{

        var geometry = new THREE.SphereGeometry( 500, 32, 32 );
        var tex = loader.load( 'imgs/starmap.jpg' );
        tex.minFilter = THREE.NearestFilter;
        var material = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.DoubleSide
        });
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(0, 0, 0);
        scene.add( sphere ); 


    
}

function animate()
{   

    var delta = clock.getDelta(); 
    //t= t + delta;
    for (var i=0; i<planets.length; i++)
    {
        //создание набора матриц
        var m = new THREE.Matrix4();
        var m1 = new THREE.Matrix4();
        var m2 = new THREE.Matrix4();

        planets[i].a1 += planets[i].v1  * delta;
        //создание матрицы поворота (вокруг оси Y) в m1 и матрицы перемещения в m2
        m1.makeRotationY( planets[i].a1 );
        m2.setPosition(new THREE.Vector3(planets[i].posX, 0, 0));
        m.multiplyMatrices( m1, m2 );
        m.multiplyMatrices( m, m1 );
        planets[i].planet.matrix = m;
        planets[i].planet.matrixAutoUpdate = false;
        
    }
    requestAnimationFrame( animate );
    render();
}

function render()
{
    renderer.render( scene, camera );
}

function onWindowResize()
{
 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();
 renderer.setSize( window.innerWidth, window.innerHeight );
}





/*for (var i=0; i<planets.length; i++)
    {
        //создание набора матриц
        var m = new THREE.Matrix4();
        var m1 = new THREE.Matrix4();
        var m2 = new THREE.Matrix4();

        planets[i].a1 += planets[i].v1 * delta;
        planets[i].a2 += planets[i].v2 * delta;
        //создание матрицы поворота (вокруг оси Y) в m1 и матрицы перемещения в m2
        m1.makeRotationY( planets[i].a1 );
        m2.setPosition(new THREE.Vector3(planets[i].posX, 0, 0));
        m.multiplyMatrices( m1, m2 );
        m.multiplyMatrices( m1, m2 );
        planets[i].planet.matrix = m;
        planets[i].planet.matrixAutoUpdate = false;
        
    }*/