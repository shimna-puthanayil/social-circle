# Social Network API

[![GitHub license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The project helps to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The application is built using Express.js for routing, a MongoDB database and the Mongoose ODM.

## Installation

- Install Node.js v16
- Install MongoDB
- Clone the Repository from GitHub and navigate to the root directory
- Install necessary dependencies running the following command :

  ```
  npm i
  ```

## Usage

The application can be invoked in the terminal by using the following command:

```
npm start
```

When the application is invoked using 'npm start' then the API server will start listening on port 3001 and the routes can be tested in Insomnia.

#### Link to walkthrough video :

https://drive.google.com/file/d/1G-FvFIqWr-vTPKWlEIuiaoI3vNb6Eo3j/view?usp=sharing

#### API Routes

**/api/users/**

- GET all users
- POST a new user

**/api/users/:userId**

- GET a single user by its \_id and populated thought and friend data
- PUT to update a user by its \_id
- DELETE to remove user by its \_id

**/api/users/:userId/friends/:friendId**

- POST to add a new friend to a user's friend list
- DELETE to remove a friend from a user's friend list

**/api/thoughts**

- GET to get all thoughts
- POST to create a new thought

**/api/thoughts/:thoughtId**

- GET to get a single thought by its \_id
- PUT to update a thought by its \_id
- DELETE to remove a thought by its \_id

**/api/thoughts/:thoughtId/reactions**

- POST to create a reaction stored in a single thought's reactions array field

**/api/thoughts/:thoughtId/reactions/:reactionId**

- DELETE to pull and remove a reaction by the reaction's reactionId value

The following images show the application's appearance and functionality :

**GET** route to return all the users and thoughts being tested in Insomnia Core:

![LM 1](./assets/images/getall.gif)

**GET** routes to return a single user and a single thought by its id being tested in Insomnia Core:

![LM 2](./assets/images/getsingle.gif)

**POST**, **PUT**, and **DELETE** routes for user being tested in Insomnia Core:

![LM 3](./assets/images/user.gif)

**POST**, **PUT**, and **DELETE** routes for thought being tested in Insomnia Core:

![LM 4](./assets/images/thought.gif)

**POST** and **DELETE** routes for friends being tested in Insomnia Core:

![LM 5](./assets/images/friend.gif)

**POST** and **DELETE** routes for reactions being tested in Insomnia Core:

![LM 5](./assets/images/reaction.gif)

## Credits

#### References

https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax

https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format

https://mongoosejs.com/docs/populate.html

https://mongoosejs.com/docs/validation.html

## License

[MIT](https://opensource.org/licenses/MIT) license.
