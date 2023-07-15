# LighthouseBnB
LighthouseBnB is a simple, multi-page AirBnB clone.

This repository is the starter code from lighthouse labs: I forked and cloned the original repository, then built upon it to practice SQL and postgres.

# ERD
![image](https://github.com/williamkemeny/LighthouseBnB/assets/83621324/53bae073-be1c-41a5-be11-e58490a0c100)

## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.

# Migrations
start project by running:
1. CREATE DATABASE lightbnb;
2. \c lightbnb;

Then run schema.sql:
1. \i migrations/01_schema.sql
This creates tables lighting.
2. \i seeds/02_seeds.sql
populate the database

# Run the project
1. In LighBnB_WebApp-master
2. npm i
3. npm run start\
4. Search http://localhost:3000/ in browser

# Dependencies
- Node 5.10.x or above

# Sample Quaries
## [all_reservations_by_user.sql](/1_queries/all_reservations_by_user.sql)
Shows all past reservations for a user; in this case user with users.id = 1.

## [avg_reservation.sql](/1_queries/avg_reservation.sql)
Selects the average duration of all reservations.

## [most_visited_cities.sql](/1_queries/most_visited_cities.sql)
Get a list of the most visited cities.

## [property_listings_by_city.sql](/1_queries/property_listings_by_city.sql)
Show specific details about properties located in Vancouver including their average rating.

## [user_login.sql](/1_queries/user_login.sql)
Get details about a single user.




