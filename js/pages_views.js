function ethscape_newTabLayout(tabIndex) {
	return `
	<div class="easyui-panel" style="height:100%;">

		<div class="ethscape_searchbar" id="ethscape_searchbar`+ tabIndex+ `">
			<!-- fucking lame solution rulez! -->
			<table width=100%>
				<tr>
					<td>
						<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-bullet_left'"></a>
						<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-bullet_right'"></a>
					</td>
					<td>
						<input class="easyui-searchbox" data-options="prompt:'Enter a Tx...',searcher:ethscape_search" style="width:100%;">
					</td>
				</tr>
			</table>
			
        </div>
			
			

		<iframe id="ethscape_page`+ tabIndex+ `" class="ethscape_page_iframe"></iframe>

	</div>

	`;
}


function ethscape_newTabContent(tabIndex) {
	return `
	<html>
		<body>
			<h1>Hello world `+tabIndex+` </h1>
			<p>Lorem ipsum</p>
		</body>
	</html>
	`;
}

function ethscape_bookmarksContent() {
	var bookmarksContent=`
		<html>
			<head><title>Bookmarks</title></head>
			<body>
				<h1>Bookmarks</h1>
				Sorry, it's just plaintext now.<br> Please copy Tx from the below list and paste to addressbar.
				<ul>
			`;
				ethscape_bookmarks.forEach(function(element) {
					bookmarksContent += "<li>"+element.desc+" - "+element.tx+"</li>";
				});
	bookmarksContent += `
				</ul>
			</body>
		</html>
	`;
	
	return bookmarksContent;
}

function ethscape_aboutContent() {
	return `
		<html>
			<head><title>About</title>
			</head>
			<body>
				<h1>ETHscape `+ethscape_version+`</h1>
				<h3>A browser for eternity</h3>
				<p>Time has come.<br><br>
				We have blockchain, we have digital cash, we can store unalterable data on the net.<br>
				And we are able to add custom data to every blockchain transaction. For example HTML text. ;)<br><br>
				What does it mean?<br>We can store webpages for eternity.<br>
				</p>
				<p>Keep in mind: <strong>With great power comes great responsibility.</strong><br> 
				Please use it wisely.</p>
				<p>
				Please check the Bookmarks page for examples.
				</p>
				<p>
				If you made a cool page, then please send it to my ETH address as a transaction, and I'll include it in the next release. :)<br>
				ETH: 0x1487e06CFAB2Be159C455863A72E6Ba2D5f624D1<br>
				Donations also accepted here ;)
				</p>
				<p>Any feedback appreciated. ;) <br> Contact: ethscapebrowser@gmail.com</p>
				<p>Powered by <a href="https://ethplorer.io" rel="nofollow">Ethplorer.io</a></p>
			</body>
		</html>
	`;
	
}
