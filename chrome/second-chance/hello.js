var grayListedDomains = [
	"www.youtube.com",
	"www.facebook.com",
	"www.reddit.com"
]

var toDoDomain = "https://todoist.com"

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.url != undefined){ // multiple updated states will occur, some of which have an undefined URL.

		var url = new URL(changeInfo.url)
		var domain = url.hostname
		
		if (grayListedDomains.includes(domain)){
			
			var expectedTabProperties = {
				currentWindow: true
			}

			chrome.tabs.query(expectedTabProperties, function (tabs){
				var todoTabAlreadyExists = false
				for(var i = 0; i < tabs.length; i++) {
					var tab = tabs[i]
					if (tab.url.includes(toDoDomain)){
						todoTabAlreadyExists = true
						var windowId = tab.windowId
						var tabIndex = tab.index
						var highlightProperties = {windowId : windowId, tabs : tabIndex}
						chrome.tabs.highlight(highlightProperties)
						break
					}
				}
				if (todoTabAlreadyExists == false){	
					createNewToDoTab()
				}
			})
		}
	}
}); 

function createNewToDoTab(){
	var newTabProperties = {
		url : toDoDomain
	}
	chrome.tabs.create(newTabProperties)
}