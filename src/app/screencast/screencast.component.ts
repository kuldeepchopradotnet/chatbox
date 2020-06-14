import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-screencast',
  templateUrl: './screencast.component.html',
  styleUrls: ['./screencast.component.css']
})
export class ScreencastComponent implements OnInit {
  
  img ='abc.png';
  constructor() { 
    


  }

  ngOnInit() {
    let self = this;

    let socket = io('http://192.168.1.102:3000');

    socket.on('connect', function () {
      console.log('connect');
    });

    socket.on('disconnect', function () {
      console.log('disconnect');
    });


   // socket.emit('create', 'scast')

    socket.on('stream', function (data) {
      self.img = "data:image/png;base64,"+ data;
    })
  }

}
