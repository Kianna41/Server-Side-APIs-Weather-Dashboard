# Server-Side-APIs-Weather-Dashboard

Goals of the assignment:

1. Have a dashboard with a form inputs to search a city.
2. When the city is searched, the current and future conditions are added to that search history.
3. When a city is searched, the city name, date, an icon for the representation of the weather conditions, temperature, the humidity, wind speed, and the UV index is shown.
4. The UV index changes colors based upon whether the conditions are favorable, moderate, or severe.
5. When a city is searched, a 5-day forecast displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
6. When a city is clicked on in the search history, the current and future conditions are presented again.

This was accomplished by:

1. Creating a card as a dashbord with form inputs as well as a search button.
2. Placing the city's name and current and future conditions into localStorage so that can appear in the search history.
3. Creating an if statement for the UV index so that based upon the conditions, the assigned color will display.
4. Creating a function for the 5-day forecast where I fetch the daily weather API and dynamically created an unordered list and placed each condition in the HTML through JS.

Mock-up:




https://user-images.githubusercontent.com/107634328/186958342-d6df043b-6a60-45b1-89f6-c0a9d01176db.mov

