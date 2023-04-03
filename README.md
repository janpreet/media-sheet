# media-sheet

## How to use-
1. Get your API Key from [OMDB](https://www.omdbapi.com/apikey.aspx).
2. Add the key to the [code](https://github.com/janpreet/media-sheet/blob/main/main.gs#L2).
3. Start a new Google spreadsheet.
4. Go to Apps Script and add files from this repository to your project.
5. The script is designed to populate the results in these columns, so please make sure that you've added a header row before running the script. You can re-arrange or even change the fileds in the [code here](https://github.com/janpreet/media-sheet/blob/main/main.gs#L5).
---
You can call the custom function by the function name. For example, the custom function in this repo can be called as `=customCall(A3,B3)` where A3= title of a movie and B3= year, and the result would be the country of movie. This is just an example, you can generate any response from any combination of passable arguments. The use-case is a one-time API call in case you need to modify or add a new field.