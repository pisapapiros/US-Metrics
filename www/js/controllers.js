angular.module('starter.controllers', [])


.controller('ConvertersCtrl', function($scope, ConvertersFactory) {

	$scope.converters = [];

	if (window.localStorage.settings)	
    	var settings = JSON.parse(window.localStorage.settings);

    angular.forEach(ConvertersFactory.all(), function(converter, key) {
    	if (settings[key].active)
    		$scope.converters.push(converter);
	});

})


.controller('ConverterCtrl', function($scope, $stateParams, ConvertersFactory) {

	$scope.data = {
	    'converter': {},
	};
	/* What does a converter look like?
		{id: 0, name: 'Currency', factors: [{label:'dollar', conversion_value:1.28}, {label:'euro', conversion_value:1}]},*/

	$scope.data.converter = ConvertersFactory.get($stateParams.converterId);
	
	$scope.updateValues = function(factor_changed){ 
		/* What does a factor look like?
		{label: "euro", conversion_value: 1, input_value: 5} */
		if ($scope.data.converter.name == 'Temperature'){
			angular.forEach($scope.data.converter.factors, function(factor, key) {
				if (factor.label != factor_changed.label){
					if (factor.label == 'Celsius (°C)') //to celsius -32 *5 /9
						factor.input_value = (factor_changed.input_value -32) *0.55556;
					else //to farenheit 
						factor.input_value =  (factor_changed.input_value /0.55556) + 32;
				}
	    	});
		}else{
			angular.forEach($scope.data.converter.factors, function(factor, key) {
				console.warn("Iteration "+key);
				console.log("Factor label: "+factor.label);
				console.log("Factor changed: "+factor_changed.label);
				console.log("Factor input: "+factor.input_value);
				console.log("Factor changed input: "+factor_changed.input_value);
				if (factor.label != factor_changed.label){
					if (factor.conversion_value == 1)
						factor.input_value = factor_changed.input_value / factor_changed.conversion_value
					else{
						//first we convert it to the reference metric
						factor.input_value = factor_changed.input_value * factor.conversion_value;
						factor.input_value = factor.input_value / factor_changed.conversion_value;
					}
				}
				console.log("Post- Factor input: "+factor.input_value);
				console.log("Post- Factor changed input: "+factor_changed.input_value);
	    	});
		}
	};


	$scope.updateCurrency = function(){
		angular.forEach($scope.data.converter.factors, function(factor, key) {
			if(factor.label == 'Dollars ($)'){
				ConvertersFactory.getCurrencyRate('USD').then(
			        function (success) {
			          factor.conversion_value = success;
			          window.plugins.toast.showShortTop('Updated');
			        },
			        function (error) {
			        	window.plugins.toast.showShortTop(error);
			        }
			    );
			}
			else if(factor.label == 'Pounds (£)'){
				ConvertersFactory.getCurrencyRate('GBP').then(
			        function (success) {
			          factor.conversion_value = success;
			          window.plugins.toast.showShortTop('Updated');
			    	},
			        function (error) {
			        	window.plugins.toast.showShortTop(error);
			        }
			    );
			}
	    });		
	};
	

})


.controller('SettingsCtrl', function($scope, ConvertersFactory) {

	if (window.localStorage.settings)
		$scope.settings = JSON.parse(window.localStorage.settings);
	else{
		$scope.settings = [
			{name: 'Currency', active: true},
			{name: 'Temperature', active: true},
			{name: 'Speed', active: true},
			{name: 'Area', active: true},
			{name: 'Length', active: true},
			{name: 'Volume', active: true},
			{name: 'Mass', active: true}
		];
	}
  	 
  $scope.settingOnChange = function(){
    window.localStorage.settings = JSON.stringify($scope.settings);
  };

})


.controller('AboutCtrl', function($scope) {
});
