﻿(function () {
    "use strict";

    angular.module(AppName)
        .controller("homeController", HomeController);

    HomeController.$inject = ["$scope", "$location", "$mdSidenav", "$timeout", "$log", "$q"];

    function HomeController($scope, $location, $mdSidenav, $timeout, $log, $q) {
        var vm = this;
        vm.$scope = $scope;
        vm.$location = $location;
        vm.$mdSidenav = $mdSidenav;
        vm.search = "";
        vm.buildToggler = _buildToggler;
        vm.toggleLeft = vm.buildToggler('left');
        vm.toggleRight = vm.buildToggler('right');
        // autocomplete
        vm.simulateQuery = true;
        // list of `state` value/display objects
        vm.states = loadAll();
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;
        vm.newState = newState;
        vm.sweetalert = _sweetalert;

        function newState(state) {
            alert("Sorry! You'll need to create a Constitution for " + state + " first!");
        }
        vm.restTimeSchedule = {
            Ten: 15,
            TenThirty: 1,
            Eleven: 13,
            ElevenThirty: 10,
            Twelve: 26,
            TwelveThirty: 22,
            One: 10,
            OneThirty: 5,
            Two: 7,
            TwoThirty: 10,
            Three: 3,
            ThreeThirty: 6,
            Four: 12,
            FourThirty: 2,
            Five: 14,
            FiveThirty: 28,
            Six: 10,
            SixThirty: 15,
            Seven: 29,
            SevenThirty: 32,
            Eight: 20,
            EightThirty: 17,
            Nine: 34,
            NineThirty: 24,
            Ten: 10
        };
        vm.landMarkSchedule = {
            Ten: 150,
            TenThirty: 100,
            Eleven: 130,
            ElevenThirty: 250,
            Twelve: 200,
            TwelveThirty: 220,
            One: 100,
            OneThirty: 500,
            Two: 700,
            TwoThirty: 450,
            Three: 1000,
            ThreeThirty: 647,
            Four: 800,
            FourThirty: 847,
            Five: 600,
            FiveThirty: 757,
            Six: 600,
            SixThirty: 150,
            Seven: 50,
            SevenThirty: 40,
            Eight: 30,
            EightThirty: 10,
            Nine: 20,
            NineThirty: 24,
            Ten: 10
        };
        vm.restaurantsModel = [
            {
                Image: "/Images/Mangia.jpg",
                Number: 1,
                Price: "$",
                Name: "Mangia Italian Ristorante on Wheels",
                Address: "Downtown Los Angeles Area",
                City: "Los Angeles, CA 90015",
                PhoneNumber: "(562) 400-1946",
                Distance: "0.05 Miles"
            },
            {
                Image: "/Images/Palikao.jpg",
                Number: 2,
                Price: "$$",
                Name: "Palikao",
                Address: "130 E 6th St",
                City: "Los Angeles, CA 90014",
                PhoneNumber: "(213) 265-7006",
                Distance: "1.2 Miles"
            },
            {
                Image: "/Images/ElCompadre.jpg",
                Number: 3,
                Price: "$$",
                Name: "El Compadre",
                Address: "1248 S Figueroa St",
                City: "Los Angeles, CA 90015",
                PhoneNumber: "(213) 749-0025",
                Distance: "0.01 Miles"
            },
            {
                Image: "/Images/FaithFlower.jpg",
                Number: 4,
                Price: "$$",
                Name: "Faith & Flower",
                Address: "705 W 9th St",
                City: "Los Angeles, CA 90015",
                PhoneNumber: "(213) 239-0642",
                Distance: "0.06 Miles"
            },
            {
                Image: "/Images/Cow.jpg",
                Number: 5,
                Price: "$",
                Name: "Cow",
                Address: "342 W Pico Blvd",
                City: "Los Angeles, CA 90015",
                PhoneNumber: "(213) 536-5255",
                Distance: "0.05 Miles"
            },
            {
                Image: "/Images/Prank.jpg",
                Number: 6,
                Price: "$$",
                Name: "Prank",
                Address: "1100 S Hope St",
                City: "Los Angeles, CA 90015",
                PhoneNumber: "(213) 493-4786",
                Distance: "0.04 Miles"
            },
            {
                Image: "/Images/Flavors.jpg",
                Number: 7,
                Price: "$",
                Name: "Flavors of Thai",
                Address: "1275 S Union Ave",
                City: "Los Angeles, CA 90015",
                PhoneNumber: "(213) 263-2535",
                Distance: "0.5 Miles"
            },
            {
                Image: "/Images/preux.jpg",
                Number: 8,
                Price: "$$",
                Name: "Preux & Proper",
                Address: "840 S Spring St",
                City: "Los Angeles, CA 90014",
                PhoneNumber: "(213) 896-0090",
                Distance: "0.9 Miles"
            },
            {
                Image: "/Images/Testa.jpg",
                Number: 9,
                Price: "$$",
                Name: "Testa",
                Address: "1111 S Hope St",
                City: "Los Angeles, CA 90015",
                PhoneNumber: "(213) 973-5013",
                Distance: "0.4 Miles"
            },
            {
                Image: "/Images/LittleSister.jpg",
                Number: 10,
                Price: "$$",
                Name: "Little Sister",
                Address: "523 W 7th St",
                City: "Los Angeles, CA 90017",
                PhoneNumber: "(213) 628-3146",
                Distance: "0.9 Miles"
            }
        ];
        vm.landmarkModel = [
            {
                Image: "/Images/HollywoodCity.jpg",
                Number: 1,
                Name: "Hollywood",
                Address: "5410 Hollywood Blvd",
                City: "Los Angeles, CA 90027",
                PhoneNumber: "(723) 626-1902",
                Distance: "4.7 Miles"
            },
            {
                Image: "/Images/HollywoodWalkofFame.jpg",
                Number: 2,
                Name: "Hollywood Walk of Fame",
                Address: "Hollywood Blvd & Vine St",
                City: "Hollywood, CA 90068",
                PhoneNumber: "(323) 469-8311",
                Distance: "5.3 Miles"
            },
            {
                Image: "/Images/HollywoodSign.jpg",
                Number: 3,
                Name: "Hollywood Sign",
                Address: "Griffith Park",
                City: "Los Angeles, CA 90068",
                PhoneNumber: "(213) 265-7006",
                Distance: "7.1 Miles"
            },
            {
                Image: "/Images/CocaCola.jpg",
                Number: 4,
                Name: "Coca-Cola Building",
                Address: "1334 S Central Ave",
                City: "Los Angeles, CA 90021",
                PhoneNumber: "(213) 746-5555",
                Distance: "1.7 Miles"
            },
            {
                Image: "/Images/LACityHall.jpg",
                Number: 5,
                Name: "Los Angeles City Hall",
                Address: "200 N Spring St",
                City: "Los Angeles, CA 90012",
                PhoneNumber: "(213) 485-2121",
                Distance: "0.06 Miles"
            },
            {
                Image: "/Images/Park.jpg",
                Number: 6,
                Name: "Los Angeles State Historic Park",
                Address: "1245 N Spring St",
                City: "Los Angeles, CA 90012",
                PhoneNumber: "(323) 441-8819",
                Distance: "2.7 Miles"
            },
            {
                Image: "/Images/campo.jpg",
                Number: 7,
                Price: "$$",
                Name: "Campo de Cahuenga",
                Address: "3919 Lankershim Blvd",
                City: "Studio City, CA 91604",
                PhoneNumber: "(818) 623-4166",
                Distance: "8.6 Miles"
            },
            {
                Image: "/Images/Bradbury.jpg",
                Number: 8,
                Name: "The Bradbury Building",
                Address: "304 S Broadway",
                City: "Los Angeles, CA 90013",
                PhoneNumber: "(213) 626-1893",
                Distance: "1.4 Miles"
            },
            {
                Image: "/Images/Egypt.jpg",
                Number: 9,
                Name: "Egyptian Theatre",
                Address: "6712 Hollywood Blvd",
                City: "Los Angeles, CA 90028",
                PhoneNumber: "(323) 461-2020",
                Distance: "5.6 Miles"
            },
            {
                Image: "/Images/heritage.jpg",
                Number: 10,
                Price: "$",
                Name: "Heritage Square Museum",
                Address: "3800 Homer St",
                City: "Los Angeles, CA 90031",
                PhoneNumber: "(323) 225-2700",
                Distance: "4.8 Miles"
            }
        ];
        vm.showFood = _showFood;
        vm.showLandmarks = _showLandmarks;
        vm.closeDetail = _closeDetail;
        vm.goBack = false;
        vm.model = {};
        vm.showPrompt = _showPrompt;
        vm.addEvent = _addEvent;
        vm.cancelAddEvent = _cancelAddEvent;
        vm.myDate = null;
        vm.time = null;
        vm.ampm = null;
        vm.confirmRide = _confirmRide;
        vm.confirm = _confirm;
        vm.chooseSpot = _chooseSpot;
        vm.sweetalert = _sweetalert;

        function _chooseSpot() {
            $('.bgImg0').fadeOut('slow');
        }
        vm.login = _login;
        vm.goToLogin = goTo;

        function goTo() {
            setTimeout(function () { window.location.href = '/Home/SignUp'; }, 1000);
        }

        function _login() {
            setTimeout(function () { window.location.href = '/Member/Index'; }, 1000);
        }

        function _confirmRide() {
            $('#searchAndPlan').slideUp('slow');
            $('#wing').fadeOut('fast');
            $('#confirmDetails').fadeIn('slow');
        }

        function _confirm() {
            $('#confirmButtons, #walkDetails, #allSet').slideUp();
            $('#eta, #rideDetails, #onRoute').slideDown();
            $('.bgImg').fadeOut('slow');
            $('.bgImg2').fadeIn('slow');

        }

        function _addEvent() {
            $('#planDetails').slideUp();
            toastr.options = {
                "positionClass": "toast-top-center"
            };
            toastr.success("Event added to plan!");
        }

        function _cancelAddEvent() {
            $('#planDetails').slideUp();
        }

        // autocomplete
        function querySearch(query) {
            var results = query ? vm.states.filter(createFilterFor(query)) : vm.states,
                deferred;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        function loadAll() {
            var allStates = 'Hollywood Walk of Fame, Coca-Cola Building,     Hollywood Sign, The Bradbury Building, Egyptian Theatre';

            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

		/**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };

        }


        function _showPrompt() {
            console.log(vm.model);
            $('#planDetails').slideDown();
        }

        function _onInit() {
            console.log("Home controller initiated");
        }

        function _buildToggler(componentId) {
            return function () {
                $mdSidenav(componentId).toggle();
            };
        }

        function _showFood() {
            $('#grid, #food, #backBtn, #planYourTrip').slideToggle();
        }

        function _showLandmarks() {
            $('#grid, #landmarks, #backBtn, #planYourTrip').slideToggle();
        }

        function _closeDetail() {
            if ($('#food').is(':visible')) {
                vm.showFood();
            } else if ($('#landmarks').is(':visible')) {
                vm.showLandmarks();
            }
        }

        function _sweetalert() {
            console.log("sweet alert clicked");
            (function () {
                swal({
                    title: "Are You Sure?",
                    text: "This Will Stop Your Vehicle",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    cancelButtonText: "Cancel",
                    confirmButtonText: "Yes, Stop My Vehicle",
                    closeOnCancel: true,
                    closeOnConfirm: false,
                    reverseButtons: false

                },
                    function (isConfirm) {
                        if (isConfirm) {
                            swal({
                                title: "Is This An Emergency?",
                                text: "Warning, This Will Call Emergency Services",
                                type: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                cancelButtonText: "Cancel",
                                confirmButtonText: "This Is An Emergency",
                                closeOnCancel: true,
                                closeOnConfirm: false,
                                reverseButtons: false

                            },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        toastr.error("EMERGENCY SERVICES CALLED");
                                    }
                                });
                        }
                    });
            })();
        }

    }

})();