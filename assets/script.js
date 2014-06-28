function gup (string,name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(string);
	if (results == null) {
		return '.';
	else
		return results[1];
}

function extractDataFromHistory(){
	//document.getElementById('history').innerHTML = "hi";
	chrome.history.search({text: "", maxResults: 1000}, function(historyItems){
		var data = '';
		for(var i=0; i<historyItems.length; i++){
			var url = historyItems[i].url;
			if(url.indexOf('google')>-1 && url.search('q=')){
				//data += historyItems[i].url.indexOf('google');
				data += gup(url, 'q');
				data += "<br>";
				data += "<br>";
			}
		}
		document.getElementById('history').innerHTML = data;
	});
}

document.addEventListener('DOMContentLoaded', function(){
	extractDataFromHistory();
});