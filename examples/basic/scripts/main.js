/*              ·~=≠≠x#≠≠=-                         ·=≈≠xxx≠≈~-·              
            ·~≠#%&$$$$&%x≈~·                        ~=≠#%$$$$$&%x≈-           
          ~x&$$$$$$$x~·  -%~                        #≈   -≈&$$$$$$$#≈·        
        =%$$$$$$$$$$-  -≠$$-                        x$%=·  x$$$$$$$$$&≠-      
      -%$$$$$$$$$$$$$%%$$$≈                         ·&$$&%&$$$$$$$$$$$$&≠     
     ·&$$$$$$$$$$$$$$$$$&=                           ·#$$$$$$$$$$$$$$$$$$≈    
     ≈$$$$$$$$$$$$$$$$$#-                              ≈&$$$$$$$$$$$$$$$$$    
     ≈$$$$$$$$$$$$$$$$$                                 ≈$$$$$$$$$$$$$$$$$    
     ·%$$$$$$$$$$$$$$$≈                                  &$$$$$$$$$$$$$$$=    
      ~#$$$$$$$$$$$$&≈                                   ·#$$$$$$$$$$$$&x     
      #%%%&&$$$$$&%≈-     =-   ·-=≈≈xxxxxx≠≠=~-·  -=       =x%$$$$$$&&%%&-    
      ≈$$&&%###≠~-       ·$&≈x%&$$$$$$$$$$$$$$$%#≠&$-        ·-≈###%&&$$%     
       #$$$$$$$x        ·≈$$$$$$$$$$$$$$$$$$$$$$$$$$%≈-        -$$$$$$$$~     
       ·x&$$&&%##≈-   ~x&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$#=·  ·=x#%&&&$&%=      
         -%&$$$$$$$≠=%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&x≈%$$$$$$$&≈        
           -=≠x#%&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%#≠=~·         
             ·~≠%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%≠=-·          
≈====≈≠≠≠xx#%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&%%#xx≠≠≈=≈
%&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&%
 ··-=x%$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%x=-·· 
       -≈#&$$$$$$$$$$$$$$$$$$$$&$$$$$$$$$$$$$$&$$$$$$$$$$$$$$$$$$$$&#≈-       
          ·=%$$$$$$$$$$$$$$$$$$%=x%$$$$$$$$%≠~%$$$$$$$$$$$$$$$$$$%=·          
     ·-~≈≠x#%$$$$$$$$$$$$$$$$$$$x  -x$$$$≠·  x$$$$$$$$$$$$$$$$$$$%#x≠≈~-·     
   =≠&$$$$$%%%&$&%$$$$$$$$$$$$$$$%≠≠%$$$$%≠≠&$$$$$$$$$$$$$$$%&$&%%%$$$$$&≠~   
  -$&$&#≠==x&$$%%$$~~≠#&$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$&#≠~~$$%%$$&x==≠#%$%$=  
  ≈$$$~  ≈%$$#x&$$~    ·-=≠#%&&$$$$$$$$$$$$$$$$&%%#≠=-·    ~$$&x#$$%≈  -$$$x  
  ≠$$≠  #$$%-~%$#~           ··-~~==========~~-··           ~#$%~·%$$#  =$$#  
  ≠$%  ·$$#·-$&≈                                              ≠&$-·#$$·  #$#  
  ≈$=  ~$%  -$&                                                &$·  %$~  -$x  
  -&   ~$~   &≠                                                #%   ~$~   #=*/




/*


	TWIST NOTATION

	UPPERCASE = Clockwise to next 90 degree peg
	lowercase = Anticlockwise to next 90 degree peg



	FACE & SLICE ROTATION COMMANDS

	F	Front
	S 	Standing (rotate according to Front Face's orientation)
	B 	Back
	
	L 	Left
	M 	Middle (rotate according to Left Face's orientation)
	R 	Right
	
	U 	Up
	E 	Equator (rotate according to Up Face's orientation)
	D 	Down



	ENTIRE CUBE ROTATION COMMANDS
	
	X   Rotate entire cube according to Right Face's orientation
	Y   Rotate entire cube according to Up Face's orientation
	Z   Rotate entire cube according to Front Face's orientation



	NOTATION REFERENCES

	http://en.wikipedia.org/wiki/Rubik's_Cube#Move_notation
	http://en.wikibooks.org/wiki/Template:Rubik's_cube_notation


*/




$(document).ready( function(){ 

	const useLockedControls = true,
		controls = useLockedControls ? ERNO.Locked : ERNO.Freeform;

	const ua = navigator.userAgent,
		isIe = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1;

	window.cube = new ERNO.Cube({
		hideInvisibleFaces: true,
		controls: controls,
		renderer: isIe ? ERNO.renderers.IeCSS3D : null
	});


	const container = document.getElementById( 'container' );
	container.appendChild( cube.domElement );



	if( controls === ERNO.Locked ){
		const fixedOrientation = new THREE.Euler(  Math.PI * 0.1, Math.PI * -0.25, 0 );
		cube.object3D.lookAt( cube.camera.position );
		cube.rotation.x += fixedOrientation.x;
		cube.rotation.y += fixedOrientation.y;
		cube.rotation.z += fixedOrientation.z;
	}


	// The deviceMotion function provide some subtle mouse based motion
	// The effect can be used with the Freeform and Locked controls.
	// This could also integrate device orientation on mobile

	const motion = deviceMotion( cube, container );

	motion.decay = 0.3; 				// The drag effect
	motion.range.x = Math.PI * 0.03;	// The range of rotation 
	motion.range.y = Math.PI * 0.03;
	motion.range.z = 0;
	// motion.paused = false;				// disables the effect

	const info = document.getElementById("info");
	let reset = document.createElement('h3');
	reset.onclick = () => presets.presetReset.call(cube);
	reset.innerText = "RESET";
	reset.className = "reset-button";
	info.appendChild(reset);

	let skills = document.createElement('h3');
	skills.onclick = () => presets.presetShowTech.call(cube);
	skills.innerText = "SKILLS";
	skills.className = "skills-button";
	info.appendChild(skills);

	let picture = document.createElement('h3');
	picture.onclick = () => presets.presetShowPic.call(cube);
	picture.innerText = "PHOTO";
	picture.className = "picture-button";
	info.appendChild(picture);

	let about = document.createElement('h3');
	about.innerText = "ABOUT";
	about.className = "about-button";

	let aboutModal = document.getElementById('aboutModal');
	about.onclick = () => aboutModal.style.display = "flex";
	info.appendChild(about);

	let modalContent = document.createElement( 'div' );
	modalContent.className = "modal-content";
	aboutModal.appendChild(modalContent);

	let span = document.createElement( 'div' );
	span.className = "close";
	span.innerHTML = '<img id="close-icon" src="https://davidfpease.github.io/build/media/close.png">';
	modalContent.appendChild(span);
	span.onclick = ()=> {
		aboutModal.style.display = "none";
	}

	let content = document.createElement( 'div' );
	content.innerHTML = `<h1 class="code-line">About David Pease</h1>
	<p>Hi. I’m a former Army helicopter <img id="chinook" src="https://raw.githubusercontent.com/davidfpease/davidfpease.github.io/master/build/media/chinook.png" alt="Chinook"> pilot turned software engineer. I love to solve real-world problems with practial applications of technology. When I’m not coding I spend my time woodworking, hiking, or building low-poly papercraft models.</p>
	<br><h1 class="code-line" >About this page</h1>
	<p>I simply added my own <span class="tooltip">twist<span class="tooltiptext">Pun intended!</span></span> to Google’s open source <a href="https://www.google.com/doodles/rubiks-cube">Cuber</a>.<br>
	Cuber's source code shared on <a href="https://github.com/devdude123/Chrome-Cube-Lab---Cuber">GitHub</a>– <a href="https://github.com/devdude123/Chrome-Cube-Lab---Cuber/blob/master/cuber/src/LICENSE.md">License</a>.<br>
	And Google’s <a href="https://www.chrome.com/cubelab">Cuber Lab</a>.</p>`;
	
	modalContent.appendChild(content);

	window.onclick = function (event) {
		if (event.target == aboutModal) {
			aboutModal.style.display = "none";
		}
	} 

	
	

})

$(window).on("load", ()=>{
	// marquee code

	let marqueeSquares = document.getElementsByClassName("marquee");
	let counter = 9;
	let name = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'D', 'a', 'v', 'i', 'd', ' ', ' ', 'P', 'e', 'a', 's', 'e', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']

	const marqueeScroll = () => {

		// if (counter < name.length){
		marqueeSquares[8].innerHTML = '<img class="marquee-img" src="https://davidfpease.github.io/build/media/davidpease.png">'; //name[counter];
		marqueeSquares[5].innerHTML = '<img class="marquee-img" src="https://davidfpease.github.io/build/media/davidpease.png">'; //name[Math.abs((counter-1))];
		// marqueeSquares[2].innerText = name[Math.abs((counter-2))];
		// marqueeSquares[7].innerText = name[Math.abs((counter-3))];
		// marqueeSquares[4].innerText = name[Math.abs((counter-4))];
		// marqueeSquares[1].innerText = name[Math.abs((counter-5))];
		// marqueeSquares[6].innerText = name[Math.abs((counter-6))];
		// marqueeSquares[3].innerText = name[Math.abs((counter-7))];
		// marqueeSquares[0].innerText = name[Math.abs((counter-8))];
		// debugger;

		counter++;
		counter === name.length ? counter = 0 : null;
	}






	marqueeScroll();
	//window.setInterval(marqueeScroll, 3000);
});
