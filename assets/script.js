//RegExp function for getting a query keyword from google query link
function regexComp(link) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	link = link.replace(/(\?[\S]*)(#)/,"$1&"); 
	var regexS = "[\\?&]q=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(link);
	if( results == null )
		return false;
	else
		return results[1];
}

function extractDataFromHistory(){
	//Call to Chrome History API
	chrome.history.search({text: "", maxResults: 100000}, function(historyItems){
		var data = "<table border='1'>";
		data += "<tr><th>Search Query</th><th>Number of times</th></tr>";
		
		//local variable array
		//var historyLinks = new Array();
		
		//Iterating over all links in history which are from google and contain a search query
		for(var i=0; i<historyItems.length; i++){
			var url = historyItems[i].url;
			if(url.indexOf('google')>-1 && url.indexOf('q=')>-1 && regexComp(url) && regexComp(url).indexOf('&')!=0){
				var count = historyItems[i].visitCount;
				var keyword = decodeURI(regexComp(url).replace(/\+/g, ' '));
				//var history = new Array(keyword, count);
				
				//historyLinks.push(history);//push the query keyword to array with count of visits
				
				data += "<tr>";
				data += "<td id='keyword'><a href='"+url+"' target='_blank'>"+keyword+"</a></td>";
				data += "<td id='count'>"+count+"</td>";
				data += "</tr>";
			}
		}
		data += "</table>";
		document.getElementById('history').innerHTML = data;
	});
}

document.addEventListener('DOMContentLoaded', function(){
	extractDataFromHistory();
});