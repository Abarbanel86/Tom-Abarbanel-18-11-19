// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  altApiKey: "?=apikey= sad yEFH0VE6q2jlgmHwhI6CxBV2wsnZynId",
  apiKey: "?apikey=xCvVsQkb9qGAGmGkfoONNr3mCK34Gllq",
  autoCompleteURL: "https://dataservice.accuweather.com/locations/v1/cities/autocomplete",
  locationKeyURL: "https://dataservice.accuweather.com/locations/v1/",
  fiveDaysURL: "https://dataservice.accuweather.com/forecasts/v1/daily/5day/",
  geoPostionSearchURl: "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
  geoLocationURL: "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
  language: "&language=en-us",
  searchDetails: '&details=false',
  searchTopLevel: '&toplevel=false',
  autoSearchTrashHold: 2,
  numberOfSuggestions: 3,
  numberOfDays: 5
};
 
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
