
 # Atlan Task
In this project, We have use jwt-authentication to authorise users while uploading files and store jwttokens in MongoDB.

Fireup these routes in postman after running index.js file.

API Routes :

**SignUp Route:** &nbsp;&nbsp; POST   &nbsp;localhost:3000/auth/signup
Body (JSON format):

{
&nbsp;&nbsp;	"email" : "yarsh.vishnoi01@gmail.com",
&nbsp;&nbsp;	"password" : "yarsh@123"
}

This will generate token and update the user model in MongoDB. Now user can signIn using the token.

**SignIn Route:** &nbsp;&nbsp; POST   &nbsp;localhost:3000/auth/signin
Authorization token :

Select Bearer Token and add token. Send the request and this will allow user to SignIn.

**UploadFile Route**
POST   &nbsp; localhost:3000/upload

Body (Form data)
Select file and update key value pair. Run the Route and thid will upload file in uploads folder under Routes Directory.

POST   &nbsp; localhost:3000/upload/terminate
Running this route in between of the file upload will call abort function which will abort the file upload.

**DockerFile**
It contains all the the required things to build an image including nodejs module and few RUN commands.
