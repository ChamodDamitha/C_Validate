/**
 * Created by Chamod on 11/21/2016.
 */
//////////////////////....Functions used to test input.....//////////////////////////////////////////////////////////////////////////////
function isName(name) {
    if(name==""){
        return "Fill the field";
    }
    else if(name.match(/[^a-z\s]/i)){
        return "Enter a valid name";
    }
    else{
        return "";
    }
}
function isAddress(address) {
    if(address==""){
        return "Fill the field";
    }
    else{
        return "";
    }
}
function isPhone(n) {
    if(n==""){
        return "Fill the field";
    }
    else if(n.match(/[^0-9]/)){
        return "Enter a valid phone number";
    }
    else if(n.charAt(0)=='0'){
        if(n.length==10){
            return "";
        }
        else{
            return "length of contact number is not valid";
        }
    }
    else if(n.length!=9){
        return "length of contact number is not valid";
    }
    else{
        return "";
    }
}
function isEmail(email) {
    if(email==""){
        return "Fill the field";
    }
    else if(!email.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)){
        return "Enter a valid email";
    }
    else{
        return "";
    }
}
function isEmpty(data) {
    if(data==""){
        return "Fill the field";
    }
    return "";
}
function isPositive(num) {
    if(num=="" ||  num.match(/[^0-9]/)){
        return "Enter a positive number";
    }
    return "";
}

function isMinChar(data,num){
	if(data.length<num){
		return "Entered value must contain at least "+num+" characters";
	}
	return "";
}
////////////////////////....Event Handling and all the logic......////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    //hide spans
    $(".vali").children("span").prop("hidden",true);
    //disable submit buttons
    $(".vali_form").children(".vali_submit").prop("disabled",true);

    //events where validation take place
    $('input,textarea').keyup(function () {
        validate(this);
    });
    $('input,textarea').blur(function () {
        validate(this);
    });
	//when clear btn clicks inputs and errors clear
	$(".vali_clear").click(function(){
		var formm=$(this).closest(".vali_form");
		clearForm(formm);
		if($(this).hasClass(".vali_hide_form")){
			$(formm).hide();
		}
	});
	

    //.................................functions.............................................................................................
    function validate(vm) {
        if($(vm).closest('div').hasClass("vali")){
            //setting objects
            var divv = $(vm).closest(".vali");
            var inputt = $(vm);
            var spann = $(divv).children("span");
            var formm=$(divv).closest(".vali_form");
            //////////////////////////////////////////////////////////////////////////////////////////////
            var value=$(inputt).val().trim();
            var error=getError(divv,value);
            /////////////////////////////////////////////////////////////////////////////////////////////////
            //set error in the span
            viewError(inputt,spann,error);
            if (error != "") {
                //disable submit button due to error
                if($(formm).has(".vali_submit").length>0){
                    $(formm).children(".vali_submit").prop("disabled",true);
                }
            }
            else {
                //check whether submit button can be enabled
                var a=$(formm).children(".vali");
                var has_error=false;
                //check each sibiling
                for(var i=0;i<a.length;i++){
                    var divv=a[i];
                    var inputt;
                    if($(divv).has("input").length>0){
                        inputt=$(divv).children("input");
                    }
                    else if($(divv).has("textarea").length>0){
                        inputt=$(divv).children("textarea");
                    }
                    else{
                        continue;
                    }
                    var value=$(inputt).val().trim();
                    //disable submit button if an error occured
                    if(getError(divv,value)!=""){
                        has_error=true;
                        $(formm).children(".vali_submit").prop("disabled",true);
                        break;
                    }
                }
                if(!has_error){
                    if($(formm).has(".vali_submit").length>0){
                        $(formm).children(".vali_submit").prop("disabled",false);
                    }
                }
            }
        }
    }
    //return error of a div
    function getError(divv,value) {
        var error="";
        //checking for input type
        if ($(divv).hasClass("vali_name")) {    //empty or valid email
            error = isName(value);
        }
        else if ($(divv).hasClass("vali_address")) {    //empty or valid address
            error = isAddress(value);
        }
        else if ($(divv).hasClass("vali_phone")) {    //empty or valid phone no(Sri Lankan )
            error = isPhone(value);
        }
        else if ($(divv).hasClass("vali_email")) {    //empty or valid email
            error = isEmail(value);
        }
        else if ($(divv).hasClass("vali_empty")) {    //empty
            error = isEmpty(value);
        }
        else if ($(divv).hasClass("vali_positive")) {    //positive or zero integer
            error = isPositive(value);
        }
		else if ($(divv).hasClass("vali_confirm_password")) {    //confirm password
            var password=$(divv).closest(".vali_form").children(".vali_password").children("input").val();
			if(password!=value){
				error="Passwords do not match";
			}
        }
		else{											//check for a minimum no of characters (e.g. vali_minchar_4)
			var class_set=$(divv).attr("class");
			var classes=class_set.split(" ");
			for(var i in classes){
				if(classes[i].startsWith("vali_minchar")){
					var num=classes[i].split("_")[2];
					error=isMinChar(value,num);
					break;
				}
			}
		}
        return error;
    }

//change here to customize viewing the error in span and input
    function viewError(inputt,spann,error) {
        //setting variables
        var error_color="red";
        var correct_color="green";

        if (error != "") {
            $(spann).show();
            $(spann).text(error);
            $(spann).css("color", error_color);
            $(inputt).css("border-color", error_color);
        }
        else {
            $(spann).hide();
            $(inputt).css("border-color", correct_color);
        }
    }
	
});
//clear error style
function removeStyle(formm){
	var a=$(formm).children(".vali");
	for(var i=0;i<a.length;i++){
            var divv=a[i];
            var inputt;
            if($(divv).has("input").length>0){
                inputt=$(divv).children("input");
				$(inputt).css("border-color", "");
            }
            else if($(divv).has("textarea").length>0){
                inputt=$(divv).children("textarea")
				$(inputt).css("border-color", "");
		}
        }
		
}

//function clears inputs and errors 
function clearForm(formm){
	var a=$(formm).children(".vali");
	for(var i=0;i<a.length;i++){
		var divv=a[i];
		var inputt,spann;
		if($(divv).has("input").length>0){
			inputt=$(divv).children("input");
			$(inputt).val("");
        }
        else if($(divv).has("textarea").length>0){
            inputt=$(divv).children("textarea")
			$(inputt).val("");
		}
		if($(divv).has("span").length>0){
            spann=$(divv).children("span");
			$(spann).text("");
			$(spann).hide();
		}         
    }
    removeStyle(formm);
}

