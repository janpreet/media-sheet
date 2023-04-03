# media-sheet

## How to use-
1. Get your API Key from [OMDB](https://www.omdbapi.com/apikey.aspx).
2. Add the key to the [code](https://github.com/janpreet/media-sheet/blob/main/main.gs#L2).
3. Start a new Google spreadsheet.
4. Go to Apps Script and add files from this repository to your project.
5. The script is designed to populate the results in pre-set columns, so please make sure that you've added a header row before running the script. You can re-arrange or even change the fileds in the [code here](https://github.com/janpreet/media-sheet/blob/main/main.gs#L5).
6. The trigger is adding a movie title in the 1st column, row 2 onwards, in case wrong movie is retrieved, you can edit the year in column 2, in case that also does not work, you can add `imdbid=tt0347304` to fetch results using IMDB title id.
7. The script automatically sorts and sets first column of last row as active for your input.

---

You can call the custom function by the function name. For example, the custom function in this repo can be called as `=customCall(A3,B3)` where A3= title of a movie and B3= year, and the result would be the country of movie. This is just an example, you can generate any response from any combination of passable arguments. The use-case is a one-time API call in case you need to modify or add a new field.

---

## To do-
1. Add on-open remove duplicates.