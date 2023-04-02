function ChangeValue(row,col,sheet) {
  var apikey=""; //Add your OMDB APIkey here.
  var cellRange = sheet.getRange(row,col);
  var movieName = sheet.getRange(row,col).getValue();
  var fields = ["Title", "Year", "Actors", "Plot", "Poster", "imdbRating", "Runtime", "Genre", "Language", "Country", "imdbID"]
  if(checkEmpty(movieName) == "notempty")
  {
    if(movieName.startsWith("imdbid")) {
      var imdbid = movieName.split("=")[1];
      var url = 'https://www.omdbapi.com/?i='+imdbid+'&apikey='+apikey;
    }
    else {
      var inYear = sheet.getRange(row,2).getValue();
      if(checkEmpty(inYear) == "notempty"){
        var url = 'https://www.omdbapi.com/?t='+movieName+'&y='+inYear+'&apikey='+apikey;
      } 
      else {
      var url = 'https://www.omdbapi.com/?t='+movieName+'&apikey='+apikey;
      }
    }
    var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
    jsonDump = JSON.parse(response);
    if(jsonDump.Response == "True")
    {
      for (var key in jsonDump){
        if(fields.indexOf(key) > -1) {
          offsetValue = Number(fields.indexOf(key));
          if (checkEmpty(jsonDump[key]) == "notempty") {
            switch(key) {
              case "Poster":
                let image = SpreadsheetApp.newCellImage().setSourceUrl(jsonDump[key]).build();
                writeCell(cellRange,offsetValue,image);
                break;
              case "Runtime":
              var runtime = Number(jsonDump[key].split(" ")[0]);
                writeCell(cellRange,offsetValue,runtime);
                break;
              case "imdbRating":
                if (checkEmpty(jsonDump["imdbID"]) == "notempty") {
                  var url="https://www.imdb.com/title/"+jsonDump["imdbID"]+"/";
                  writeCell(cellRange,offsetValue,'=HYPERLINK("'+url+'", "'+jsonDump[key]+'")');
                }
                else {
                  writeCell(cellRange,offsetValue,"N/A")
                }
                break;
              case "imdbID":
                break;
              default:
                writeCell(cellRange,offsetValue,jsonDump[key]);
            }
          }
          else {
            writeCell(cellRange,offsetValue,"N/A")
          }
        }
      }
    }
    else {
      Logger.log("Movie not found!")
    }
  }
  else {
    Logger.log("No moviename, exiting!")
  }
}

function atEdit(e) {
  const range = e.range;
  const sheet=e.source.getActiveSheet();
  const activeSheet = sheet.getName();
  const conditions = [
    activeSheet === 'Movies',
    range.getRow() >= 2,
    range.getRow() <= 1000,
    range.getColumn() == 1 || range.getColumn() == 2
  ]
  Logger.log(e.value);
  if (conditions.every(c => c === true)) ChangeValue(range.getRow(),1,sheet)
}

function checkEmpty(a) {
let result; 
if(a == "" || a == "N/A" || a === null) {
  result = "empty";
  } 
else {
  result = "notempty";
}
return result;
}

function writeCell(a,b,c) {
  a.offset(0,b).setValue(c);
}

function openSort() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    sheet.getSheetByName('Movies')
    var columnToSortBy = 1;
    var tableRange = "A2:G";
    var range = sheet.getRange(tableRange);
    range.sort({
        column: columnToSortBy,
        ascending: true
    });
    openJump();
}

function openJump() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    sheet.getSheetByName('Movies')
    var columnToSortBy = 1;
    var tableRange = "A2:G";
    var range = sheet.getRange(tableRange);
    sheet.setActiveCell(sheet.getDataRange().offset(sheet.getLastRow(), 0));
}
