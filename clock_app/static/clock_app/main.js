/**
 * Created by darkfree on 24.04.18.
 */
angular
    .module("clock_app", [])
    .component("app",
        {
            controller: function ($scope, $interval, $http) {
                $scope.clocks = [];
                $scope.updateView = function () {
                    $http.get("/api/clock?format=json").then(function (response) {
                        $scope.clocks = response.data;
                    });
                };
                $scope.updateView();
                $interval($scope.updateView, 60000);
                $scope.gmt = 0;
                $scope.addBelt = function () {
                    $scope.updateView();
                    $http.get('/time/belt/add?gmt='+$scope.gmt).then(function (data) {
                        alert(data.data);
                        $scope.gmt = 0;
                    })
                }
            },
            template: `<div style="display:inline-block;overflow-x:auto"><clock ng-repeat="clock in clocks" time="clock.time" city="clock.city" gmt="clock.gmt" style="float: left"></clock></div><br>Додати пояс <br><input ng-model="gmt" type="number" min="-24" max="24">  GMT  <button ng-click="addBelt()">Ok</button>`
        }
    )
    .component("clock",
        {
            controller: function () {},
            template: `<div style="text-align: center; width: 240px">{{ $ctrl.city ? $ctrl.city : ctrl.gmt}}<br><analogue-clock time="{{ $ctrl.time }}" size="200"></analogue-clock><br>{{ $ctrl.time }}</div>`,
            bindings: {
                city: '<',
                time: '<',
                gmt: '<',
            }
        }
    )
    .component("analogueClock",
        {
            controller: function ($scope, $element) {
                var canvas = $element.children()[0];
                var ctx = canvas.getContext("2d");
                var radius = 100;
                var f = true;
                radius = radius * 0.95;
                setTimeout(drawClock, 1000);

                function drawClock() {
                    drawFace(ctx, radius);
                    drawNumbers(ctx, radius);
                    drawTime(ctx, radius);
                }

                function drawFace(ctx, radius) {
                    var grad;
                    if (f) {
                        ctx.translate(radius + 5, radius + 5);
                        f = !f;
                    }
                    ctx.beginPath();
                    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
                    grad.addColorStop(0, '#333');
                    grad.addColorStop(0.5, 'white');
                    grad.addColorStop(1, '#333');
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = radius * 0.1;
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
                    ctx.fillStyle = '#333';
                    ctx.fill();
                }

                function drawNumbers(ctx, radius) {
                    var ang;
                    var num;
                    ctx.font = radius * 0.15 + "px arial";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    for (num = 1; num < 13; num++) {
                        ang = num * Math.PI / 6;
                        ctx.rotate(ang);
                        ctx.translate(0, -radius * 0.85);
                        ctx.rotate(-ang);
                        ctx.fillText(num.toString(), 0, 0);
                        ctx.rotate(ang);
                        ctx.translate(0, radius * 0.85);
                        ctx.rotate(-ang);
                    }
                }

                function drawTime(ctx, radius) {
                    var now = new Date();
                    var hour = $scope.$ctrl.time.split(":")[0];
                    var minute = $scope.$ctrl.time.split(":")[1];
                    var second = now.getSeconds();
                    //hour
                    hour = hour % 12;
                    hour = (hour * Math.PI / 6) +
                        (minute * Math.PI / (6 * 60)) +
                        (second * Math.PI / (360 * 60));
                    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
                    //minute
                    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
                    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
                }

                function drawHand(ctx, pos, length, width) {
                    ctx.beginPath();
                    ctx.lineWidth = width;
                    ctx.lineCap = "round";
                    ctx.moveTo(0, 0);
                    ctx.rotate(pos);
                    ctx.lineTo(0, -length);
                    ctx.stroke();
                    ctx.rotate(-pos);
                }
            },
            template: `<canvas ng-bind="cnv" width="{{$ctrl.size}}" height="{{$ctrl.size}}"></canvas>`,
            bindings: {
                time: '@',
                size: '@',
            }
        }
    );