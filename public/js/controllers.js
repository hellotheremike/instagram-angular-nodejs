'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
  	//Login att appstart
    $http({
      method: 'GET',
      url: '/api/login'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('MyCtrl1', function ($scope, $http) {
  	//Fetch results in partial one
  	var latest = '';
    var images = [];
    $scope.data = [];
  	getData('');


    var wrapper = $('#container').masonry();


    function getData(opt_id){
    	$http({
	      method: 'GET',
	      url: '/api/get'+opt_id
	    }).
	    success(function (dataIncomming, status, headers, config) {
        //console.log(dataIncomming);
        // if(images.length == 0)
        //   images = data.result;
        // else{
        //   var x =arr_diff(images, data.result)
        //   for(var z in x)
        //     images.push(x[z])
        // }
        if($scope.data.length == 0)
          $scope.data= dataIncomming.result;
        else{
          var new_items = arr_diff($scope.data, dataIncomming.result);
          console.log(new_items);
          for(var i=0;i<new_items.length;i++){
            $scope.data.push(new_items[i]);
            console.log(new_items);
          }
        }
        

        
        
        $('#container').imagesLoaded()
        .always(function( instance ) {
          //console.log("1")
          console.log(dataIncomming);
          setTimeout(function(){getData("?id="+dataIncomming.pagination.next_max_tag_id);},1000);
        })
        .done( function( instance ) {
          $('#container .item').addClass("loaded")
        })
        .fail( function() {
          $('#container .item').addClass("loaded")
        })
        .progress( function( instance, image ) {
          var result = image.isLoaded ? 'loaded' : 'broken';
        }); 


	    }).
	    error(function (data, status, headers, config) {
	      $scope.data = 'Error!'
	    });
     }
    function arr_diff(a1, a2)
    {
      var a=[], diff=[];
      for(var i=0;i<a1.length;i++)
        a[a1[i].id]=a1[i];
      for(var i=0;i<a2.length;i++)
        if(a[a2[i].id]) delete a[a2[i].id];
        else a[a2[i].id]=a2[i];
      for(var k in a)
        diff.push(a[k]);
      return diff;
    }

    
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
/*
    function getData_(){
      if(!latest)
        getData();
      else
        getData("/?id="+latest);
      
      setTimeout(function(){getData_()},3000)
    }


    var wrapper = $('#container');
    var $container = $('#container').masonry();
    wrapper.imagesLoaded( function(){
      new Masonry( container, {
      itemSelector : '.item'
        });
    });


*/