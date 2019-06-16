function Ground( volume ) {
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;

    var minx = volume.min_coord.x;
    var miny = volume.min_coord.y;

    var maxx = volume.max_coord.x;
    var maxy = volume.max_coord.y;

    var divide = 10;
    var intervalx = Math.ceil( ( maxx - minx ) / divide );
    var intervaly = Math.ceil( ( maxy - miny ) / divide );

    var counter = 0;
    var colorList = [
        new THREE.Color( 0.2, 0.8, 0.2 ),
        new THREE.Color( 0.1, 0.5, 0.1 )
    ];

    var countery = 0;
    for ( var y = miny; y < maxy; y += intervaly ) {
        var counterx = 0;
        for ( var x = minx; x < maxx; x += intervalx ) {
            var color = colorList[ ( counterx + countery ) % 2 ];

            geometry.vertices.push( trans_vector( x, y ) );
            geometry.vertices.push( trans_vector( x + intervalx, y ) );
            geometry.vertices.push( trans_vector( x, y + intervaly ) );

            var id0 = counter++;
            var id1 = counter++;
            var id2 = counter++;
            var face = new THREE.Face3( id0, id1, id2 );
            face.color = color;
            geometry.faces.push( face );

            geometry.vertices.push( trans_vector( x, y + intervaly ) );
            geometry.vertices.push( trans_vector( x + intervalx, y ) );
            geometry.vertices.push( trans_vector( x + intervalx, y + intervaly ) );

            var id0 = counter++;
            var id1 = counter++;
            var id2 = counter++;
            var face = new THREE.Face3( id0, id1, id2 );
            face.color = color;
            geometry.faces.push( face );

            counterx++;
        }
        countery++;
    }

    return mesh = new THREE.Mesh( geometry, material );

    function trans_vector( x, y ) {
        return new THREE.Vector3( Math.min( x, maxx ), Math.min( y, maxy ), 0 );
    }
}
