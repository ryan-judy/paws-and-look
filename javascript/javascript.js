$(document).ready(function() {

  var config = {
      apiKey: "AIzaSyCj_AZGEOgcPxJj6-qlIAjeE7o_uIGpoxY",
      authDomain: "pawsandlook-c56d5.firebaseapp.com",
      databaseURL: "https://pawsandlook-c56d5.firebaseio.com",
      projectId: "pawsandlook-c56d5",
      storageBucket: "pawsandlook-c56d5.appspot.com",
      messagingSenderId: "555976363149"
    };

    firebase.initializeApp(config);

  var database = firebase.database();

  //setting cat dog images to an array
  var choiceArr = [
    { image: "assets/images/cat.png",
    alt: "cat" }, 
    { image: "assets/images/dog.png",
      alt: "dog" }
  ];

  //declaring global variables for the pet favorites
  var name = "";
  var age = 0;
  var photo = "";
  var petTable = $(".table");
  var newBody;
  var newTr;
  var imageTd;
  var nameTd;
  var sexTd;
  var animLocLat;
  var animnLocLong;
  var globalLat = 41.4931;
  var globalLng = -81.6790;
  var uid = firebase.auth().uid;


  //function to get the cat/dog choices to page

      $('.form-check-input').on('click', function() {
        firebase.auth().signOut().then(function() {
      // Sign-out successful.
        }).catch(function(error) {
      // An error happened.
        });
            window.location.href = "index.html";
        });

    $(".nextPage").on("click", function () {
            if ($("input[value=dog]:checked").val() === "dog") {
                window.location.href = "pet-choice-dogs.html";
            }

            else if ($("input[value=cat]:checked").val() === "cat") {
                window.location.href = "pet-choice-cats.html";
            }

            else {
                 window.location.href = "pet-choice-random.html";
            }



  });

        $(".goTo").on("click", function () {
            if ($("input[value=dog]:checked").val() === "dog") {
                window.location.href = "pet-choice-dogs.html";
            }

            else if ($("input[value=cat]:checked").val() === "cat") {
                window.location.href = "pet-choice-cats.html";
            }

            else {
                 window.location.href = "pet-choice-random.html";
            }



    });


  //function for flip animations
    $('.fliper-btn').click(function(){
    $('.flip').find('.card').toggleClass('flipped');
  });



    database.ref().on("child_added", function(childSnapshot) {


      data = childSnapshot.val();
      var dataArr = Object.keys(data);

          // fucntion to append users save searches to page
          function displayFavorite() {

          //creates classes for table
          newBody = $("<tbody class = 'pet-group'>");
      newTr = $("<tr class = 'pet-row'>");
          imageTd = $("<td class = 'pet-image'>");
          nameTd = $("<td class = 'pet-name'>");
          sexTd = $("<td class = 'pet-sex'>");

          //creates a containter for thumbnail
            var thumbDisplay = $("<img>");
            thumbDisplay.addClass("pet-image");
            thumbDisplay.addClass("img-circle");
      thumbDisplay.attr("src", data.photo);
   
        //adding data to classes
            imageTd.append(thumbDisplay);
            nameTd.append(data.name);
            sexTd.append(data.sex);

            //appending data to page
      sexTd.addClass("center");
            newTr.append(imageTd);
            newTr.append(nameTd);
            newTr.append(sexTd);
            newBody.append(newTr);

            //gives data attributes to each pet group
          newBody.attr("data-image", data.photo);
          newBody.attr("data-name", data.name);
          newBody.attr("data-sex", data.sex);
          newBody.attr("data-age", data.age);
          newBody.attr("data-breed", data.breed);
          newBody.attr("data-description", data.description);
          newBody.attr("data-email", data.email);
          newBody.attr("data-phone", data.phone);
          newBody.attr("data-lat", data.animLocLat);
          newBody.attr("data-lng", data.animnLocLong);

          //and finally writing every single thing to the HTML
            petTable.append(newBody);
            $(".loader").remove();
    };
        
        displayFavorite();

        
        //event for when a user clicks on a pet group
        function petClick() {
        $(".pet-group").on("click", function () {
            //calling the data attributes for the group
        imageValue = $(this).attr("data-image");
        nameValue = $(this).attr("data-name");
            sexValue = $(this).attr("data-sex");
            ageValue = $(this).attr("data-age");
            breedValue = $(this).attr("data-breed");
                descValue = $(this).attr("data-description");
                emailValue = $(this).attr("data-email");
                phoneValue = $(this).attr("data-phone");
                latValue = $(this).attr("data-lat");
            lngValue = $(this).attr("data-lng");

            latValue = parseFloat(latValue);
            lngValue = parseFloat(lngValue);

            //emptying out the div and displaying the user's selection
        $(".main-login").empty();
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        var imageDisplay = $("<img>");
        imageDisplay.addClass("image");
        imageDisplay.addClass("img-thumbnail");
        imageDisplay.addClass("animation-target");
        imageDisplay.attr("src", imageValue);
        $(".main-login").append("<div class=image>");
        $(".main-login").append("<h2 class=name>");
        $(".main-login").append("<h2 class=sex>, ");
        $(".main-login").append("<div class=age> ");
        $(".main-login").append("<div class=breed>");
        $(".main-login").append("<div class=description><br>");
        $(".main-login").append("<div class=email><br>");
        $(".main-login").append("<div class=phone><br>");
        $(".main-login").append("<br><div id='map'></div>")

        $(".image").append(imageDisplay);
        $(".name").append(nameValue);
        $(".sex").append(sexValue);
        $(".age").append(ageValue);
        $(".breed").append(breedValue);
        $(".description").append(descValue);
        $(".email").append(emailValue);
        $(".phone").append(phoneValue);
        $(".main-login").append("<a href= 'favorite-pets.html'><i class='fa fa-arrow-left'</i><p>Go Back</p></a>");

                MakeMap(globalLat, globalLng);
                console.log(globalLat);
                console.log(globalLng);
                MarkerMaker(latValue, lngValue);
    });
    };

    petClick();


    },  

      function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });      

       function MakeMap(lat, lng) {
               
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: globalLat, lng: globalLng}, //lat: 41.4931, lng: -81.6790
          zoom: 9,
          scrollwheel: false
        });
        infoWindow = new google.maps.InfoWindow;

        Geolocator();
     }

      function MarkerMaker(lats, longs) {
        var markerOptions = {
                position: new google.maps.LatLng(lats, longs)
                };
                var marker = new google.maps.Marker(markerOptions);
                marker.setMap(map);
            // console.log("marker maker long&lat: " + lats + ", " + longs);
     }

     function Geolocator() {
         infoWindow = new google.maps.InfoWindow;

        
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
                        console.log("pos" + pos);

            globalLat = pos.lat;
            globalLng = pos.lng;
            //making markers. should turn into a function
            var markerOptions = {
                position: new google.maps.LatLng(pos.lat, pos.lng)
                };
                var marker = new google.maps.Marker(markerOptions);
                marker.setMap(map);
                    
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        // console.log("begin reverse geolocator")
            }


});