/*
* WindowManager.js
* This source file is part of the MetaDesktop Lightweight Webtop Environment (LWE).
* MetaDesktop is free software, licensed under the GNU GPL (General Public License).
* You are free to modify, redistribute, and change this program in any way.
*/

/*
* WindowManager.js is a collection of mostly procedural functions that deal with managing the graphical interface.
* Examples include minimizing and destroying windows. Note that these functions are called by the convience methods
* in the MetaWindow class. 
*/

function GetTaskBarById(windowId) {
	barEntry = document.getElementById(windowId + "_Taskbar");
	if (barEntry)
		return barEntry.parentNode;
	else
		return null;
}

function DestroyWindowById(windowId) {
	//retrieve all the necessary information for a raw destroy
	windows = document.getElementById("windows");
	wind = document.getElementById(windowId);
	taskbarEntry = document.getElementById(windowId + "_Taskbar");
	taskbar = GetTaskBarById(windowId);
	
	//perform the raw destroy
	windows.removeChild(wind);
	taskbar.removeChild(taskbarEntry);
}

function ResizeWindowById(windowId, newXSize, newYSize) {

}

function SetWindowTransparency(windowId, amt) {
	windows = document.getElementById("windows");
	wind = document.getElementById(windowId + "_Window");
	titlebar = document.getElementById(windowId + "_Titlebar");
	wind.style.filter = "alpha\(opacity=." + amt + "\)";
	wind.style.opacity = "." + amt;
	titlebar.style.filter = "alpha\(opacity=." + amt + "\)";
	titlebar.style.opacity = "." + amt;
}
