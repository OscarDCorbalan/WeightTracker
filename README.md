#How to run
* Get a local/free Mongo database
* Clone the project.
* Configure the DB on index.js
* Run: npm install
* Run: npm start

#Developing
Just ensure you've got global gulp installed.
After changes, run 'gulp build' and then npm start.

#TODO
##User stories
* Story 1: User wants to delete weights.
  * Possibility 1: Click 'delete row' icon -> the weight entry gets deleted
* Story 2: User wants to add a new weight Refactored
  * Poss. 1: Click 'new entry' icon/button ->
    * Poss. 1.1: show a modal form -> entry data -> click add button
    * Poss. 1.2: show an editable row in the top/bottom of the table -> entry data -> click save icon
* Story 3: User wants to register an account.
  * Poss. 1: click register -> (input name <-> check in real time if user exists) -> click create
* Story 4: User wants to use a password for its account.  
* Story 5: User wants to edit data because delete+create su*ks.
* ~~Story 6: User wants the highest weight row in red, and the lowest in green.~~
* ~~Story 7: User wants a graphic with the weights.~~

##Behind the scenes
* Improvement 1: Make gulp watch source files changes and auto-build in response.
* Improvement 2: (requirement for Story 3, multi-user app):
  * Create a MongoDB table for the users. Just save the username as the id to start with.
  * Check the current user in the REST url and use it in the dataflow.
* Improvement 3: Divide our React's WeightsApp into two subcomponents, the table and the graph. The main compoenent should retrieve the data and the subcomponents each render their html.
