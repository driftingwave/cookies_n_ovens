function Cookie(type, bake_time) {
	this.cookie_id = 0;
	this.type = type;
	this.bake_time = bake_time;
	this.cook_time = 0;
	this.status = "raw";
}
 
Cookie.prototype.updateStatus = function(){
	if(this.cook_time < this.bake_time){
		this.status = "still_gooey"
	}
	else if (this.cook_time == this.bake_time){
		this.status = "just_right"
	}
	else{
		this.status = "crispy"
	}
} 
 
var PrepTable = {}
prepTableCookies = []
 
PrepTable.addCookie = function(cookie){
	this.cookie = cookie
	prepTableCookies.push(cookie)
}
 
 
var Oven = {}
Oven.init = function(ovenCookies) {
	this.ovenCookies = ovenCookies
}
 
ovenCookies = []
Oven.addCookie = function(cookie){
	this.cookie = cookie
	ovenCookies.push(cookie)
	alert("Cookies in the oven!")
}
 
Oven.bake = function(ovenCookies){
	this.ovenCookies = ovenCookies;
	for (var i=0;i<ovenCookies.length;i++){
		ovenCookies[i].cook_time++;
		$("#rack_" + i).removeClass(ovenCookies[i].status)
		ovenCookies[i].updateStatus();
		$("#rack_" + i).addClass(ovenCookies[i].status)
		$("#rack_" + i).html(ovenCookies[i].type + ' ' + '[' + ovenCookies[i].status + ']')
	}
}
 
function findEmptyRack() {
	return $("#oven td:contains('[empty]')")[0].id
}
 
function insertCookieToRack(rack){
	$("#"+rack).empty()
	$("#"+rack).addClass(cookie_to_oven.status)
	$("#"+rack).html(cookie_to_oven.type + ' ' + '[' + cookie_to_oven.status + ']')
}
 
$(document).ready(function(){
	$("#new_batch").on('submit', function(event) {
		event.preventDefault();
		
		var type = $(this.batch_type).val();
		var bakeTime = $(this.bake_time).val();
		var cookie = new Cookie(type, bakeTime);
		
		PrepTable.addCookie(cookie)
		var index = prepTableCookies.length
		cookie.cookie_id = index
		node = '<li> '+ cookie.type +' <button class="add_to_oven" id='+ cookie.cookie_id +'>Add to oven</button></li>'
		$("#prep_batches").append(node);
 
		$("#"+cookie.cookie_id).on('click', function(event) {
			event.preventDefault()
			cookie_to_oven = prepTableCookies[cookie.cookie_id - 1]
 
			$("#"+cookie_to_oven.cookie_id).parent().remove()
			Oven.addCookie(cookie_to_oven)
 
			var rack = findEmptyRack()
			insertCookieToRack(rack)
 
		});
	});
});
 
$(document).ready(function(){
	$('#bake').on('click', function(event){
		event.preventDefault();
		Oven.init(ovenCookies);
		Oven.bake(ovenCookies);
	});
});