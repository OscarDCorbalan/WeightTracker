#Data input doesn't work on Internet Explorer!
Because it doesn't accept date type on forms. It's a pending work.

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
* ~~Story 1: User wants to delete weights.~~
* ~~Story 2: User wants to add a new weight.~~
* ~~Story 3: User wants to register an account.~~
* Story 4: User wants to use a password for its account.  
* Story 5: User wants to edit data because delete+create su*ks.
* ~~Story 6: User wants the highest weight row in red, and the lowest in green.~~
* ~~Story 7: User wants a graphic with the weights.~~

##Behind the scenes
* Improvement 1: Make gulp watch source files changes and auto-build in response.
* Improvement 2: (requirement for Story 3, multi-user app):
  * Create a MongoDB table for the users. Just save the username as the id to start with.
  * Check the current user in the REST url and use it in the dataflow.
* Improvement 3: Divide our React's WeightsApp into subcomponents (the main compoenent should retrieve the data and the subcomponents each do their render):
  * Table (can be further subdivided).
  * Graph.
  * ~~Form.~~
* Improvement 4: Make the date input work in IE.

## Author

[Oscar D.](http://oscardc.com)
