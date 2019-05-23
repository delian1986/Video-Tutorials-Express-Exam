# Video-Tutorials-Express-Exam
![video-tutorials](https://github.com/delian1986/Video-Tutorials-Express-Exam/blob/master/video-tutorials-demo.gif)

# Video Tutorials Express.js exam for JS Web course in SoftUni.bg
"Video Tutorials" is a exam application written on express.js with mongoDB, mongoose and handlebars.js for SoftUni JS Web Course. The idea is inspired by websites like Udemy and Tutorials.bg. The application consists of users, courses and lectures.
Students receive a skeleton with included html and css. They have six hours to write the functionality of the express.js server.

## Used Technologies
  - express.js
  - handlebars.js
  - mongoDB with mongoose
  - material bootstrap

## Key Functionalities
 - Anonymous users have access only to home page.
 - Registered users is able to access the courses and their details. 
 - Registered users can enroll the courses to gain full access on all lectures of the course.
 - Admin can create course, lectures and edit them from the 'Course Control' panel.

## Additional Functionalities
 - Search. Key insensitive.
 - Admin cannot enroll to any course.

## Installation

#### Prerequisites
  
 - npm
 - node.js
 - mongoDB

#### Steps
```sh
git clone https://github.com/delian1986/Video-Tutorials-Express-Exam.git
```
Clone the repo
```sh
npm install
```
Install dependencies
```sh
nodemon start
```
Start the server

## Practice
https://judge.softuni.bg/Contests/1652/ExpressJS-19-April-2019
