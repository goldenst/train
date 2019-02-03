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
// reset dom every 60 sec
setTimeout(function(){
  location = ''
},60000)

// doc ready
$(document).ready(function () {
  //console.log("Doc Ready"); // works
 
  $('#time').append(moment().format('HH:mm'));
  // add new train button
  $('#add-train-btn').on('click', function (event) {
    event.preventDefault;
    // sets user input to varriable
    var trainName = $("#train-name").val().trim();
    var Dest = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var trainIntervel = $("#intervel").val().trim();



    // pushes data to database
    database.ref().push({
      Train: trainName,
      Dest: Dest,
      firstTrain: firstTrain,
      intervel: trainIntervel,
    });
    console.log('Intervel : - ' + intervael);
    //console.log("test" + trDest + trFirst + trName + trinter); // works
  });

  database.ref().on(
    "child_added",
    function (db) {
      var dbObj = db.val();


      // ##################### math ###############
      var currentTime = moment();
      var currentTime2 = moment('HH:mm')
 
      var firstTrainTime = dbObj.firstTrain;
      var trainInterv = dbObj.intervel
      var train1 = moment(firstTrainTime, "HH:mm");
      var diff = currentTime.diff(train1, "minutes");
      var minTo = diff % trainInterv;
      var nextTrain2 =  trainInterv - minTo;
      var nextTrainArives = minTo + moment()
      var arivaltime = moment(nextTrainArives, "HH:mm")
      
// console.log("train1: =" , train1.minutes());
// console.log("diff: =" , diff)
// console.log("first :- " , firstTrainTime)
// console.log("inter : " , trainInterv)
// console.log("min to: - " ,minTo)
// console.log("next train : - " ,arivaltime)

     // miniuts = now - firsttime; == how many min from first Tran

      //  miniuts % freq == how long till the next train comes

// puts data to dom 
      var newRow = $('<tr>');
      newRow.append($("<td>" + dbObj.Train + "</td>"));
      newRow.append($("<td>" + dbObj.Dest + "</td>"));
      newRow.append($("<td>" + dbObj.firstTrain + "</td>"));
      newRow.append($("<td>" + dbObj.intervel + "</td>"));
      //newRow.append($('<td>' + nextTrain2 + "</td>"));
      newRow.append($('<td>' + nextTrain2 + "</td>"));

      $('tbody').append(newRow);

      // console.log('train: - ' + dbObj.Train);
      // console.log('Dest: - ' + dbObj.Dest);
      //console.log('First Time : - ' + dbObj.firstTrain);
      // console.log('Intervel : - ' + dbObj.intervael);
      // console.log('next Train : - ' + nextTrainFormatted);
      // console.log('Min Away : - ' + minAway);

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
    .on('child_added', function (ss) {
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


