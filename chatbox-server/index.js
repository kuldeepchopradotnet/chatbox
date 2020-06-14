const express = require('express')
const app = express()
var server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');


const recordScreen = require('record-screen')
 
const recording = recordScreen('/tmp/test.mp4', {
  inputFormat: 'mjpeg' // Record an MJPEG stream, defaults to port 9000
})
 
recording.promise
  .then(result => {

    console.log(result);
    // Screen recording is done
   // process.stdout.write(result.stdout)
   // process.stderr.write(result.stderr)
  })
  .catch(error => {
    // Screen recording has failed
    console.error(error)
  })
 
// As an example, stop the screen recording after 5 seconds:
setTimeout(() => recording.stop(), 5000)












// var screen = require('screen-stream')
// var request = require('request')
 
// screen().pipe(request.put('localhost:3000'))


//var screenshot = require('desktop-screenshot');
const screenshot = require('screenshot-desktop')
function screenshot1(){

  return new Promise((res,rej)=>{
    screenshot().then((img) => {
      //console.log("img",img)
  
      var base64Image = img.toString('base64');
      res(base64Image);
      //       new Buffer(img, 'binary').toString('base64');
     // console.log("base64Image",base64Image)
  
      // img: Buffer filled with jpg goodness
      // ...
    }).catch((err) => {
      // ...
    })

  });

// screenshot("nodeScreen.png", function(error, complete) {
//     if(error)
//         console.log("Screenshot failed", error);
//     else{
//       console.log("Screenshot succeeded",complete);
//     }
// })



}







io.on('connection', client => {
  

    client.on('Pub', payload => { 
        //io.emit('Sub',data)
        console.log('Pub',payload)
        io.sockets.in(payload.receiver).emit('Sub', payload);
    });




    client.on('create', function (room) {
      console.log('create',room)
        client.join(room);
      });









    
      // setInterval(async () => {
      //   var img = await screenshot1();
      //   client.emit('stream',img) 
      // }, 50);





  client.on('disconnect', () => {
    console.log('x');
    });


});







app.put('/', async function (req, res) {

  console.log(req);
  //var img = await screenshot1();
   // img = "data:image/png;base64,"+img;

// res.send(`<img src=${img} />`)
  })


  server.listen(9000,x=>{

    console.log("%c port: ","color:red",9000)

})