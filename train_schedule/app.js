console.log('from app.js')
var firstTrain;
var intervael;
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyArhRpyFtPzXj3nTYSclroxnpGGwrNaMak",
    authDomain: "trainscheduler-dd5db.firebaseapp.com",
    databaseURL: "https://trainscheduler-dd5db.firebaseio.com",
    projectId: "trainscheduler-dd5db",
    storageBucket: "trainscheduler-dd5db.appspot.com",
    messagingSenderId: "80013724076"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  
  // doc ready
  $(document).ready(function () {
    //console.log("Doc Ready"); // works

    $('#time').append(moment().format('LLL'));
    // add new train button
    $('#add-train-btn').on('click' , function (event) {
      event.preventDefault;
      // sets user input to varriable
      var trainName = $("#train-name").val().trim(); 

      var Dest = $("#destination").val().trim(); 
     
      var firstTrain = $("#first-train").val().trim();

      var trainIntervel = $("#intervel").val().trim();
      // current time
      var currentTime = moment().format('LLL');
      //console.log("CURRENT TIME: " + currentTime);


      // pushes data to database
      database.ref().push({
        Train: trainName,
        Dest: Dest,
        firstTrain: firstTrain,
        intervel: trainIntervel,
        dataAdded: firebase.database.ServerValue.TIMESTAMP,
      });
      
    //console.log("test" + trDest + trFirst + trName + trinter); // works
    });


    database.ref().on(
      "child_added",
      function (db) {
        var dbObj = db.val();   

        // get current time

        // next arival time


        var newRow = $('tr');
        newRow.append($("<td>" + dbObj.Train + "</td>" ));
        newRow.append($("<td>" + dbObj.Dest + "</td>" ));
        newRow.append($("<td>" + dbObj.firstTrain + "</td>" ));
        newRow.append($("<td>" + dbObj.intervel+ "</td>" ));
        //newRow.append($('<td>' + nextArrival + "</td>" ));
      
        $('tbody').append(newRow); 
      
      },
      function (error) {
        alert(error)
      });

      database.ref().on("child_added", function (childSnap) {
        console.log(childSnap.val());
        
      });
      
      database
      .ref()
      .orderByChild('intervel')
      .limitToLast(3)
      .on('child_added', function(ss) {
        //console.log(ss.val());
      });
    
  });

  // #################### TODO ################################
  // calculate train times ??
  // Fix <td> not displaying correctley

// #############################  moment js play area ##############################
//   // returns current time
//   var now = moment().format('LT');
//   var int = 25;
//   var n = moment().add(int, "m").format('LT');

//   console.log('Now : - ' + now)
//   console.log('Then : - ' + n)

//   var start = moment([2007, 0, 5]);
// var end   = moment([2007, 0, 10]);
// end.from(start);       // "in 5 days"
// console.log(end.from(start)); // "5 days"


