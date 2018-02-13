var app=angular.module("myapp",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/view1",{
        controller:"controller1",
        templateUrl:"pages/view1.html"
    }).when("/view2",{
        controller:"controller2",
        templateUrl:"pages/view2.html"
    }).when("/view3",{
        controller:"controller3",
        templateUrl:"pages/view3.html"
    }).when("/Add",{
        controller:"dt",
        templateUrl:"pages/add.html"
    }).when("/display",{
        controller:"WeatherController",
        templateUrl:"pages/display.html"
    }).otherwise({
        template:"<h1>Error in Routing</h1>"
    });
});
app.factory("Avengers",function(){
    var Avengers={};
    Avengers.cast=[
        {
            name: "Robert Downey Jr.",
            character: "Tony Stark / Iron Man"
        },
        {
            name: "Chris Evans",
            character: "Steve Rogers / Captain America}"
        },
        {
            name: "Mark Ruffalo",
            character: "Bruce Banner / The Hulk}"
        },
        {
            name: "Chris Hemsworth",
            character: "Thor"
        },
        {
            name: "Scarlett Johansson",
            character: "Natasha Romanoff / Black Widow"
        },
        {
            name: "Jeremy Renner",
            character: "Clint Barton / Hawkeye"
        },
        {
            name: "Tom Hiddleston",
            character: "Loki"
        },
        {
            name: "Clark Gregg",
            character: "Agent Phil Coulson"
        },
        {
            name: "Cobie Smulders",
            character: "Agent Maria Hill"
        },
        {
            name: "Stellan Skarsgard",
            character: "Selvig"
        },
        {
            name: "Samuel L. Jackson",
            character: "Nick Fury"
        },
        {
            name: "Gwyneth Paltrow",
            character: "Pepper Potts"
        },
        {
            name: "Paul Bettany",
            character: "Jarvis (voice)"
        },
        {
            name: "Alexis Denisof",
            character: "The Other"
        },
        {
            name: "Tina Benko",
            character: "NASA Scientist"
        }
    ];
    return Avengers;
});
app.controller("dt", function ($scope) {

});
app.factory("weatherService", function ($http) {
    return{
        getWeather:function(city,country){
            var query=city+","+country;
            return $http.get("http://api.openweathermap.org/data/2.5/weather",{
                params:{
                    q:query,
                    APPID:"f9dbd911bc01df1d9ce563b2ba4d3209"
                }
            }).then(function(response){
                return response.data.weather[0].description;
            })
        }
    }
});

app.controller("WeatherController",function($scope,weatherService){
    $scope.getWeather=function(){
        $scope.wd = "Fetching . . .";
        var pr=weatherService.getWeather($scope.city,$scope.country);
        weatherService.getWeather($scope.city,$scope.country)
        .then(function(data){
            $scope.wd=data;
        }),function(){
            $scope.wd="Could not display";
        },function(message){
            $scope.wd=message;
        };
    };
});


app.controller("controller1",function($scope,Avengers){
    $scope.avengers=Avengers.cast;
}).controller("controller2", function ($scope) {
    $scope.now=new Date();

});

app.service("popp", function ($timeout) {
    this.popp=function(){
        $timeout(function(){
            alert("Hello!!");
        },2000)
    }
});
app.controller("selection",function(){
    $scope.result=function($scope){
        return $scope.user.country;
    }
})
