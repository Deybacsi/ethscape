
function initAll() {
	ethscape_addTab();
	
	
	$( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
		ethscape_setPageSource(ethscape_getActiveTab()+1,ethscape_getSource('Ajax error:'+thrownError));
	});
	//$('#main').html(getSource());
}
