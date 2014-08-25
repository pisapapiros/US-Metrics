angular.module('starter.services', [])

.factory('ConvertersFactory', function($http, $q) {


  var converters = [
    { id: 0, name: 'Currency', active: true, icon: 'ion-cash', factors: [
      {label:'Euros (€)', conversion_value:1, active: true},
      {label:'Dollars ($)', conversion_value:1.34, active: true},
      {label:'Pounds (£)', conversion_value:0.79, active: true},
      {label:'Pesetas (Ptas)', conversion_value:166.386, active: true}
    ] },
    { id: 1, name: 'Temperature', active: true, icon: 'ion-thermometer', factors: [
      {label:'Celsius (°C)', conversion_value:1, active: true},
      {label:'Farenheit (°F)', conversion_value:33.8, active: true},
    ] },
    { id: 2, name: 'Speed', active: true, icon: 'ion-speedometer', factors: [
      {label:'Kilometers per hour (km/h)', conversion_value:1, active: true},
      {label:'Miles per hour (mph)', conversion_value:0.621371, active: true},
    ]  },
    { id: 3, name: 'Area', active: true , icon: 'ion-map', factors: [
      {label:'Square meter (m^2)', conversion_value:1, active: true},
      {label:'Square foot (ft^2)', conversion_value:10.76391, active: true},
    ] },
    { id: 4, name: 'Length', active: true, icon: 'ion-arrow-resize', factors: [
      {label:'Meters (m)', conversion_value:1, active: true},
      {label:'Centimeters (cm)', conversion_value:100, active: true},      
      {label:'Feet (ft)', conversion_value:3.2808399, active: true},
      {label:'Inches (in)', conversion_value:39.37, active: true},
      {label:'Yards (yd)', conversion_value:1.0936133, active: true},
      {label:'Land miles (mi)', conversion_value:0.000621371192, active: true},
    ] },
    { id: 5, name: 'Volume', active: true, icon: 'ion-beer', factors: [
      {label:'Liters (l)', conversion_value:1, active: true},
      {label:'Cubic meters (m^3)', conversion_value:0.001, active: true},
      {label:'Cubic feet (ft^3)', conversion_value:0.035315, active: true},
      {label:'US Gallons (gal)', conversion_value:0.264172052, active: true},
      {label:'US Fluid ounces (fl oz)', conversion_value:33.8140227, active: true},
      {label:'US Quarts', conversion_value:1.05668821, active: true},
      {label:'US Pints (pt)', conversion_value:2.11337642, active: true},
      {label:'UK Quarts', conversion_value:0.87987663, active: true},
      {label:'UK Pints (pt)', conversion_value:1.75975326, active: true},
      {label:'UK Gallons (gal)', conversion_value:0.219969157, active: true},
      {label:'UK Fluid ounces (fl oz)', conversion_value:35.195009, active: true},
    ]  },
    { id: 6, name: 'Mass', active: true, icon: 'ion-man', factors: [
      {label:'Kilograms (kg)', conversion_value:1, active: true},
      {label:'Grams (g)', conversion_value:1000, active: true},
      {label:'Ounces (oz)', conversion_value:35.2739619, active: true},
      {label:'Pounds (lb)', conversion_value:2.20462262, active: true},
    ] },
  ];

  return {
    all: function() {
      return converters;
    },
    get: function(converterId) {
      return converters[converterId];
    },
    getCurrencyRate: function(currency_code){
      var deferred = $q.defer();

      $http({method: 'GET', url: 'http://rate-exchange.appspot.com/currency?from=EUR&to='+currency_code}).
        success(function(data, status, headers, config) {
          deferred.resolve(data.rate);
      }).error(function(data, status, headers, config) {
        deferred.reject('Invalid data received from server');
      });

      return deferred.promise;
    }

  }

});
