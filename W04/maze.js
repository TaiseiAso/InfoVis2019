function main(){
    const width = 500;
    const height = 500;

    const block_width = 0.1;
    const block_height = 0.1;
    const block_depth = 0.1;

    const maze_size_x = 15;
    const maze_size_y = 15;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 1, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( block_width, block_height, block_depth );
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );

    var maze = create_maze( maze_size_x, maze_size_y );

    for ( y = 0; y < maze.length; y ++ ) {
        for ( x = 0; x < maze[y].length; x ++ ) {
            var cube = new THREE.Mesh( geometry, material );

            if ( maze[y][x] == 1 ) {
                cube.position.set( x * block_width, y * block_height, 0 );
                scene.add( cube );
            }
        }
    }

    var light = new THREE.PointLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    loop();

    function loop(){

        requestAnimationFrame( loop );
        renderer.render( scene, camera );
    }
}

function create_maze( size_x, size_y ){
    if ( size_x % 2 == 0 ) size_x --;
    if ( size_y % 2 == 0 ) size_y --;

    if ( size_x < 5 || size_y < 5 ) {
        return new Array(
            [ 1, 1, 1, 1, 1 ],
            [ 1, 0, 0, 0, 1 ],
            [ 1, 0, 1, 0, 1 ],
            [ 1, 0, 0, 0, 1 ],
            [ 1, 1, 1, 1, 1 ],
        );
    }

    var x, y;
    var maze = new Array( size_y );
    for ( y = 0; y < size_y; y ++ ) {
        maze[y] = new Array( size_x );
        for ( x = 0; x < size_x; x ++ ) {
            if ( y == 0 || y == size_y - 1 || x == 0 || x == size_x - 1 ) {
                maze[y][x] = 1;
            } else maze[y][x] = 0;
        }
    }

    for ( y = 2; y < size_y - 2; y += 2 ) {
        for ( x = 2; x < size_x - 2; x += 2 ) {
            maze[y][x] = 1;

            var next_array = [];
            if ( y == 2 ) next_array.push(0);
            if ( maze[y][x + 1] == 0 ) next_array.push(1);
            if ( maze[y + 1][x] == 0 ) next_array.push(2);
            if ( maze[y][x - 1] == 0 ) next_array.push(3);

            var next = Math.floor( Math.random() * next_array.length );
            if ( next_array[next] == 0 ) maze[y-1][x] = 1;
            else if ( next_array[next] == 1 ) maze[y][x+1] = 1;
            else if ( next_array[next] == 2 ) maze[y+1][x] = 1;
            else maze[y][x-1] = 1;
        }
    }

    return maze;
}
