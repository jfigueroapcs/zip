// Module Main Controllers
angular.module('main.controllers', ['ngCordova', 'ngSanitize'])

.controller('MainCtrl', ['$scope', '$http', 'appService', '$ionicScrollDelegate', '$sce', '$cordovaSocialSharing', '$cordovaInAppBrowser', function($scope, $http, appService, $ionicScrollDelegate, $sce, $cordovaSocialSharing, $cordovaInAppBrowser) {

    $scope.categoryPost = {};

	// Single post redirect to single post page
	$scope.singlePost = function(item) {

		$scope.post = item;
		window.location = "#/app/posts/post";

	}

	// Get Categpries Method
	$scope.getCategories = function() {

	    $http.get(appService.url + '/?json=get_category_index').
	        then(function(response) {

	            $scope.categories = response.data;

	        }, function(response) {

	    });

	}

	// Get Categories
	$scope.getCategories();

    /* Get News Category for Home Page. Change Slug If you want your home page to be different */
    $http.get(appService.url + '/api/core/get_category_posts/?slug=' + 'news').
        then(function(response) {

            $scope.news = response.data;

        }, function(response) {

    });

	// Get Category Post
	$scope.getCategoryPost = function(id) {

	    $http.get(appService.url + '/api/core/get_category_posts/?id=' + id).
	        then(function(response) {

	            $scope.categoryPost = response.data;
	            window.location = "#/app/posts";

	        }, function(response) {

	    });

	}

	// Get Recent Post
	$scope.getrecentPost = function() {
	 
	    $http.get(appService.url + '/?json=get_recent_posts').
	    then(function(response) {

	        $scope.categoryPost = response.data;
	        window.location = "#/app/posts";

	    }, function(response) {

	    });

	}

	// Share Via Social media
    $scope.shareAnywhere = function(content, title, url) {
        $cordovaSocialSharing.share(content, title, null, url);
    }

    // Searches Posts based on query
    $scope.search = function(query){

        $http.get(appService.url + '/api/core/get_search_results/?search=' + query).
            then(function(response) {

                $scope.searchResult = response.data;

            }, function(response) {

        });
        
    }

    $scope.trustHtml = function(html) {

        $scope.newString = html.replace(/width/g,"none");
        $scope.newString = $scope.newString.replace(/wp-video-shortcode/g,"video-box");
        $scope.newString = $scope.newString.replace(/wp-audio-shortcode/g,"video-box");
        $scope.newString = $scope.newString.replace(/height/g,"none");
        $scope.newString = $scope.newString.replace(/hidden/g,"none");
        $scope.trustedHtml = $sce.trustAsHtml($scope.newString);

    }

    $scope.singleTrustHtml = function(html) {

        $scope.newString = html.replace(/width/g,"none");
        $scope.newString = $scope.newString.replace(/wp-video-shortcode/g,"video-box");
        $scope.newString = $scope.newString.replace(/wp-audio-shortcode/g,"video-box");
        $scope.newString = $scope.newString.replace(/height/g,"none");
        $scope.newString = $scope.newString.replace(/hidden/g,"none");
        $scope.singleTrustedHtml = $sce.trustAsHtml($scope.newString);

    }

    $scope.inpp = function(){

		$scope.m = "messsage";
		var options = {
		      location: 'yes',
		      clearcache: 'yes',
		      toolbar: 'no'
		    };
		 $cordovaInAppBrowser.open('http://ngcordova.com', '_self', options);
    }

    $scope.page = function(){

		$scope.htm = '';
    }


    
    $scope.geturl = function(url) {

        $scope.videoUrl = $sce.trustAsResourceUrl(url);

    } 

	    /*
	   * if given group is the selected group, deselect it
	   * else, select the given group
	   */
	  $scope.toggleGroup = function(group) {
	    group.show = !group.show;
	  };

	  $scope.isGroupShown = function(group) {
	    return group.show;
	  };



}]);