function main(){
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 6 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
        [-1, 1, 1],
        [-1,-1, 1],
        [ 1,-1, 1],
        [ 1, 1, 1],
        [-1, 1,-1],
        [-1,-1,-1],
        [ 1,-1,-1],
        [ 1, 1,-1]
    ];

    var faces = [
        [0, 1, 2],
        [0, 2, 3],
        [1, 5, 6],
        [1, 6, 2],
        [2, 6, 7],
        [2, 7, 3],
        [0, 4, 5],
        [0, 5, 1],
        [3, 7, 4],
        [3, 4, 0],
        [5, 4, 7],
        [5, 7, 6]
    ];

    var geometry = new THREE.Geometry();
    geometry.computeFaceNormals();

    for ( i = 0; i < 8; i ++ ) {
        var v = new THREE.Vector3().fromArray( vertices[i] );
        geometry.vertices.push( v );
    }

    for ( i = 0; i < 12; i ++ ) {
        var id = faces[i];
        var f = new THREE.Face3( id[0], id[1], id[2] )
        f.color = new THREE.Color( 0.3, 0.7, 0.3 );
        geometry.faces.push( f );
    }

    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    document.addEventListener( 'mousedown', mouse_down_event );

    loop();

    function loop() {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }

    function mouse_down_event( event ) {
        var x_win = event.clientX;
        var y_win = event.clientY;

        var vx = renderer.domElement.offsetLeft;
        var vy = renderer.domElement.offsetTop;
        var vw = renderer.domElement.width;
        var vh = renderer.domElement.height;

        var x_NDC = 2*( x_win - vx )/vw - 1;
        var y_NDC = -( 2*( y_win - vy )/vh - 1 );

        var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
        var p_wld = p_NDC.unproject( camera );

        var origin = camera.position;
        var direction = p_wld.sub(origin).normalize();

        var raycaster = new THREE.Raycaster( origin, direction );
        var intersects = raycaster.intersectObject( cube );
        if ( intersects.length > 0 ) {
            intersects[0].face.color.setRGB( 0.7, 0.3, 0.3 );
            intersects[0].object.geometry.colorsNeedUpdate = true;
        }
    }
}
