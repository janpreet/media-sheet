function customCall(a,b) {
  var apikey=""
  var url = 'https://www.omdbapi.com/?t='+a+'&y='+b+'&apikey='+apikey;
  response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  var result=JSON.parse(response).Country;
  Logger.log(response);
  Logger.log(result);
  return result;
}