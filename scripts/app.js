var app = angular.module("stashApp", ["firebase"]);

app.controller("usernameCtrl", function($scope, $firebaseObject, $firebaseArray) {
  var ref = new Firebase("https://stashreviews.firebaseio.com");
  var refUsers = new Firebase("https://stashreviews.firebaseio.com/users");


 	// Allows Usernames to Be Reserved During Development
 	// When "Check Availablity" is clicked, run this
	$('.submitUser').on( "click", function(error, userInfo, userData) {

		// Get Username and Email From Inputs
	    var username = $('.reserveUsernameInput').val();
	    var email = $('.reserveEmailInput').val();

	    // Get Firebase references
	    var ref = new Firebase("https://stashreviews.firebaseio.com");
  		var refUsers = new Firebase("https://stashreviews.firebaseio.com/users");

  		// Get Todays Date
		var today = new Date();
		// Get The Day
		var dd = today.getDate();
		// Get The Month
		var mm = today.getMonth()+1; //January is 0!
		// Get The Year
		var yyyy = today.getFullYear();
		// Add a '0' if One Digit
		if(dd<10) {
		    dd='0'+dd
		} 
		if(mm<10) {
		    mm='0'+mm
		}
		// Name of Months
		var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		// Format The Date: "January 01, 2015"
		var myDate, myFormatDate;
		var date_str ='XX/XX/XXXX';
		var t = date_str.split("/");
		if(t[2]) {
		    myDate = new Date(t[2], t[0] - 1, t[1]);
		    myFormatDate = MONTHS[mm-1] + " " + dd + ", " + yyyy;
		} else {
		    myDate = new Date(yyyy, t[0] - 1, t[1]);
		    myFormatDate = MONTHS[mm-1] + ", " + yyyy;
		}
	    
		// This is the good stuff
	    if (! username) {
	        // If nothing was typed into username input, alert.
	        alert("You must enter a username in order to reserve it.");
	    } else if (! email) {
	        // If nothing was typed into username input, alert.
	        alert("You must enter an email address in order to reserve your username.");
	    } else {


	    	// Create A New User Auth on Firebase
		  	ref.createUser({
			  email    : email,
			  username : username,
			  password : "default"
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			    // Error alert.
	     		// alert(error + " Try another!");
	     		$('#rebrandingModal').modal('hide');
			    $('#reserveUsernameModal').modal('hide');
			    $('#reserveEmailTakenModal').modal('show');
			    $('#reserveUsernameTakenModal').modal('hide');
			    $('#reserveUsernameSuccessModal').modal('hide');
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);

		  		// Set username, date and email to Firebase.
			    var userInfo = {
			      date: myFormatDate,
			      username: username,
			      email: email,
			      uid: userData.uid
			    }
		    	refUsers.child(username).set(userInfo, function(error) {
		    	  if (error) {
				    // alert("Whoops! It looks like " + username + " is already taken. Please try another!");
				    console.log("Username is already taken.");
				    $('#rebrandingModal').modal('hide');
				    $('#reserveUsernameModal').modal('hide');
				    $('#reserveEmailTakenModal').modal('hide');
				    $('#reserveUsernameTakenModal').modal('show');
				    $('#reserveUsernameSuccessModal').modal('hide');

			    	// Removes User Auth From Firebase
					ref.removeUser({
					  email: email,
					  username : username,
				  	  password : "default"
					}, function(error) {
					  if (error) {
					    switch (error.code) {
					      case "INVALID_USER":
					        console.log("The specified user account does not exist.");
					        break;
					      case "INVALID_PASSWORD":
					        console.log("The specified user account password is incorrect.");
					        break;
					      default:
					        console.log("Error removing user:", error);
					    }
					  } else {
					    console.log("User account deleted successfully!");
					  }
					});
				  } else {
				    console.log("Successfully created user by the username:", username);
				    
				    $('#rebrandingModal').modal('hide');
				    $('#reserveUsernameModal').modal('hide');
				    $('#reserveEmailTakenModal').modal('hide');
				    $('#reserveUsernameTakenModal').modal('hide');
				    $('#reserveUsernameSuccessModal').modal('show');
				  }

		    	});
	    	  }
			});	      
	    }

	});


});