/*
* TaskBar.js
* This source file is part of the MetaDesktop Lightweight Webtop Environment (LWE).
* MetaDesktop is free software, licensed under the GNU GPL (General Public License).
* You are free to modify, redistribute, and change this program in any way.
*/

//instance variables
TaskBar.prototype.barName;
TaskBar.prototype.bar;

function TaskBar(barName) {
	//first, create the task bar
	bar = document.createElement("div");
	bar.id = barName;
	bar.className = "taskbar";
	bar.style.width = "100%";
	bar.style.position = "fixed";
	bar.style.bottom = "0px";
	bar.style.left = "0px";
	bar.style.zIndex = "3";
	
	//now set up pointers and add the taskbar
	this.barName = barName;
	this.bar = bar;
	document.getElementById("taskbar").appendChild(bar);
}

//methods
TaskBar.prototype.AddEntry = function(windowId) {
	with (this) {
		//windowId.TaskBarEntry.onclick = windowId.Destroy;
		//document.write(this.bar);
		//document.write(windowId.TaskBarEntry);
//		theBar = document.getElementById(this.b);
		this.bar.appendChild(windowId.TaskBarEntry);
	}
}

TaskBar.prototype.RemoveEntry = function(windowId) {
	with (this) {
		bar = document.getElementById(this.barName);
		bar.removeChild(windowId);
	}
}	

