var container;
var camera, scene, renderer;
var N=256;
var imagedata;
var clock = new THREE.Clock();
var t=0;
var spotlight = new THREE.PointLight(0xffffff);
spotlight.position.y = 200;
var geometry;
var sphere;


init();
initSphere();
animate();

function init()
{
    container = document.getElementById( 'container' );
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x0000ffff, 1);
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var img = new Image();
    img.onload = function()
    {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0 );
        imagedata = context.getImageData(0, 0, img.width, img.height);
        grid();
        
    }
    img.src = 'imgs/plateau.jpg';
    spotlight.position.set(100, 1000, 100);
    scene.add(spotlight);
    

}
function initSphere()
{
    var geometry = new THREE.SphereGeometry( 10, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

}
function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate()
{
    var delta = clock.getDelta(); 
    t= t + delta;
    console.log(t);
    spotlight.position.x = N/2+N*Math.cos(t);
    spotlight.position.z = N*Math.sin(t);

    var x =  2*N*Math.cos(t);
    var z = 2*N*Math.sin(t);

    sphere.position.x = N/2+N*Math.cos(t);
    sphere.position.y = sphere.position.z;
    sphere.position.z = N*Math.sin(t);
    
    camera.position.set(x, N/2, z);
    camera.lookAt(new THREE.Vector3( N/2, 0.0, N/2));
    requestAnimationFrame( animate );
    render();
}
function render()
{
    // Рисование кадра
    renderer.render( scene, camera );
}


function grid()
{

    geometry = new THREE.Geometry();
    for (var i=0; i<N; i++)
    {
        for (var j=0; j<N; j++)
        {
            var h = getPixel( imagedata, i, j ); 
            geometry.vertices.push(new THREE.Vector3( i, h/5, j));
        }
    }

    for (var i=0; i<N-1; i++)
    {
        for (var j=0; j<N-1; j++)
        {
            var index1 = i*N + j;
            var index2 = i*N + j + 1;
            var index3 = (i+1)*N + j;
            var index4 = (i+1)*N + j + 1;

            geometry.faces.push(new THREE.Face3(index1, index2, index4)); 
            geometry.faces.push(new THREE.Face3(index1, index4, index3)); 

            geometry.faceVertexUvs[0].push([new THREE.Vector2(i/N, j/N),
                new THREE.Vector2((i+1)/N, j/N),
                new THREE.Vector2((i+1)/N, (j+1)/N)]);
               geometry.faceVertexUvs[0].push([new THREE.Vector2(i/N, j/N),
                new THREE.Vector2((i+1)/N, (j+1)/N),
                new THREE.Vector2(i/N, (j+1)/N)]);
        }
    } 

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    
    var loader = new THREE.TextureLoader();
    var tex = loader.load( 'imgs/grasstile.jpg' );
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set( 2, 2 );
   
    var triangleMaterial = new THREE.MeshLambertMaterial({
        map: tex,
        wireframe:false,
        side:THREE.DoubleSide
    });

    // Создание объекта и установка его в определённую позицию
    var triangleMesh = new THREE.Mesh(geometry, triangleMaterial);
    triangleMesh.position.set(0.0, 0.0, 0.0);
    // Добавление объекта в сцену
    scene.add(triangleMesh);
    
 
}



function getPixel( imagedata, x, y )
{
 var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
 return data[ position ];
}

