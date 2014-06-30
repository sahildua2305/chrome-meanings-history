function regexQuery(string) {
	var regexS = "google.+q=(.+?)&";
	var regex = new RegExp(regexS);
	var results = regex.exec(string);
	if (results == null) 
		return false;
	else
		return results[1];
}

function extractDataFromHistory(){
	//document.getElementById('history').innerHTML = "hi";
	chrome.history.search({text: "google", maxResults: 100000}, function(historyItems){
		var data = '';
		for(var i=0; i<historyItems.length; i++){
			var url = historyItems[i].url;
			if(url.indexOf('google')>-1 && url.indexOf('q=')>-1 && regexQuery(url) && regexQuery(url).indexOf('&')!=0){
				data += regexQuery(url).replace(/\+/g, ' ');
				data += "<br>";
				//data += url;
				data += "<br>";
			}
		}
		document.getElementById('history').innerHTML = data;
	});
}

document.addEventListener('DOMContentLoaded', function(){
	extractDataFromHistory();
});