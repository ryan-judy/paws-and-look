$(document).ready(function() {

    // FirebaseUI config.
    var uiConfig = {
        signInSuccessUrl: 'pet-choice.html',
        signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

});