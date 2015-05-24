
window.onload=function(){

	virastar=new Virastar();
	var input=document.getElementById('textarea');
	var output=document.getElementById('plain');

	function viraiesh(){
	    output.innerHTML=virastar.cleanup(input.value).replace(/\n/g,"</br>")

	}
	viraiesh();
	document.getElementById('submit').onclick=viraiesh;
	input.onchange=viraiesh;
	input.onkeyup = viraiesh;


	ZeroClipboard.config( {
		trustedDomains: ["*"],
		swfPath: "https://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.swf"
	} );

	var ZClient = new ZeroClipboard( document.getElementById("copy_button") );

	// ZClient.on( "copy", function (event) {
	//   var clipboard = event.clipboardData;
	//   clipboard.setData( "text/plain", "Copy me!" );
	//   clipboard.setData( "text/html", "<b>Copy me!</b>" );
	//   clipboard.setData( "application/rtf", "{\\rtf1\\ansi\n{\\b Copy me!}}" );
	// });

	ZClient.on( "ready", function( readyEvent ) {
		console.log( "ZeroClipboard SWF is ready!" );

		ZClient.on( "aftercopy", function( event ) {
			// `this` === `client`
			// `event.target` === the element that was clicked
			// event.target.style.display = "none";
			console.log("Copied text to clipboard: " + event.data["text/plain"] );
		} );
	} );

}
