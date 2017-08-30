# waiter_webapp

![Alt text](https://github.com/JunaidGool/waiter_webapp/blob/master/readme_images/waiter_home.GIF)

### A Waiter App that :
* Enables a waiter and an administrator to login and view different screens.
* Enables waiters to select the days that they are available to work on.
* Waiters are able to update the days they have chosen to work.
* The administrator is able to see how many waiters are available to work for the week.

### Getting Started
* Clone, download or fork this respository https://github.com/JunaidGool/waiter_webapp to your machine from GitHub.

### Prerequisites 
* node.js for your operating system requirements, this application was developed using version 6.10.2</br>
* MongoDB.<br/>
* RoboMongo (optional).<br/>
* Postman (optional).

### Installing
1. Access the package.json file, this file contains all the required dependencies to be installed.
   Below is what the package.json file will look like.
```javascript
   {
  "name": "waiter_webapp",
  "version": "1.0.0",
  "description": "waiter app",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "engines": {
    "node": "6.10.2"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.17.2",
    "express": "^4.15.3",
    "express-flash": "git://github.com/RGBboy/express-flash.git",
    "express-handlebars": "^3.0.0",
    "express-session": "^1.15.3",
    "method-override": "^2.3.9",
    "mongoose": "^4.9.10"
  }
}
```

2. In the command line, navigate to the project working folder.
3. Input 
```javascript
npm install --save 
```
in the command line. This will install all the required dependencies.<br/>
   
### Starting the APP
1. Open mongoDB and get your server started.<br/>
2. In the command line, navigate to the project working folder.Once you are in the appropriate folder
   input this command
   
   ```javascript 
   nodemon 
   ```
   You should now see the following message displayed<br/>
   ```javascript 
    "Now listening to Port Number: 9001"
    ```
    The Api is now succesfully running !! <br/>
    You are now able to add, view and update stock using postman and have the option to view your data within your database using Robomongo.
    
### Understanding the Routes

HTTP Method | Route Name | Description
------------ | ------------- | ---------
GET | /waiters/:username	 	  | Show waiters a screen where they can select the days they can work on.
POST | /waiters/:username		 	  | Send the days a waiter can work to the server.
GET | /days 	  | Show the administrator which days waiters can work.

### Navigating the APP
1. In the navigation bar, please enter 
   ```javascript 
   http://localhost:9001
   ```
   You will immediately be re-directed to 
   ```javascript 
   http://localhost:9001/home
   ```
   ![Alt text](https://github.com/JunaidGool/waiter_webapp/blob/master/readme_images/waiter_home.GIF)
   
   This is the home page. It gives you a brief descripion on what is required when inputting the login details.<br/>
   To enter the administrators page, input "90". All waiter id's must start with the digits "10". <br/>
   Click the Sign In button.
   
2. Once you have clicked on the Sign In button, you will be redirected to the login page. The administrator or the waiter will enter their login details to view their related pages and perform their required tasks.<br/>

![Alt text](https://github.com/JunaidGool/waiter_webapp/blob/master/readme_images/login.GIF)

3. To view existing employee login id's click "View Employees". To access the administration page, input "90"

#### Administrator Section
1. The adminstrator section will give you 4 options "New Account", "View Employees", "View Work Schedule" and "Log Off"<br/>
   **Log Off** will redirect back to the homepage.<br/>
   **New Account** will redirect to a create new employee page, please note that all new employees ID will start with "10"
   **View Employees** will display a table with all the existing waiters available and their details.
   **View Work Schedule** will display all the waiters availabilty and notify the administrator if certain days are overbooked, sufficient or insufficient.










