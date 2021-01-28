
var presets = {
	presetReset: function () {
		
		var cube = this;	
		cube.twistDuration = 50;
		cube.rotation.y = -0.7853981633974483;
		while (cube.twistQueue.history.length > 0){
			cube.undo();
		}
		//cube.twistDuration = 500;
	},

	presetHardReset: function () {
		var useLockedControls = true,
			controls = useLockedControls ? ERNO.Locked : ERNO.Freeform;

		var ua = navigator.userAgent,
			isIe = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1;

		window.cube = new ERNO.Cube({
			hideInvisibleFaces: true,
			controls: controls,
			renderer: isIe ? ERNO.renderers.IeCSS3D : null
		});

		const container = document.getElementById('container');
		var cubeElement = document.getElementsByClassName('cube')[0];
		cubeElement.replaceWith(cube.domElement);

		if (controls === ERNO.Locked) {
			var fixedOrientation = new THREE.Euler(Math.PI * 0.1, Math.PI * -0.25, 0);
			cube.object3D.lookAt(cube.camera.position);
			cube.rotation.x += fixedOrientation.x;
			cube.rotation.y += fixedOrientation.y;
			cube.rotation.z += fixedOrientation.z;
		}


		// The deviceMotion function provide some subtle mouse based motion
		// The effect can be used with the Freeform and Locked controls.
		// This could also integrate device orientation on mobile

		var motion = deviceMotion(cube, container);

		motion.decay = 0.3; 				// The drag effect
		motion.range.x = Math.PI * 0.03;	// The range of rotation 
		motion.range.y = Math.PI * 0.03;
		motion.range.z = 0;
	},

	presetShowTech: function () {
		var cube = this;
		let len = cube.twistQueue.history.length;
		cube.rotation.y = 0;	
		if (len === 0){
			cube.twist( ' y ');
		} else {
			cube.twistDuration = 1;
			while (cube.twistQueue.history.length > 0) {
				cube.undo();
			}
			setTimeout( ()=>{
				cube.twist(' y ');
				cube.twistDuration = 500;}, 1000);
		}
	},
	presetProjects: function () {
		var cube = this;
		let len = cube.twistQueue.history.length;
		cube.rotation.y = 0;	
		if (len === 0){
			cube.twist( ' x ');
		} else {
			cube.twistDuration = 1;
			while (cube.twistQueue.history.length > 0) {
				cube.undo();
			}
			setTimeout( ()=>{
				cube.twist(' x ');
				cube.twistDuration = 500;}, 1000);
		}
	},

	presetShowPic: function () {
		var cube = this;
		let len = cube.twistQueue.history.length;	
		if (len === 0){
			cube.twist( ' X ');
			cube.rotation.y = 0;
		} else {
			cube.rotation.y = 0;
			cube.twistDuration = 1;
			while (cube.twistQueue.history.length > 0) {
				cube.undo();
			}
			setTimeout( ()=>{
				cube.twist(' X ');
				cube.twistDuration = 500;}, 1000);
		}
	},


	presetBling: function(){

			var cube = this;

			this.position.y = -2000;
			new TWEEN.Tween( this.position )
				.to({ 
					y: 0
				}, 1000 * 2 )
				.easing( TWEEN.Easing.Quartic.Out )
				.start();
			this.rotation.set(
				
				( 180 ).degreesToRadians(),
				( 180 ).degreesToRadians(),
				(  20 ).degreesToRadians()
			);
			new TWEEN.Tween( this.rotation )
				.to({ 

					x: (  25 ).degreesToRadians(), 
					y: ( -30 ).degreesToRadians(),
					z: 0

				}, 1000 * 3 )
				.easing( TWEEN.Easing.Quartic.Out )
				.onComplete( function(){

					cube.isReady = true;

				})
				.start();
			this.isReady = false;

			
			//  And we want each Cubelet to begin in an exploded position and tween inward.

			this.cubelets.forEach( function( cubelet ){
	

				//  We want to start with each Cubelet exploded out away from the Cube center.
				//  We're reusing the x, y, and z we created far up above to handle Cubelet positions.

				var distance = 1000;
				cubelet.position.set(

					cubelet.addressX * distance,
					cubelet.addressY * distance,
					cubelet.addressZ * distance
				);


				//  Let's vary the arrival time of flying Cubelets based on their type.
				//  An nice extra little but of sauce!

				var delay;
				if( cubelet.type === 'core'   ) delay = (   0 ).random(  200 );
				if( cubelet.type === 'center' ) delay = ( 200 ).random(  400 );
				if( cubelet.type === 'edge'   ) delay = ( 400 ).random(  800 );
				if( cubelet.type === 'corner' ) delay = ( 800 ).random( 1000 );


				new TWEEN.Tween( cubelet.position )
					.to({

						x: 0,
						y: 0,
						z: 0
					
					}, 1000 )
					.delay( delay ) 
					.easing( TWEEN.Easing.Quartic.Out )	
					.onComplete( function(){

						cubelet.isTweening = false;
					})
					.start();
				
				cubelet.isTweening = true;
			});

		},
	presetNormal: function(){
		console.log( 'test' )
		$( 'body' ).css( 'background-color', '#000' );
		$( 'body' ).addClass( 'graydient' );
		setTimeout( function(){ $( '.cubelet' ).removeClass( 'purty' )}, 1 );;
		this.show();
		this.showIntroverts();
		this.showPlastics();
		this.showStickers();
		this.hideTexts();
		this.hideWireframes();
		this.hideIds();
		this.setOpacity();
		this.setRadius();
		//updateControls( this );
	},


	presetText: function( virgin ){
		$( 'body' ).css( 'background-color', '#F00' );
		$( 'body' ).removeClass( 'graydient' );
		setTimeout( function(){ $( '.cubelet' ).removeClass( 'purty' )}, 1 );;

		var cube = this;

		// setTimeout( function(){

			cube.show();
			cube.hidePlastics();
			cube.hideStickers();
			cube.hideIds();
			cube.hideIntroverts();
			cube.showTexts();
			cube.hideWireframes();
			cube.setOpacity();
			//updateControls( cube );
		
		// }, 1 );
	},
	presetLogo: function(){
		var cube = this;

		this.isReady = false
		this.presetText()			
		new TWEEN.Tween( cube.rotation )
		.to({ 
			x: 0,
			y: ( -45 ).degreesToRadians(),
			z: 0
		}, 1000 * 2 )
		.easing( TWEEN.Easing.Quartic.Out )
		.onComplete( function(){

			//updateControls( cube )
			cube.isReady = true
			cube.twist( 'E20d17' )
		})
		.start()
	},
	presetTextAnimate: function(){//  Specifically for Monica!
		var 
		delay = 1,//1000 * 2,
		twistDurationScaled = [ (20+90).absolute().scale( 0, 90, 0, cube.twistDuration ), 250 ].maximum()
		_this = this

		cube.shuffleMethod = cube.ALL_SLICES
		presetHeroic( virgin )
		setTimeout( function(){ 

			_this.twist( 'E', 20 )
		}, delay )
		setTimeout( function(){ 

			_this.twist( 'd', 20 )
			//$('body').css('background-color', '#000')
		}, delay + 1000 )
		setTimeout( function(){

			_this.twist( 'D', 20 + 90 )		
			_this.isRotating = true
		}, delay + 1000 * 2 )
		setTimeout( function(){

			_this.twist( 'e', 20 + 90 )
			_this.isShuffling = true
		}, delay + 1000 * 2 + twistDurationScaled + 50 )
		//updateControls( this )
	},
	presetWireframe: function( included, excluded ){
		setTimeout( function(){ $( '.cubelet' ).removeClass( 'purty' )}, 1 )
		this.showIntroverts()
		if( included === undefined ) included = new ERNO.Group( this.cubelets )
		if( excluded === undefined ){

			excluded = new ERNO.Group( this.cubelets )
			excluded.remove( included )
		}						
		this.show()		
		excluded.showPlastics()
		excluded.showStickers()
		excluded.hideWireframes()
		included.hidePlastics()
		included.hideStickers()
		included.showWireframes()
		//updateControls( this )
	},
	presetHighlight: function( included, excluded ){
		// if( erno.state === 'setup' ) this.presetBling()
		if( included === undefined ) included = new ERNO.Group( this.cubelets )
		if( excluded === undefined ){

			excluded = new ERNO.Group( this.cubelets )
			excluded.remove( included )
		}
		excluded.setOpacity( 0.1 )
		included.setOpacity()
		//updateControls( this )
	},
	presetHighlightCore: function(){

		this.presetHighlight( this.core )
		//updateControls( this )
	},
	presetHighlightCenters: function(){

		this.presetHighlight( this.centers )
		//updateControls( this )
	},
	presetHighlightEdges: function(){

		this.presetHighlight( this.edges )
		//updateControls( this )
	},
	presetHighlightCorners: function(){

		this.presetHighlight( this.corners )
		//updateControls( this )
	},
	presetHighlightWhite: function(){

		this.presetHighlight( this.hasColor( WHITE ))
		//updateControls( this )
	},
	presetPurty: function(){

		this.showIntroverts()
		setTimeout( function(){ 
			
			$( '.cubelet' ).addClass( 'purty' )

		}, 1 )
		this.rotation.set(

			( 35.3).degreesToRadians(),
			(-45  ).degreesToRadians(),
			   0
		)
		//updateControls( this )
	},
	presetDemo: function(){
		var 
		cube  = this,
		loops = 0,
		captions = $( '#captions' )

		this.taskQueue.add(


			//  Rotation and twist demo.

			function(){

				cube.rotationDeltaX = -0.1
				cube.rotationDeltaY = 0.15
				cube.isRotating = true
				cube.presetNormal()
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.twist( 'rdRD'.multiply( 6 ))
			},


			//  Opacity demo.
			
			function(){

				cube.back.setOpacity( 0.2 )
				cube.taskQueue.isReady = false					
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.standing.setOpacity( 0.2 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.twist( 'rdRD'.multiply( 3 ))
			},
			function(){

				cube.showFaceLabels()
				cube.twist( 'rdRD'.multiply( 3 ))
			},
			function(){

				cube.hideFaceLabels()
				cube.standing.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.back.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},


			//  Radial demo.

			function(){

				cube.down.setRadius( 90 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.equator.setRadius( 90 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.up.setRadius( 90 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.twist( 'rdRD'.multiply( 2 ))
			},
			function(){

				cube.back.setRadius()
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.standing.setRadius()
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.twist( 'rdRD'.multiply( 2 ))
			},
			function(){

				var 
				excluded = new ERNO.Group( cube.cubelets ),
				included = cube.hasColors( RED, YELLOW, BLUE )

				excluded.remove( included )
				excluded.setRadius()
				excluded.setOpacity( 0.5 )
				included.setRadius( 120 )
				included.setOpacity( 1 )

				cube.back.setRadius()
				cube.showIds()
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, (6).seconds() )
			},
			function(){

				cube.twist( 'rdRD'.multiply( 2 ))
			},
			function(){

				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, (6).seconds() )
			},
			function(){

				cube.setRadius()
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, (3).seconds() )
			},


			//  A cube is made up of cubelets
			//  and these can be a core or centers, edges, and corners.

			function(){
				
				captions.text( 'Core' ).fadeIn()
				cube.presetHighlightCore()
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )					
			},
			function(){
				
				cube.showIds()
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, (2).seconds() )	
			},
			function(){

				cube.twist( 'rdRD'.multiply( 2 ))
			},
			function(){

				captions.text( 'Centers' )
				cube.presetHighlightCenters()
				cube.twist( 'rdRD'.multiply( 4 ))
			},
			function(){

				captions.text( 'Edges' )
				cube.presetHighlightEdges()
				cube.twist( 'rdRD'.multiply( 3 ))
			},
			function(){

				captions.text( 'Corners' )
				cube.presetHighlightCorners()
				cube.twist( 'rdRD'.multiply( 3 ))
			},
			function(){
				
				captions.fadeOut()
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, (2).seconds() )	
			},


			//  Wireframe demo.
			
			function(){

				cube.left.setOpacity( 0 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.left
					.hidePlastics()
					.hideStickers()
					.showWireframes()
					.showIds()
					.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.middle.setOpacity( 0 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){
				
				cube.middle
					.hidePlastics()
					.hideStickers()
					.showWireframes()
					.showIds()
					.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.right.setOpacity( 0 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.right
					.hidePlastics()
					.hideStickers()
					.showWireframes()
					.showIds()
					.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.twist( 'rdRD'.multiply( 3 ))
			},


			//  Text demo.

			function(){

				cube.left.setOpacity( 0 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.left
					.hidePlastics()
					.hideStickers()
					.hideWireframes()
					.hideIds()
					.showTexts()
					.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.middle.setOpacity( 0 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){
				
				cube.middle
					.hidePlastics()
					.hideStickers()
					.hideWireframes()
					.hideIds()
					.showTexts()
					.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.right.setOpacity( 0 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.right
					.hidePlastics()
					.hideStickers()
					.hideWireframes()
					.hideIds()
					.showTexts()
					.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.twist( 'rdRD'.multiply( 3 ))
			},
			function(){

				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 * 8 )
			},


			//  Return to Normal mode

			function(){

				cube.left.setOpacity( 0 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.left
					.showPlastics()
					.showStickers()
					.hideTexts()
					.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.middle.setOpacity( 0 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){
				
				cube.middle
					.showPlastics()
					.showStickers()
					.hideTexts()
					.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.right.setOpacity( 0 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},
			function(){

				cube.right
					.showPlastics()
					.showStickers()
					.hideTexts()
					.setOpacity( 1 )
				cube.taskQueue.isReady = false
				setTimeout( function(){ cube.taskQueue.isReady = true }, 1000 )
			},


			//  Loop it.

			function(){

				loops ++
				console.log( 'The cuber demo has completed', loops, 'loops.' )
				cube.twistQueue.history = []//  Lets just kill it outright.
			}
		)
		this.taskQueue.isLooping = true
		//updateControls( this )
	},
	presetDemoStop: function(){

		this.taskQueue.isLooping = false
		this.twistQueue.empty()
		this.taskQueue.empty()
		this.isRotating = false
		//updateControls( this )
	}
}