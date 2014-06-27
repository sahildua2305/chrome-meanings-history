
function extractDataFromHistory(){
	//document.getElementById('history').innerHTML = "hi";
	chrome.history.search({text: "", maxResults: 10}, function(historyItems){
		var data = '';
		for(var i=0; i<historyItems.length; i++){
			if(historyItems[i].url.indexOf('google')>-1){
				data += historyItems[i].url;
				//data += historyItems[i].url.indexOf('google');
				data += "<br>";
			}
		}
		document.getElementById('history').innerHTML = data;
	});
}

document.addEventListener('DOMContentLoaded', function(){
	extractDataFromHistory();
});