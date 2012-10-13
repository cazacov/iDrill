var iDrill = {};

$(function () {
    iDrill.viewModel = (function () {
        var self = this,
            wallWidth = ko.observable(40),
            heightDifference = ko.observable(40),
            angle = ko.observable(0),
            drillLength = ko.observable(0),
            isAngleComputed = ko.observable(false),
            distanceToWall = ko.observable(100),
            pointHeight = ko.observable(100),
            run = function () {
                console.log("Hallo Welt!");
                ko.applyBindings(iDrill.viewModel);
            };

        return {
            // Wandstärke (cm)
            wallWidth: wallWidth,

            // Höheunterschied zwischen Eintritt und Austritt (cm)
            // Positiv, wenn der Eintrittspunkt höher liegt
            heightDifference: heightDifference,

            // Winkel 
            // Positiv, wenn der Eintrittspunkt höher liegt
            angle: angle,

            // Bohrlänge
            drillLength: drillLength,

            // der Winkel war gerade berechnet
            isAngleComputed: isAngleComputed,

            // Entfernung vom Eintritt zur Hohenermittlung der Bohrsäule (cm)
            distanceToWall: distanceToWall,

            // Höhe der Säule
            pointHeight: pointHeight,

            // Funktionen
            run: run
        };
    })();

    iDrill.viewModel.run();
});