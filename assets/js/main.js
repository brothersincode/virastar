window.onload = function() {

	virastar = new Virastar({
		skip_markdown_ordered_lists_numbers_conversion: false,
		preserve_brackets: false,
		preserve_braces: false
	});

	var input = document.getElementById('textarea');
	var output = document.getElementById('plain');

	function viraiesh() {
		output.innerHTML = virastar.cleanup(input.value).replace(/\n/g, "</br>")
	}

	viraiesh();
	// document.getElementById('submit').onclick = viraiesh;
	input.onchange = viraiesh;
	input.onkeyup = viraiesh;

	var clipboard = new Clipboard('.copy');

	clipboard.on('success', function(e) {
		console.log(e);
	});

	clipboard.on('error', function(e) {
		console.log(e);
	});

	// ZeroClipboard.config({trustedDomains: ["juvee.github.io"], swfPath: "http://rawgit.com/zeroclipboard/zeroclipboard/master/dist/ZeroClipboard.swf"});
	//
	// var ZClient = new ZeroClipboard(document.getElementById("copy_button"));
	//
	// ZClient.on("ready", function(readyEvent) {
	// 	console.log("ZeroClipboard SWF is ready!");
	//
	// 	ZClient.on('copy', function(event) {
	// 		var text = document.getElementById('plain').innerHTML;
	// 		// var windowsText = text.replace(/\n/g, '\r\n');
	// 		var windowsText = text.replace(/<br\s*[\/]?>/gi, '\r\n');
	// 		event.clipboardData.setData('text/plain', windowsText);
	// 	});
	//
	// 	ZClient.on("aftercopy", function(event) {
	// 		console.log("Copied text to clipboard: " + event.data["text/plain"]);
	// 	});
	// });
}
