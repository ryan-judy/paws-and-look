$(document).ready(function() {

    // var userName = "";
    var userEmail = "";
    var password = "";

    $("#regSubmit").on("click", function() {

        //userName = $("#name").val().trim();
        userEmail = $("#regEmail").val().trim();
        password = $("#regPassword").val().trim();
        //pwConfirm = $("#confirm").val().trim();

        firebase.auth().createUserWithEmailAndPassword(userEmail, password).catch(function(error) {
    	    var errorCode = error.code;
    	    var errorMessage = error.message;
        });
    });
});