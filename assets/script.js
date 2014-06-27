
function extractDataFromHistory(){
	chrome.history.search({"text": "google"}, function(){
		document.getElementById('history').html('<p>Sahil</p>');
	});
}

document.addEventListener('DOMContentLoaded', function(){
	extractDataFromHistory();
}