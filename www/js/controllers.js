angular.module('starter.controllers', [])

.controller('NewsCtrl', function(RemoteNews) {
  var vm = this;
 // vm.articles = News.getNews()
  var theNews = RemoteNews.all(); //get all news item
  theNews.then(function(result){
  	vm.articles = result.data;  //news data is returned
  	for(var i = 0; i < vm.articles.length; i++){  //loop through each elements key
  			//console.log("number of likes", vm.articles[i].likes);

				//return word plural based on number of like items
  			if(vm.articles[i].likes > 1){
  				vm.articles[i].likeDescription = 'likes';
  			}
  			else{
  				vm.articles[i].likeDescription = 'like';
  				
  			} 
  	}
  })
})

/**
 * handles chat history among cats
 */
.controller('ChatsCtrl', function($scope, RemoteChat) { 
  //$scope.chats = RemoteChat.allChat();
  var allChats = RemoteChat.allChat();
  allChats.then(function(snapShot){
  	$scope.chats = snapShot.data;
  	var count = 0;
  	for (var i=0; i < $scope.chats.length; i++){
  		//console.log($scope.chats[i].unread);
  		if($scope.chats[i].unread == true){
  			$scope.chats[i].chatStyle = {
  			    "font-weight" : "bold"
  			  }
  			count++;
  		}
  	}
  	//console.log(count);
  	$scope.notRead = '('+count+')';	
  })
  //create the request callback
  //Iterate through the Chat Message Object
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

/**
 * Details of chat among cats
 */
.controller('ChatDetailCtrl', function($scope, $http, RemoteChat, $stateParams, $ionicPopup) {
  

  $scope.chat = [];
  RemoteChat.getChat($stateParams.chatId).then(function(result){
  	$scope.chat = result.data;
  })

 //$http.defaults.headers.common['catbook­apikey'] = 'catbook123secretapikey';
 //$http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
  
$scope.showAlert = function(msg) { //if condition not met
  var alertPopup = $ionicPopup.alert({
  	 title: 'Error Message',
  	 template: msg
     });
   };
 
 $scope.replyChat = function(){  //post request to reply a chat(s)
 	$http({
 		method: 'POST',
 		url: 'https://facebook-for-cats-api.herokuapp.com/echoThePost',
 		data : $scope.reply,
 		headers : {
 			'Authorization' : 'catbook123secretapikey',
 			'Content-Type' : 'application/json; charset=utf-8',
 			
 			'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers'
 		}
 		
 	}).success(function(){
 		$scope.showAlert('Pass');
 	}).error(function(){
 		$scope.showAlert('Dog');
 	})
 }
  
})

/**
 * Return photo avatar of each cat(s)
 */
.controller('PhotoCtrl', function(Photos) { 
  
  var vm = this;
  
  vm.photos = Photos.getPhotos();
  
});
