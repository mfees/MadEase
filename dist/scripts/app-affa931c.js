"use strict";angular.module("madEase",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.router","ui.bootstrap","firebase"]).config(["$stateProvider","$urlRouterProvider",function(e,s){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl",controllerAs:"main"}).state("search",{url:"/find-closet",templateUrl:"app/states/search.html",controller:"SearchCtrl",controllerAs:"search"}).state("add",{url:"/add-closet",templateUrl:"app/states/add-closet.html",controller:"addCtrl",controllerAs:"add"}).state("closets",{url:"/closets/:userId/:closetId",templateUrl:"app/states/closets.html",controller:"ClosetCtrl",controllerAs:"closet"}).state("closets.shirts",{url:"/:id/:closetId/shirt-form",templateUrl:"app/states/shirt-form.html",controller:"ShirtCtrl",controllerAs:"shirt"}).state("closets.pants",{url:"/:id/:closetId/pant-form",templateUrl:"app/states/pant-form.html",controller:"PantsCtrl",controllerAs:"pants"}).state("closets.shoes",{url:"/:id/:closetId/shoe-form",templateUrl:"app/states/shoe-form.html",controller:"ShoesCtrl",controllerAs:"shoes"}).state("closets.access",{url:"/:id/:closetId/access-form",templateUrl:"app/states/access-form.html",controller:"AccessoriesCtrl",controllerAs:"accessories"}).state("favorites",{url:"/favorites",templateUrl:"app/states/favorites.html"}).state("login",{url:"/login",templateUrl:"app/states/login.html",controller:"LoginCtrl",controllerAs:"login"}),s.otherwise("/")}]).factory("Auth",["$firebaseObject","$state",function(e,s){function t(s){if(console.log(s),null===s)return null;var t=a.child("users").child(s.facebook.id);return t.update({uid:s.facebook.id,facebook:s.facebook,fullName:s.facebook.displayName,firstName:s.facebook.cachedUserProfile.first_name,lastName:s.facebook.cachedUserProfile.last_name,avatarUrl:s.facebook.cachedUserProfile.picture.data.url}),t=e(a.child("users").child(s.facebook.id)),o=t,t}var a=new Firebase("https://madease.firebaseio.com"),o={};return{onAuth:function(e){a.onAuth(function(s){e(t(s))})},fbLogin:function(){return a.authWithOAuthPopup("facebook",function(e,t){console.log(t),e?console.log("Login Failed!",e):(s.go("home"),console.log("Authenticated successfully with payload:",t))},{remember:"sessionOnly"})},logout:function(){a.unauth(),s.go("login"),console.log("goodbye")},loggedIn:function(){return a.getAuth()?!0:void 0},getUser:function(){return o}}}]),angular.module("madEase").controller("NavCtrl",["Auth",function(e){var s=this;this.logout=e.logout,e.onAuth(function(e){s.user=e,console.log(e)})}]),angular.module("madEase").controller("MainCtrl",["Auth","$firebaseObject","$firebaseArray",function(e,s,t){var a=this;e.onAuth(function(e){a.user=e,console.log(e)}),this.lastCloset=new Firebase("https://madease.firebaseio.com/closets/"+a.user.$id).limitToLast(1),this.recent=t(this.lastCloset),console.log(this.recent)}]),angular.module("madEase").controller("LoginCtrl",["$firebaseArray","$firebaseObject","Auth",function(e,s,t){new Firebase("https://madease.firebaseio.com/users");this.fbLogin=t.fbLogin,t.onAuth(function(e){self.user=e}),console.log(self.user.fullName)}]);var app=angular.module("madEase");app.controller("ShoesCtrl",["$firebaseArray","$firebaseObject","Auth","$stateParams",function(e,s,t,a){var o=this;t.onAuth(function(e){o.user=e}),this.newShoes={title:"",subhead:"",image:""},document.getElementById("upload_widget_opener").addEventListener("click",function(){cloudinary.openUploadWidget({cloud_name:"madease",upload_preset:"ejxt3qdf"},function(e,s){return console.log(s[0].url),o.newShoes.image=s[0].url})},!1),console.log(o.user),this.ref=new Firebase("https://madease.firebaseio.com/closets/"+o.user.$id+"/"+a.closetId+"/content/shoes"),this.shoes=s(this.ref),this.shoes.$loaded().then(function(e){console.log(e.shoes),console.log(o.shoes)}),this.addShoes=function(e){return o.ref.push(e),o.newShoes={title:"",subhead:"",image:""}}}]);var app=angular.module("madEase");app.controller("ShirtCtrl",["$firebaseArray","$firebaseObject","Auth","$stateParams",function(e,s,t,a){var o=this;t.onAuth(function(e){o.user=e}),this.newShirt={title:"",subhead:"",image:""},document.getElementById("upload_widget_opener").addEventListener("click",function(){cloudinary.openUploadWidget({cloud_name:"madease",upload_preset:"ejxt3qdf"},function(e,s){return console.log(s[0].url),o.newShirt.image=s[0].url})},!1),console.log(o.user),this.ref=new Firebase("https://madease.firebaseio.com/closets/"+o.user.$id+"/"+a.closetId+"/content/shirts"),this.shirt=s(this.ref),this.shirt.$loaded().then(function(e){console.log(e.shirts),console.log(o.shirt)}),this.addShirt=function(e){return o.ref.push(e),o.newShirt={title:"",subhead:"",image:""}}}]);var app=angular.module("madEase");app.controller("SearchCtrl",["$firebaseArray","$firebaseObject","Auth","$stateParams",function(e,s,t){var a=this;t.onAuth(function(e){a.user=e}),console.log(a.user);var o=new Firebase("https://madease.firebaseio.com/closets/"+a.user.$id);this.search=e(o),this.search.$loaded().then(function(e){console.log(e)}),console.log(this.search)}]);var app=angular.module("madEase");app.controller("PantsCtrl",["$firebaseArray","$firebaseObject","Auth","$stateParams",function(e,s,t,a){var o=this;t.onAuth(function(e){o.user=e}),this.newPants={title:"",subhead:"",image:""},document.getElementById("upload_widget_opener").addEventListener("click",function(){cloudinary.openUploadWidget({cloud_name:"madease",upload_preset:"ejxt3qdf"},function(e,s){return console.log(s[0].url),o.newPants.image=s[0].url})},!1),console.log(o.user),this.ref=new Firebase("https://madease.firebaseio.com/closets/"+o.user.$id+"/"+a.closetId+"/content/pants"),this.pants=s(this.ref),this.pants.$loaded().then(function(e){console.log(e.pants),console.log(o.pants)}),this.newPants={title:"",subhead:"",image:""},this.addPants=function(e){return o.ref.push(e),o.newPants={title:"",subhead:"",image:""}}}]),angular.module("madEase").controller("LoginCtrl",["$firebaseArray","$firebaseObject","Auth",function(e,s,t){new Firebase("https://madease.firebaseio.com");this.fbLogin=t.fbLogin,t.onAuth(function(e){self.user=e})}]);var app=angular.module("madEase");app.controller("ClosetCtrl",["$firebaseArray","$firebaseObject","Auth","$stateParams",function(e,s,t,a){var o=this;t.onAuth(function(e){o.user=e}),console.log(o.user);var l=new Firebase("https://madease.firebaseio.com/closets/"+a.userId+"/"+a.closetId);this.info=s(l),console.log(this.info)}]);var app=angular.module("madEase");app.controller("addCtrl",["$firebaseArray","$firebaseObject","Auth","$state",function(e,s,t,a){var o=this;t.onAuth(function(e){o.user=e}),console.log(o.user),this.closet=new Firebase("https://madease.firebaseio.com/closets/"+o.user.$id),this.myCloset=s(this.closet),this.newCloset={closetTitle:"",subhead:"",content:{pants:{},shirts:{},shoes:{},accessories:{}}},this.addCloset=function(e){return o.closet.push(e),a.go("search"),this.newCloset={closetTitle:"",subhead:"",content:{pants:{},shirts:{},shoes:{},accessories:{}}}}}]);var app=angular.module("madEase");app.controller("AccessoriesCtrl",["$firebaseArray","$firebaseObject","Auth","$stateParams",function(e,s,t,a){var o=this;t.onAuth(function(e){o.user=e}),this.newAccessories={title:"",subhead:"",image:""},document.getElementById("upload_widget_opener").addEventListener("click",function(){cloudinary.openUploadWidget({cloud_name:"madease",upload_preset:"ejxt3qdf"},function(e,s){return console.log(s[0].url),o.newAccessories.image=s[0].url})},!1),console.log(o.user),this.ref=new Firebase("https://madease.firebaseio.com/closets/"+o.user.$id+"/"+a.closetId+"/content/accessories"),this.accessories=s(this.ref),this.accessories.$loaded().then(function(e){console.log(e.accessories),console.log(o.accessories)}),this.addAccessories=function(e){return o.ref.push(e),o.newAccessories={title:"",subhead:"",image:""}}}]),angular.module("madEase").run(["$templateCache",function(e){e.put("app/login/login.html",'<section class="text-container"><div class="secondary-text-container"><section class="text-area"><div class="row"><div class="welcome-message col-sm-12 col-md-6"><h1>Hello, Beautiful!</h1><div class="line-decoration"><img src="./assets/images/line-decoration.png"></div><p class="main-paragraph">Hi boys. I\'m Tina. I need both ears to hold up my glasses. Everything I know to be true just went out the window. I texted back a smiley face. She texted back some letters I don\'t understand.</p></div><div class="field-container col-sm-12 col-md-6"><div class="input-group e-field"><span class="input-group-addon" id="sizing-addon2">E</span> <input type="text" class="form-control" placeholder="Email" aria-describedby="sizing-addon2" required=""></div><div class="input-group p-field"><span class="input-group-addon" id="sizing-addon2">P</span> <input type="text" class="form-control" placeholder="Password" aria-describedby="sizing-addon2" required=""></div><div class="submit-container"><button type="submit" class="btn btn-default">Login</button> <a ng-click="login.fbLogin()"><img src="../assets/images/facebook.png"></a></div></div></div></section></div></section>'),e.put("app/main/main.html",'<section class="banner"><div class="tagline"><p>one less decision you have to make today</p></div></section><section class="text-container"><div class="secondary-text-container"><section class="text-area"><h1>Hello, Beautiful!</h1><div class="line-decoration"><img src="./assets/images/line-decoration.png"></div><p class="main-paragraph">We at MadEase know how difficult finding the perfect outfit can be, so we wanted to make it a little easier for you. Take a tour through your closets and all of the clothing you own by starting your first closet today!</p></section><div class="row"><ul class="button-container"><li class="col-xs-12 col-sm-6 col-md-6 col-lg-3"><a ui-sref="closets({userId: main.user.$id, closetId: main.recent[0].$id})"><div class="cta recent-cta"></div><div class="button-title-yellow"><h2 class="button-text">Recent Closet</h2></div></a></li><li class="col-xs-12 col-sm-6 col-md-6 col-lg-3"><a ui-sref="search"><div class="cta search-cta"></div><div class="button-title-blue"><h2 class="button-text">My Closets</h2></div></a></li><li class="col-xs-12 col-sm-6 col-md-6 col-lg-3"><a ui-sref="add"><div class="cta add-cta"></div><div class="button-title-green"><h2 class="button-text">Add Closet</h2></div></a></li><li class="col-xs-12 col-sm-6 col-md-6 col-lg-3"><a ui-sref="favorites"><div class="cta favorites-cta"></div><div class="button-title-red"><h2 class="button-text">Favorites</h2></div></a></li></ul></div></div></section>'),e.put("app/states/access-form.html",'<h3>Accessories</h3><form ng-submit="accessories.addAccessories(accessories.newAccessories)" id="access"><div class="form-group"><a class="btn upload-btn" id="upload_widget_opener">Upload Image</a> <input ng-model="accessories.newAccessories.image" value="{{accessories.newAccessories.image}}" placeholder="Image will go here"> <label class="upload-label" for="exampleInputFile">While you wait for your image to upload above, give your shirt some details below!</label></div><div class="form-group"><label class="label-text" for="exampleInputEmail1">Accessory Name</label> <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Name" ng-model="accessories.newAccessories.title"></div><div class="form-group"><label class="label-text" for="exampleInputPassword1">Description</label> <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Description" ng-model="accessories.newAccessories.subhead"></div><button type="submit" class="btn btn-default">Submit</button></form><hr><div class="row"><div class="col-xs-12 col-sm-6 col-md-3" ng-repeat="accessories in accessories.accessories"><a href="#" class="img-thumbnail"><img ng-src="{{accessories.image}}" alt="..."></a><div class="clothing-info-container"><h4 class="clothing-title">{{accessories.title}}</h4><p class="main-paragraph">{{accessories.subhead}}</p></div></div></div>'),e.put("app/states/add-closet.html",'<section class="text-container"><div class="secondary-text-container"><a class="btn btn-default" ui-sref="find-closet" role="button">Back to My Closets</a><h1>Add A Closet</h1><div class="line-decoration"><img src="./assets/images/line-decoration.png"></div><form ng-submit="add.addCloset(add.newCloset)"><div class="form-group"><label for="exampleInputEmail1">Closet Name</label> <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Name" ng-model="add.newCloset.closetTitle"></div><div class="form-group"><label for="exampleInputPassword1">Closet Description</label> <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Description" ng-model="add.newCloset.subhead"></div><button type="submit" class="btn btn-default">Submit</button></form></div></section>'),e.put("app/states/closets.html",'<section class="text-container"><div class="secondary-text-container"><a class="btn btn-default" ui-sref="search" role="button">Back to My Closets</a><h1>{{closet.info.closetTitle}}</h1><div class="line-decoration"><img src="./assets/images/line-decoration.png"></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-3"><a ui-sref="closets.shirts" class="clothing-thumbnail thumbnail shirts"></a></div><div class="col-xs-12 col-sm-6 col-md-3"><a ui-sref="closets.pants" class="clothing-thumbnail thumbnail pants"></a></div><div class="col-xs-12 col-sm-6 col-md-3"><a ui-sref="closets.shoes" class="clothing-thumbnail thumbnail shoes"></a></div><div class="col-xs-12 col-sm-6 col-md-3"><a ui-sref="closets.access" href="#access" class="clothing-thumbnail thumbnail accessories"></a></div></div><section class="text-area"><p class="main-paragraph">Select a category you would like to add too. Then use the upload form provided to add your clothing articles to the specific categories.</p></section><hr><div ui-view=""></div></div></section>'),e.put("app/states/favorites.html",""),e.put("app/states/home.html",""),e.put("app/states/login.html",'<section class="text-container"><div class="secondary-text-container-login"><section class="text-area"><div class="welcome-message"><h1>Hello Beautiful!</h1><div class="line-decoration"><img src="./assets/images/line-decoration.png"></div><p class="main-paragraph">An open source webapp that allows the user to document their clothing in order to help them select their outfit for the day. Login through facebook to start your first closet!</p></div><div class="submit-container"><a ng-click="login.fbLogin()"><img src="../assets/images/facebook.png"></a></div></section></div></section>'),e.put("app/states/pant-form.html",'<h3>Pants</h3><form ng-submit="pants.addPants(pants.newPants)"><div class="form-group"><a class="btn upload-btn" id="upload_widget_opener">Upload Image</a> <input ng-model="pants.newPants.image" value="{{pants.newPants.image}}" placeholder="Image will go here"> <label class="upload-label" for="exampleInputFile">While you wait for your image to upload above, give your shirt some details below!</label></div><div class="form-group"><label class="label-text" for="exampleInputEmail1">Pant Name</label> <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Name" ng-model="pants.newPants.title"></div><div class="form-group"><label class="label-text" for="exampleInputPassword1">Description</label> <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Description" ng-model="pants.newPants.subhead"></div><button type="submit" class="btn btn-default">Submit</button></form><hr><div class="row"><div class="col-xs-12 col-sm-6 col-md-3" ng-repeat="pants in pants.pants"><a href="#" class="img-thumbnail"><img ng-src="{{pants.image}}" alt="..."></a><div class="clothing-info-container"><h4 class="clothing-title">{{pants.title}}</h4><p class="main-paragraph">{{pants.subhead}}</p></div></div></div>'),e.put("app/states/search.html",'<section class="text-container"><div class="secondary-text-container"><a class="btn btn-default" ui-sref="home" role="button">Home</a><h1>My Closets</h1><div class="line-decoration"><img src="./assets/images/line-decoration.png"></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-3" ng-repeat="closets in search.search"><a ui-sref="closets({userId: search.user.$id, closetId: closets.$id})" class="thumbnail"><h3 class="search-title">{{closets.closetTitle}}</h3></a></div><div class="col-xs-12 col-sm-6 col-md-3"><a ui-sref="add-closet" class="add-closet-btn thumbnail"></a></div></div></div></section>'),e.put("app/states/shirt-form.html",'<h3>Shirts</h3><form ng-submit="shirt.addShirt(shirt.newShirt)"><div class="form-group"><a class="btn upload-btn" id="upload_widget_opener">Upload Image</a> <input ng-model="shirt.newShirt.image" value="{{shirt.newShirt.image}}" placeholder="Image will go here"> <label class="upload-label" for="exampleInputFile">While you wait for your image to upload above, give your shirt some details below!</label></div><div class="form-group"><label class="label-text" for="exampleInputEmail1">Shirt Name</label> <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Name" ng-model="shirt.newShirt.title"></div><div class="form-group"><label class="label-text" for="exampleInputPassword1">Description</label> <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Description" ng-model="shirt.newShirt.subhead"></div><button type="submit" class="btn btn-default">Submit</button></form><hr><div class="row"><div class="col-xs-12 col-sm-6 col-md-3" ng-repeat="shirts in shirt.shirt"><a href="#" class="img-thumbnail"><img ng-src="{{shirts.image}}" alt="..."></a><div class="clothing-info-container"><h4 class="clothing-title">{{shirts.title}}</h4><p class="main-paragraph">{{shirts.subhead}}</p></div></div></div>'),e.put("app/states/shoe-form.html",'<h3>Shoes</h3><form ng-submit="shoes.addShoes(shoes.newShoes)"><div class="form-group"><a class="btn upload-btn" id="upload_widget_opener">Upload Image</a> <input ng-model="shoes.newShoes.image" value="{{shoes.newShoes.image}}" placeholder="Image will go here"> <label class="upload-label" for="exampleInputFile">While you wait for your image to upload above, give your shirt some details below!</label></div><div class="form-group"><label class="label-text" for="exampleInputEmail1">Shoe Name</label> <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Name" ng-model="shoes.newShoes.title"></div><div class="form-group"><label class="label-text" for="exampleInputPassword1">Description</label> <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Description" ng-model="shoes.newShoes.subhead"></div><button type="submit" class="btn btn-default">Submit</button></form><hr><div class="row"><div class="col-xs-12 col-sm-6 col-md-3" ng-repeat="shoes in shoes.shoes"><a href="#" class="img-thumbnail"><img ng-src="{{shoes.image}}" alt="..."></a><div class="clothing-info-container"><h4 class="clothing-title">{{shoes.title}}</h4><p class="main-paragraph">{{shoes.subhead}}</p></div></div></div>'),e.put("components/navbar/navbar.html",'<nav class="mobile-nav" ng-controller="NavCtrl as nav"><a ui-sref="home"><img class="device-logo" src="./assets/images/logo.png"></a><div class="user-info-position" ng-hide="nav.user == null"><img class="user-pic" ng-src="{{nav.user.avatarUrl}}"><p class="user-info">Hey {{nav.user.firstName}}!</p><button type="button" class="btn btn-danger logout-btn" ng-click="nav.logout()">Logout</button></div></nav><div class="line"></div>')}]);