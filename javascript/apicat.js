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
    var map;
    var mapURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    var locationID = "";
    var mapAddress = "";
    var globalLat;
    var globalLng;
    var key = "&key=F411ff9725d287d4138503a0c95030a6"
    var AnimURL = "https://api.petfinder.com/pet.find?format=json"
    var animLocLat;
    var animnLocLong;
    var zip = "";
    var catDogSelect = "cat";
    var catDogAnim = "";
    var ageSelect = "";
    var nameID = "";
    var ageID = "";
    var sexSelect = "";
    var sexID = "";
    var breedSelect = "";
    var breedID = "";
    var sizeSelect = "";
    var sizeID = "";
    var respAbrev = "";
    var addr = "";
    var city = "";
    var state = "";
    var zipID = "";
    var phoneID = "";
    var emailID = "";
    var photo;
    var mapURLloc = "";
    var description = "";
    var loop = false;
    var uid = firebase.auth().uid;

    $('#map').hide();
    // $('#view-map').hide();
    // console.log(google);
    	DisplayAnimal();
        
        Geolocator();
        // map = new google.maps.Map(document.getElementById('map'), {
  //         center: {lat: parseInt(globalLat), lng: parseInt(globalLng)}, //lat: 41.4931, lng: -81.6790
  //         zoom: 11,
  //         scrollwheel: false
  //         });
        
    $('#negative').on('click', function() {
        DisplayAnimal();
        // $('#view-map').show();
        
    })

    $('#positive').on('click', function() {
    	MakeMap();
    	FireBaseFunction();
    	DisplayAnimal();

    })
    
    $('#view-map').on('click', function() {
        MakeMap();
        $('#map').show();
    })

    //--------------------Ryans stuff

 $('#information').on('click', function() {
        $(".img-thumbnail animation-target").hide();
        $('html, body').animate({ scrollTop: 150 }, 'fast');
                $(".displayPet").addClass("main-login main-center");
                $("#petName").remove();
                var imageDisplay = $("<img>");
                imageDisplay.addClass("pet-image-bigger");
                imageDisplay.addClass("animation-target");
                imageDisplay.attr("src", photo);
                imageDisplay.addClass("img-thumbnail");
                $(".main-login").html("<div class=image>");
                $(".image").append(imageDisplay);
                $(".image").attr("href", "pet-choice-cats.html");
                $(".main-login").append("<h2 class=name>");
                $(".main-login").append("<h2 class=sex>, ");
                $(".main-login").append("<div class=age>");
                $(".main-login").append("<div class=breed>");              
                $(".name").append(nameID);
                $(".sex").append(sexID);
                $(".age").append(ageID);
                $(".breed").append(breedID);
                $(".main-login").append("<a href= 'pet-choice-cats.html'><i class='fa fa-arrow-left'</i><p>Go Back</p></a>");
    })
    $('.form-check-input').on('click', function() {
        firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
    window.location.href = "index.html";
});

    //----------------------End
    
                
    //------------Functions---------------------
    //Function to run geolocator
    function Geolocator() {
         infoWindow = new google.maps.InfoWindow;

         // console.log("InfoWindow: " + infoWindow);
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
            // console.log("pos.long&lat: " + pos.lat + ", " + pos.lng);
                    
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            // map.setCenter(pos);
        ReverseGeoLocator();
        // console.log("ZIP1: " + zip);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        // console.log("begin reverse geolocator")
            }
     //Function to Make the Map
     function MakeMap() {
        // map = new google.maps.Map(document.getElementById('map'), {
      //     center: {lat: parseInt(globalLat), lng: parseInt(globalLng)}, //lat: 41.4931, lng: -81.6790
      //     zoom: 11,
      //     scrollwheel: false
      //     });
        console.log(mapURL);
        mapURLloc = mapURL + mapAddress;
        mapURLloc = mapURLloc.replace(/ /g, "+");
        console.log("mapURLloc: " + mapURLloc);
        $.ajax({
            url: mapURLloc,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            var responseLoc = response.results[0].geometry.location;
            animLocLat = responseLoc.lat;
            animnLocLong = responseLoc.lng;

            console.log("FB " + animLocLat);
            console.log("FB " + animnLocLong);

            var test = JSON.stringify(animLocLat);
            console.log("Test: " + test);

            // console.log("lat&long: " + reanimLocLat + ", " + animnLocLong);
            console.log("AnNIMLOCATION!!!!!!: " + animLocLat + animnLocLong);
            MarkerMaker(animLocLat, animnLocLong);
            // console.log('to marker maker data: ' + globalLat + globalLng);
            MarkerMaker(globalLat, globalLng);
            
        });
        
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.4931, lng: -81.6790}, //lat: 41.4931, lng: -81.6790
          zoom: 11,
          scrollwheel: false
        });
        infoWindow = new google.maps.InfoWindow;
     }
     function MarkerMaker(lats, longs) {
        var markerOptions = {
                position: new google.maps.LatLng(lats, longs)
                };
                var marker = new google.maps.Marker(markerOptions);
                marker.setMap(map);
            // console.log("marker maker long&lat: " + lats + ", " + longs);
     }
     function DisplayAnimal() {
// variables for user input and petfinder api output
    // console.log("ZIP2: " + zip);
    randZipArray = makeZipArray(44143);

    var randomZip = randZipArray[Math.floor(Math.random()*24 + 0)]
    var locationQuery = "&location=" + randomZip;
    // console.log("Randomized zip locationQuery: " + locationQuery)
   
    loop = false;
        
    var queryURL = AnimURL + key + locationQuery + "&animal="  + catDogSelect + "&age=" + ageSelect + "&sex=" + sexSelect + "&breed=" + breedSelect + "&size=" + sizeSelect;
    queryURL = queryURL.replace(" ", "+");
        // console.log("while Loop outside function");
        AnimalAJAX(queryURL);
    
   
        
     }
     function displayAnimHTML(feature) {
            $('.text').append('<br>' + feature);
        }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
    
      function ReverseGeoLocator(){
        // console.log("globalLat within reverse geolocator: " + globalLat);
        // console.log("globalLng within reverse geolocator: " + globalLng);
        // reverse geolocation
            var revGeolocQuery = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + globalLat + "," + globalLng;
            revGeolocQuery = revGeolocQuery + "&sensor=true";
          // mapURLzip = mapURLzip.replace(/ /g, "+");
          $.ajax({
            url: revGeolocQuery,
            method: "GET"
            }).done(function(response) {
            var searchKey = "postal_code";
            var zipcodeObject = null;
            for( var i = 0; i < response.results[0].address_components.length; i++ ){
                var thisAddressObject = response.results[0].address_components[i];
                var addressTypes = thisAddressObject.types;
                var search = addressTypes.indexOf(searchKey);
                if( search > -1 ){
                    zipcodeObject = thisAddressObject;
                    // console.log("ZIP CODE OBJECT: " + JSON.stringify(zipcodeObject.short_name));
                    zip = zipcodeObject.short_name;
                    // console.log("ZIP3: " + zip);
                    break;
                }
            }
            
            if( zipcodeObject !== null ){
                // console.log(zipcodeObject);
            }
        });
            
      }
      function makeZipArray(number) {
        number = parseInt(number);
        var posIterator = number + 13;
        var negIterator = number - 13;
        var Ziparray = [];
        for (var i = number; i < posIterator; i++) {
            Ziparray.push(i);
        }
        for (var i = number - 1; i > negIterator; i--) {
            Ziparray.push(i);
        }
        Ziparray.map(String);
                    // console.log(Ziparray);
        return Ziparray;
      }
      function AnimalAJAX(queryURL) {
            $.ajax({
            url: queryURL,
            dataType: "jsonp",
            method: "GET"
        }).done(function(response) {
            console.log(response)
            var index = Math.floor((Math.random() * 24) + 0);
            // console.log("random index: " + index);
            if (response.petfinder.pets == undefined) {
                randomZip = randZipArray[Math.floor(Math.random()*24 + 0)]
                locationQuery = "&location=" + randomZip;
                queryURL = AnimURL + key + locationQuery + "&animal="  + catDogSelect + "&age=" + ageSelect + "&sex=" + sexSelect + "&breed=" + breedSelect + "&size=" + sizeSelect;
                queryURL = queryURL.replace(" ", "+");
                return AnimalAJAX(queryURL);
            } 
            loop = true;
            
            // console.log(response);           
// getting animal location
            respAbrev = response.petfinder.pets.pet;
            // console.log(respAbrev);
            addr = respAbrev[index].contact.address1.$t;
            addr = ClearUndefined(addr);

            city = respAbrev[index].contact.city.$t;
            city = ClearUndefined(city);

            state = respAbrev[index].contact.state.$t;
            state = ClearUndefined(state);

            zipID = respAbrev[index].contact.zip.$t;
            zipID = ClearUndefined(zipID);

// format animal location into standard format
            locationID = addr + ", " + city + ", "  + state + " " + zipID;
            mapAddress = addr + city + state + zipID;
            if (mapAddress.charAt(0) == ",") {
            	mapAddress = mapAddress.replace(",+", "");
            }
            // console.log("locationID check undf: " + locationID);
            if (locationID.indexOf('undefined') == 0) {
            locationID = locationID.replace(/undefined, /g, "");
            }

            // console.log("locationID: " + locationID);
            // locationID = locationID.replace('"', " "); 
            nameID = respAbrev[index].name.$t;
            $('#petName').html(nameID);         
            // console.log("nameID: " + nameID);
            // displayAnimHTML(locationID);
            ageID = respAbrev[index].age.$t;
            // console.log("ageID: " + ageID);
            // displayAnimHTML(ageID);
            catDogAnim = respAbrev[index].animal.$t;
            // console.log("catDogAnim: " + catDogAnim);
            // displayAnimHTML(catDogAnim);
            sexID = respAbrev[index].sex.$t;
            // console.log("sexID: " + sexID)
            // displayAnimHTML(sexID);
            phoneID = respAbrev[index].contact.phone.$t;
            // console.log("phoneID: " + phoneID);

            emailID = respAbrev[index].contact.email.$t;
            // displayAnimHTML(emailID);
            // console.log("phoneID: " + phoneID);

            description = respAbrev[index].description.$t;
            console.log(description);

            
            if (Array.isArray(respAbrev[index].breeds.breed)) {
                breedID = respAbrev[index].breeds.breed[0].$t + "/ " + respAbrev[index].breeds.breed[1].$t + " mix";
                    
            } else
             { breedID = respAbrev[index].breeds.breed.$t };

            // displayAnimHTML(breedID);
            // console.log("breedID: " + breedID); 

            sizeID = respAbrev[index].size.$t;

            // displayAnimHTML(sizeID);
            photo = respAbrev[index].media.photos.photo[2].$t;
            // console.log("PHOTO-1: " + photo);
            $('#catimage').attr('src', photo);// corey change here
            // $('#map').show();

                    // FireBaseFunction();

        })

        
    }

    function FireBaseFunction() {

    	 event.preventDefault();

    	  sexID = FixUndefined(sexID);
    	  nameID = FixUndefined(nameID);
    	  ageID = FixUndefined(ageID);
    	  catDogAnim = FixUndefined(catDogAnim);
    	  breedID = FixUndefined(breedID);
    	  locationID = FixUndefined(locationID);
    	  phoneID = FixUndefined(phoneID);
    	  emailID = FixUndefined(emailID);
    	  photo = FixUndefined(photo);
    	  animLocLat = FixUndefined(animLocLat);
    	  animnLocLong = FixUndefined(animnLocLong);
          description = FixUndefined(description);

    	  // console.log("FB " + sexID);
    	  // console.log("FB " + nameID);
    	  // console.log("FB " + ageID);
    	  // console.log("FB " + catDogAnim);
    	  // console.log("FB " + breedID);
    	  // console.log("FB " + locationID);
    	  // console.log("FB " + phoneID);
    	  // console.log("FB " + emailID);
    	  // console.log("FB " + photo);
    	  // console.log("FB " + animLocLat);
    	  // console.log("FB " + animnLocLong);

            
            //var zipInput = $("#zip").val();
            var userZip = '&location=' + zip;
            var pfApiUrl = "https://api.petfinder.com/pet.find?format=json&key=f411ff9725d287d4138503a0c95030a6&count=1&output=basic"
            var queryURL = pfApiUrl + userZip;
            // console.log(queryURL);
            $.ajax({
                url: queryURL,
                dataType: "jsonp",
                method: "GET"
            }).done(function(response) {
                // console.log(response);
                // console.log("PHOTO: " + photo);
                var petInfo = {
                animal: catDogAnim,
                breed: breedID,
                sex: sexID,
                name: nameID,
                age: ageID,
                address: locationID,
                // city: city,
                // state: state,
                // zip: zipID,
                phone: phoneID,
                email: emailID,
                photo: photo,
                animLocLat: animLocLat,
                animnLocLong: animnLocLong,
                mapURLloc: mapURLloc,
                description: description,
                globalLat: globalLat,
                globalLng: globalLng
                }
                console.log("FIREBASE" + petInfo);
                    database.ref().push(petInfo);
            });
    }

    function FixUndefined(variable) {
    	// console.log(variable);
    	 if (variable === undefined || variable === null) {
            var returnVar = "No information";
            return returnVar;
            } else {
            	return variable;
            }
    }

    function ClearUndefined(variable) {
    	 if (variable === undefined || variable === null) {
            var returnVar = "";
            return returnVar;
            } else {
            	return variable;
            }
    }
     
});
