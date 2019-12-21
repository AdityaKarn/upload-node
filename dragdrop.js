const express = require("express");
const upload = require("express-fileupload");
const path = require("path");

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded( { extended: false } )); // this is to handle URL encoded data
app.use(upload());



// enable static files pointing to the folder "public"
app.use(express.static(path.join(__dirname, "public")));



// HTTP POST
// upload image files to server
app.post("/upload", function(request, response) {
    var images = new Array();
    if(request.files) {
        var arr;
        if(Array.isArray(request.files.filesfld)) {
            arr = request.files.filesfld;
        }
        else {
            arr = new Array(1);
            arr[0] = request.files.filesfld;
        }
        for(var i = 0; i < arr.length; i++) {
            var file = arr[i];
            if(file.mimetype.substring(0,5).toLowerCase() == "image") {
                images[i] = "/" + file.name;
                file.mv("./public" + images[i], function (err) {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        }
    }
    // give the server a second to write the files
    setTimeout(function(){response.json(images);}, 1000);
});

// set port from environment variable, or 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

