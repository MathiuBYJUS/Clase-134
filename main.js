img="";
object=[];
status="";
function preload()
{
    
}

function setup()
{
    myCanvas=createCanvas(400,400);
    myCanvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML="Se esta detectando el objeto";    
}

function modelLoaded()
{console.log("tu modelo ya inisializo");
status=true
}

function gotResult(error,result)
{
if(error)
{
    console.log("error");

}
else
{
console.log(result);
object=result;

}
}

function draw()
{
    image(video ,1,0,400,400);
    if(status!="")
    {
        objectDetector.detect(video,gotResult);
        for(var i=0;i<object.length;i++)
        {
            document.getElementById("status").innerHTML="ya se detectaron los objetos";
            document.getElementById("objetos_detectados").innerHTML="el numero de objetos detectados es: "+object.length;
            fill ("red");
            percent = floor(object[i].confidence * 100); 
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15); 
            noFill();
            stroke("red");
            rect(object[i].x,
                object[i].y,object[i].height,object[i].width
            );
            
        }
    }
}