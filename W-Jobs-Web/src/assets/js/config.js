(function () { 'use strict';

angular
	.module('app')
	.config(config);

	config.$inject = ['$translateProvider', '$httpProvider', 'localStorageServiceProvider','jwtOptionsProvider'];

	function config($translateProvider, $httpProvider, localStorageServiceProvider, jwtOptionsProvider) { 

		$translateProvider.useStaticFilesLoader({
				prefix: 'src/assets/js/resources/locale/',
				suffix: '.json'
			});

		jwtOptionsProvider.config({
			whiteListedDomains: ['localhost'],
			unauthenticatedRedirectPath: '/',
      tokenGetter: ['tokenService', function(tokenService) {
        return tokenService.getToken();
      }]
    });

		$httpProvider.interceptors.push('jwtInterceptor');

		$translateProvider.useSanitizeValueStrategy('sanitizeParameters');
		$translateProvider.preferredLanguage('en');

		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest'; 
		$httpProvider.defaults.headers.common["Accept-Language"] = "en";
		$httpProvider.defaults.headers["delete"] = {'Content-Type': 'application/json;charset=utf-8'};
		$httpProvider.interceptors.push('headerInterceptor');

		localStorageServiceProvider.setPrefix('ww-jobs');
		localStorageServiceProvider.setStorageType('sessionStorage');
		localStorageServiceProvider.setDefaultToCookie(false);
	}
})(); 