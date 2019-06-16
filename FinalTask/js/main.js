var screen;

function main() {
    var volume = new KVS.LobsterData();
    screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
        targetDom: document.getElementById( 'display' ),
        enableAutoResize: false
    });

    var bounds = null;

    var surfaces = null;

    var ground = null;

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.8, window.innerHeight ] );
    });

    window.onload = function() {
        reset();
        document.getElementById( 'apply' ).onclick = function() { reset(); }
    }

    function reset() {
        var isovalue = document.getElementById( 'isovalue' ).value;
        var shading = document.getElementById( 'shading' ).vert.value;
        var refrection = document.getElementById( 'refrection' ).frag.value;
        var isBounds = document.getElementById( 'bounds' ).checked;
        var isGround = document.getElementById( 'ground' ).checked;

        if ( surfaces ) {
            screen.scene.remove( surfaces );
            surfaces.geometry.dispose();
            surfaces.material.dispose();
            surfaces = null;
        }

        if ( isGround ) {
            if ( !ground ) {
                ground = Ground( volume );
                screen.scene.add( ground );
            }
        } else {
            if ( ground ) {
                screen.scene.remove( ground );
                ground.geometry.dispose();
                ground.material.dispose();
                ground = null;
            }
        }

        var vert, frag;
        if ( shading == "phong" ) {
            vert = shading + ".vert";
            frag = shading + "_" + refrection + ".frag";
        } else /* if ( shading == "gourand" ) */ {
            vert = shading + "_" + refrection + ".vert";
            frag = shading + ".frag";
        }

        if ( isBounds ) {
            if ( !bounds ) {
                bounds = Bounds( volume );
                screen.scene.add( bounds );
            }
        } else {
            if ( bounds ) {
                screen.scene.remove( bounds );
                bounds.geometry.dispose();
                bounds.material.dispose();
                bounds = null;
            }
        }

        surfaces = Isosurfaces( volume, isovalue, vert, frag );
        screen.scene.add( surfaces );
    }

    screen.loop();
}
