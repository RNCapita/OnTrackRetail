var fromJSON = require('./scenario1.json');
var fs = require('fs');
var _ = require('lodash');

// output answers as properties to this object
var finalAnswer = {};

//Array just for distance integers
var distanceValues = [];
//New array just with possible routes
var allRoutes = [];

//loop through json array
fromJSON.forEach(function (part, index, theArray) {
    //separate characters into different variavles
    var startPoint = theArray[index].charAt(0);
    var endPoint = theArray[index].charAt(1);
    var distance = theArray[index].charAt(2);

    //push distance integer into distance array for cross checking later
    distanceValues.push(distance);

    //push routes into routes array for cross checking later
    allRoutes.push(startPoint + endPoint);
});

function questionsOneToThree() {
    //put questions 1-3 into an array, as we already know the trip routes
    var routes = ["ABC", "AEBCD", "AED"];

    for (var i = 0; i < routes.length; i++) {
        var routeStartPoint = 0;
        var routeEndPoint = 1;
        var distanceCount = 0;

        while (routeEndPoint < routes[i].length) {
            // check the start and end of current route
            var stationStart = routes[i].charAt(routeStartPoint);
            var stationEnd = routes[i].charAt(routeEndPoint);
            //check if route exists in allRoutes array, if not then it is a null route
            var index = allRoutes.indexOf(stationStart + stationEnd);
            if (index > -1) {
                // increment distance count by number found in the distanceValues array using index
                distanceCount += parseInt(distanceValues[index]);
                //update finalAnswer object
                finalAnswer[i + 1] = distanceCount;
            } else {
                finalAnswer[i + 1] = null;
            }
            //increment start and end point to move along the route
            routeStartPoint++;
            routeEndPoint++;
        }
    }
}

function questionFour() {
    //The number of trips starting at A and ending at C making exactly 4 stops (5 stations including the origin)
    var routeLength = 0;
    var possibleRoute = _.filter(fromJSON, function (value) {
        return value.charAt(0) == 'A'
    });

    _.forEach(possibleRoute, function (route) {
        var nextStop = _.filter(fromJSON, function (value) {
            return value.charAt(0) == route.charAt(1)
        });
    })

}

function questionFive() {
    //The length of the shortest route (in terms of distance to travel) from B to B.

    //all possible routes using the diagram provided,
    var possibleRoutes = ["BCDEB", "BCEB", "BCDCEB"];

    //purposely high for cross checking later
    var finalCount = 1000;

    for (var route of possibleRoutes) {
        var routeStartPoint = 0;
        var routeEndPoint = 1;
        var distanceCount = 0;

        while (routeEndPoint < route.length) {
            var stationStart = route.charAt(routeStartPoint);
            var stationEnd = route.charAt(routeEndPoint);
            var index = allRoutes.indexOf(stationStart + stationEnd);
            if (index > -1) {
                //update current distance count
                distanceCount += parseInt(distanceValues[index]);
            }
            routeStartPoint++;
            routeEndPoint++;
        }
        // update the finalCount if its lower than the current distance count
        if (distanceCount < finalCount) {
            finalCount = distanceCount;
        }

        finalAnswer["5"] = finalCount;
    }

}

function questionSix() {
    //The number of different routes from C to C with a distance of less than 30. In the input data above, the trips are C-D-C, C-E-B-C, C-E-B-C-D-C, C-D-C-E-B-C, C-D-E-B-C, C-E-B-C-E-B-C and C-E-B-C-E-B-C-E-B-C.
}

questionsOneToThree();
questionFour();
questionFive();
questionSix();


fs.writeFile('finalAnswer.json', JSON.stringify(finalAnswer));