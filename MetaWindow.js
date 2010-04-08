/*
* MetaWindow.js
* This source file is part of the MetaDesktop Lightweight Webtop Environment (LWE).
* MetaDesktop is free software, licensed under the GNU GPL (General Public License).
* You are free to modify, redistribute, and change this program in any way.
*/

/*
* This file contains the class definition for MetaWindow: the way all windows are displayed in the LWE.
* The class contains several methods which are actually links to global functions in the WindowManager.js
* file. They are provided as convience methods. The meat of this class is the constructor, where the title
* bar is set up, linked to the content pane, and numerous other things. It should also be noted that
* the windows have very minimal style information. This is because most of it is defined in theme.css.
*/

function MetaWindow(idName, initX, initY, width, height) {
	//first, create the dragger
	var newDragger = document.createElement("div");
	newDragger.id = idName + "_Titlebar";
	newDragger.className = "titlebar unfocused";
	newDragger.style.width = width + "px";
	newDragger.style.position = "absolute";
	newDragger.style.left = initX + "px";
	newDragger.style.top = (initY - 20) + "px";
	newDragger.innerHTML = idName + "<span class=\"windowbuttons\">__  [=]  <a href='javascript:void(0);' onclick=\"DestroyWindowById('" + idName + "');\">X</a></span>";
	var dragger = DragHandler.attach(newDragger); //allow the dragging to occur!

	
	//create the actual window
	var newWindow = document.createElement("div");
	newWindow.id = idName + "_Window";
	newWindow.className = "contentpane";
	newWindow.style.height = height + "px";
	newWindow.style.width = width + "px";
	newWindow.style.position = "absolute";
	newWindow.style.left = initX + "px";
	newWindow.style.top = initY + "px";
	
	//create a taskbar box thing
	//note this is NOT added in this method; it must be added manually after
	//creating the window by referring to the window's TaskBarEntry field.
	var newBar = document.createElement("div");
	newBar.id = idName + "_Taskbar";
	newBar.className = "taskbarentry unfocused";
	newBar.style.cssFloat = "left";
	newBar.style.clear = "none";
	newBar.innerHTML = "<center>" + idName + "<center>";

	newBar.onclick = function() {
		var fireOnThis = document.getElementById(idName);
		var evObj = document.createEvent('MouseEvents');
		evObj.initMouseEvent( 'mousedown', true, true, window, 1, 12, 345, 0, 0, false, false, true, false, 0, null );
		fireOnThis.dispatchEvent(evObj);
	}

	//set up pointers to variables and methods of this object
	//this.FocusWindow = MetaWindowFuncs.FocusWindow;
	this.baseId = idName;
	this.ContentPane = newWindow;
	this.TitleBar = newDragger;
	this.TaskBarEntry = newBar;
	this.Width = width;
	this.Height = height;
	//this.x = MetaWindowFuncs.x;
	//this.y = MetaWindowFuncs.y;
	//this.Destroy = MetaWindowFuncs.Destroy;
		
	//first create a container div for both the dragger and the window.
	//this is a bit confusing because the MetaWindow object points to various other things created here.
	//this is mostly used for window focusing.
	var newContainer = document.createElement("div");
	newContainer.id = idName;
	newContainer.style.height = height + "px";
	newContainer.style.width = width + "px";
	newContainer.Window = this;
	newContainer.onmousedown = this.FocusWindow;
	
	this.Container = newContainer;
	
	//now insert these elements into the page
	document.getElementById("windows").appendChild(newContainer);
	newContainer.appendChild(dragger);
	newContainer.appendChild(newWindow);	
	
	//now tie the window's movement to that of the dragger.
	dragger.drag = function(titlebar, x, y) {
		var wind = document.getElementById(idName + "_Window");
		wind.style.left = x;
		wind.style.top = y + 20;
	};	this.Container = newContainer;
	
	dragger.dragEnd = function(titlebar, x, y) {
		var wind = document.getElementById(idName + "_Window");
		wind.style.left = x;
		wind.style.top = y + 20;
	}	
}

MetaWindow.prototype.Destroy = function(e) {
	with(this) {
		DestroyWindowById(this.baseId);
	}
}

MetaWindow.prototype.GetTaskBar = function() {
	with (this) {
		//document.write(this.baseId);
		return GetTaskBarById(this.baseId);
		//barEntry = document.getElementById(this.baseId + "_Taskbar");
		//if (barEntry)
		//	return barEntry.parentNode;
		//else
		//	return null;
	}
}

MetaWindow.prototype.x = function() {
	with(this) {
		return this.ContentPane.style.left;
	}
}
MetaWindow.prototype.y = function() {
	with(this) {
		return this.ContentPane.style.top;
	}
}

MetaWindow.prototype.FocusWindow = function(e) {
	//document.write(this.id);
	//Unfocus all other windows.
	windows = document.getElementById("windows");
	//document.write(windows.innerHTML);
	for (c = 0; c < windows.childNodes.length; c++) {
		//document.write(windows.childNodes[c].id);
		windTitle = document.getElementById(windows.childNodes[c].id + "_Titlebar");
		windTitle.className = "titlebar unfocused";
		windTitle.style.zIndex = 0;
		windContent = document.getElementById(windows.childNodes[c].id + "_Window");
		windContent.style.zIndex = 0;
		//windows.childNodes[c].style.zIndex = 0;
		
		barEntry = document.getElementById(windows.childNodes[c].id + "_Taskbar");
		if (barEntry)
			barEntry.className = "taskbarentry unfocused";
	}
		
	//Focus on this window in particular.
	with(this) {
		//are we calling this directly from a window object? good thing javascript has any sense of class...
		if (!this.TitleBar) {
			//this.style.zIndex = 1;
			windTitle = document.getElementById(this.id + "_Titlebar");
			//document.write("tit " + windTitle);
			windTitle.className = "titlebar focused";
			windTitle.style.zIndex = 1;
			windContent = document.getElementById(this.id + "_Window");
			windContent.style.zIndex = 1;
		}
		else {
			document.write("focusing on " + this.baseId);
			this.TitleBar.className = "titlebar focused";
			this.TitleBar.style.zIndex = 1;
			this.ContentPane.style.zIndex = 1;
		}		
	
		barEntry = document.getElementById(this.id + "_Taskbar");
		if (barEntry)
			barEntry.className = "taskbarentry focused";
	}
}
