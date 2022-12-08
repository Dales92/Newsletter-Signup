//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const express = require('express');
const https = require('https');
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express()
const port = 3000;

app.use(express.urlencoded({ extended: true}));

//The public folder which holds the CSS
app.use(express.static("public"));

//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//Setting up MailChimp
mailchimp.setConfig({
//*****************************ENTER YOUR API KEY HERE******************************
 apiKey: "036d941d6254ee75272cddb03ed417e7-us10",
//*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
 server: "us10"
});

//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
//*****************************ENTER YOU LIST ID HERE******************************
const listId = "dcc279a068";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: lastName,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
"Successfully added contact as an audience member. The contact's id is " +
 response.id);
  console.log(response);
}

//Running the function and catching the errors (if any)
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed.
// In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function(req, res){
  res.redirect("/");
})


//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT || port, () =>
  console.log("server is running on port 3000")
);

// API KEY
// 6c81940e8463128500c986424235acef-us10

// List ID
// dcc279a068
