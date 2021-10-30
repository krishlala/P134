img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function preload() {
    img = loadImage('dog_cat.jpg');
    alarm = loadSound("alarm_in_camp.mp3");
}

function modelLoaded() {
    console.log("ModelLoaded! is intialized");
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if(status != "") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for (i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_obj").innerHTML = "Number of objects detected: " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y +15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        }

    
            if(objects.length == 0) {
                alarm.play();
            } else {
                alarm.stop();

            }
        

        

}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

