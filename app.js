//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(request, response){
    const fName = request.body.floatingFirstName;
    const lName = request.body.floatingLastName;
    const email = request.body.floatingEmail;
    
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
             merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/999813cd18";
    const options = {
        method: "POST",
        auth: "ritwik:d3e8015f78089824f31bdfd1ddd3496b-us5"
    }
    const req = https.request(url, options, function(res){

        if(res.statusCode === 200){
            response.sendFile(__dirname+"/success.html");
        }else{
            response.sendFile(__dirname+"/failure.html")
        }
        res.on("data", function(data){
        });
    });

    req.write(jsonData);
    req.end();
    
});
    app.listen(process.env.PORT || 3000, function(){
        console.log("Listening on some random port");  
    });