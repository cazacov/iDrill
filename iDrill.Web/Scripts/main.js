var iDrill = {};

$(function () {
    iDrill.viewModel = (function () {
        var self = this,
            // input properties            
            wallWidth = ko.observable(undefined),
            heightDifference = ko.observable(undefined),
            distanceToWall = ko.observable(100),
            // output properties
            displayAngle = ko.observable("???"),
            displayLength = ko.observable("???"),
            displayPointHeight = ko.observable("???"),
            displayTiltAngle = ko.observable(0),
            resultClass = ko.observable("resultValue result-undefined"),
            cssTiltAngle = ko.observable("rotate(0deg)"),
            resultOk = ko.observable(false),
            angleOk = ko.observable(false),
            // functions
        run = function() {
            ko.applyBindings(iDrill.viewModel);
            wallWidth.subscribe(calculateAngle);
            heightDifference.subscribe(calculateAngle);
            distanceToWall.subscribe(calculateAngle);

            if (!window.DeviceOrientationEvent) {
                console.log("DeviceOrientation is not supported");
            } else {
                window.addEventListener("deviceorientation", deviceOrientationHandler);
            }
        },
        calculateAngle = function() {
            var angle = undefined,
                drillLength = undefined,
                pointHeight = undefined;

            if (wallWidth() <= 0 || wallWidth() >= 1000) {
                angle = undefined;
                drillLength = undefined;
                pointHeight = undefined;
                resultOk(false);
            } else if (Math.abs(heightDifference()) > 1000) {
                angle = undefined;
                drillLength = undefined;
                pointHeight = undefined;
                resultOk(false);
            } else {
                drillLength = (Math.sqrt(wallWidth() * wallWidth() + heightDifference() * heightDifference()));
                angle = (Math.acos(wallWidth() / drillLength));

                if (distanceToWall() < 5) {
                    distanceToWall(5);
                }
                pointHeight = distanceToWall() * Math.tan(angle);
                resultOk(true);
            }


            if (drillLength == undefined) {
                displayLength("???");
            } else {
                displayLength((Math.round(drillLength * 10) / 10));
            }
            if (angle == undefined) {
                displayAngle("???");
            } else {
                displayAngle(Math.round(angle * 180.0 * 10.0 / Math.PI ) / 10.0);
            }
            if (pointHeight == undefined) {
                displayPointHeight("???");
            } else {
                displayPointHeight((Math.round(pointHeight * 10) / 10));
            }

            if (resultOk()) {
                resultClass("resultValue result-ok");
            } else {
                resultClass("resultValue result-undefined");
            }
        },
        deviceOrientationHandler = function(eventData) {
            var d = eventData.beta;
            
            if (eventData.gamma > 0) {
                d = 180 - d;
            }

            var beta = -d;
            displayTiltAngle(Math.round(beta) * 10 / 10);
            
            if (resultOk()) {
                var b = displayTiltAngle() - 90 - displayAngle();
                cssTiltAngle("rotate(" + b + "deg)");
            }

            angleOk(Math.abs(displayTiltAngle() - displayAngle()) < 2);  // Toleranz: 2 Grad
        }; 


        return {
            // Wandstärke (cm)
            wallWidth: wallWidth,

            // Höheunterschied zwischen Eintritt und Austritt (cm)
            heightDifference: heightDifference,

            // Entfernung vom Eintritt zur Hohenermittlung der Bohrsäule (cm)
            distanceToWall: distanceToWall,

            // Winkel (grad)
            displayAngle: displayAngle,

            // Bohrlänge
            displayLength: displayLength,

            // Höhe der Säule
            displayPointHeight: displayPointHeight,

            resultClass: resultClass,
            
            displayTiltAngle: displayTiltAngle,
            
            cssTiltAngle: cssTiltAngle,
            
            resultOk : resultOk,
            
            angleOk: angleOk,

            // Funktionen
            run: run,
            calculateAngle: calculateAngle,
        };
    })();

    iDrill.viewModel.run();
});