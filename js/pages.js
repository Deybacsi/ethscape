
/*
   gets the binary data from a Tx, and returns in plain text
*/
function ethscape_getSource(txPage) {
	var jsondata=null;
	if (txPage != null ) {
		
		$.ajax({
			url: "https://api.ethplorer.io/getTxInfo/"+txPage+"?apiKey="+ethscape_apiKey,
			async: false,
			dataType: 'json',
			success: function (data) {
				jsondata=data;
			}
		});
		if (jsondata.input != undefined) {
			return ethscape_hexToChar(jsondata.input);
		} else {
			console.log(jsondata);
			if (jsondata.error) {
				return "Error: " + jsondata.error.code+" - "+ jsondata.error.message;
			} 
			return "Unknown error";
		}
	} else {
		return "No Tx";
		
	}
}
/*
 * convert hexstring to characters
 */
function ethscape_hexToChar(s) {
	return decodeURIComponent(s.replace(/\s+/g, '').replace(/[0-9a-f|0-9A-F]{2}/g, '%$&'));
}

/*
   sets a page's source to the specified string
*/
function ethscape_setPageSource(pageNo, sourceHtml) {
	if (pageNo == 0) {
		pageNo = ethscape_tabIndex;
	}
	// trim the 0x if present
	if (sourceHtml.substring(0,2) == "0x") {
		var finalSource = sourceHtml.substring(2,sourceHtml.length);
	} else {
		var finalSource = sourceHtml;
	}
	console.log(finalSource);
	// if source contains html tags
	// and a hack for starting <UTF8> tag if exists -> cut first and last 4 chars ( "<UTF" and "TF8>" )
	// I hope future ethpages will contain more than 1 html tag... o_O ;)
	if ( ! /<[a-z][\s\S]*>/i.test(finalSource.substr(4,finalSource.length-4) )  ) {
		var sourceOpen="<pre style='white-space: pre-wrap;'>";	var sourceClose="</pre>";
	} else {

		var sourceOpen=""; var sourceClose="";
	}

	finalSource = sourceOpen + finalSource + sourceClose;
	ethscape_parseSourceHtml(pageNo, finalSource);
	document.getElementById("ethscape_page"+pageNo).contentWindow.document.body.innerHTML = finalSource;

}
/*
 * parse the sourcehtml and do some thingies
 */
function ethscape_parseSourceHtml(pageNo,sourceHtml) {
	var title="Page "+pageNo;
	var html = $.parseHTML(sourceHtml);
	$.each( html, function( ind, elem ) {
		if (elem.nodeName == "TITLE") {
			title = elem.textContent.substr(0,40);
			var tab = $('#ethscape-tabs').tabs('getTab', pageNo-1);
			$('#ethscape-tabs').tabs('update', {
				tab: tab,
				type: 'header',
				options: {
					title: title
				}
			});
		}
	});
}


var ethscape_tabIndex = 0;

/*
   add new tab
*/
function ethscape_addTab(sourceHtml){
	ethscape_tabIndex++;
	$('#ethscape-tabs').tabs('add',{
		title: 'Page'+ethscape_tabIndex,
		closable: true,
		content: ethscape_newTabLayout(ethscape_tabIndex)
		
	});
	ethscape_resizeIframe(ethscape_tabIndex);
	if (sourceHtml) {
		ethscape_setPageSource(ethscape_tabIndex,sourceHtml);
	} else {
		ethscape_setPageSource(ethscape_tabIndex,ethscape_newTabContent(ethscape_tabIndex));
	}
}

/*
 * removes the active tab
 */
function ethscape_removeTab(){
	$('#ethscape-tabs').tabs('close', ethscape_getActiveTab());
}
/*
 * get active tab index
 */
function ethscape_getActiveTab() {
	var tab = $('#ethscape-tabs').tabs('getSelected');
	if (tab){
		return $('#ethscape-tabs').tabs('getTabIndex', tab);
	} else {
		// if there is no tab, then open a new one and give back the index 0 ;)
		ethscape_addTab();
		return 0;
	}
	
}

/*
   resize the f* iframe, because i'm too lame to write proper CSS :/
*/
function ethscape_resizeIframe (pageNo) {
	$('#ethscape_page'+pageNo).height(
		$('#ethscape_page'+pageNo).height()
		-$('#ethscape_searchbar'+pageNo).height()
		-$('#ethscape-tabtools').height()
		
		-10
	);
	// 10 is .ethscape_searchbar margin 5+5 px
	// todo: change to a nicer calc
}

function ethscape_search(searchText) {
	ethscape_setPageSource(ethscape_getActiveTab()+1,ethscape_getSource(searchText));					        
}
