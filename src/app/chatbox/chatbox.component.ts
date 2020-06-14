import { Component, OnInit } from '@angular/core';
import { sendPayload } from '../send-payload.model';
import io from 'socket.io-client';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  constructor() { }
  
 /**
   * List of Component variables
   */
  title = 'chatbox';
  socket:any = {};
  //room = '';
  //receiver = '';
  rooms = [];
  activeTab = 1;
  chatDb = [];
  //roomName = "";
  activeRoom = "";
  userLSkey="chatBoxUserId";


  sendPayload: sendPayload = {
    sender: '',
    receiver: '',
    date: new Date().toLocaleString(),
    msg: ''
  }

  userEmailID:string = '';



  ngOnInit() {
    let self = this;
    this.socket = self.initSocket();
    let userO = this.getUserLStorage();
    if(userO){
      this.activeTab = 2;
      this.userEmailID = userO;
      this.createRoom(this.userEmailID);
      let rooms = this.getGroupsLs();
      if(rooms){
        this.rooms = rooms;
      }
    }
  }


  /**
   * Tab 1
   * Register user with email/number and create its room
   * @param fData 
   */
  addUser(fData) {
    this.addUserToLocalStorage();
    this.createRoom(fData.name);
    this.activeTab = 2;
  }

  /**
   * Tab 2
   * Show list of rooms and Add Room button to add room by users it must be email id/number
   * @param room 
   */
  addRoom(room) {
    this.addUpdateRooms(this, room.roomName)
  }

  /**
   * Tab3
   * Enter to room to start conversation
   * @param room 
   */
  enterRoom(room) {
    this.activeRoom = room;
    this.activeTab = 3;
  }

  /**
   * Send Message to room
   * @param fData 
   */
  sendMsg(fData) {
    let room = this.activeRoom;
    this.addUpdateRooms(this, room);
    let sendPayload = Object.assign({},this.sendPayload);
    sendPayload.msg = fData.msg;
    sendPayload.receiver = room;
    sendPayload.sender = this.userEmailID;
    if (sendPayload && sendPayload.msg) {
      this.addchatDbAndRoom(this,sendPayload);
      this.sendMsgToServer(sendPayload);
    }
  }

  /**
   * initilize socket and its events
   */

  initSocket() {
    let socket = io('http://localhost:3000');
    this.socketConDiscon(socket);
    this.socketReceiver(socket, this);
    return socket;
  }

  socketConDiscon(socket) {
    socket.on('connect', function () {
      console.log('connect');
    });

    socket.on('disconnect', function () {
      console.log('disconnect');
    });
  }

  socketReceiver(socket, self) {
    socket.on('Sub', function (data) {
      console.log({data});
      self.addchatDbAndRoom(self, data)
    })
  }

  addchatDbAndRoom(self, data) {
    self.chatDb.push(data);
    let room = data.sender;
    self.addUpdateRooms(self, room);
  }

  createRoom(roomName) {
    this.socket.emit('create', roomName)
  }

  sendMsgToServer(data) {
    this.socket.emit('Pub', data)
  }

  addUpdateRooms(self, room) {
    if (!self.rooms.includes(room)) {
      self.rooms.push(room);
      self.saveGroupLs();
    }
  }




  /**
   * Handle storages for conversation and users
   */

  clear() {
    this.chatDb = [];
  }


  addUserToLocalStorage(){
    this.localStorageSet(this.userLSkey,this.userEmailID);
  }


  localStorageSet(key,value){
    localStorage.setItem(key,value);
  }
  localStorageGet(key){
    return localStorage.getItem(key);
  }

  getUserLStorage(){
    return this.localStorageGet(this.userLSkey);
  }

  saveGroupLs(){
    let roomsStr = JSON.stringify(this.rooms);
    this.localStorageSet("myRooms",roomsStr)
  }
  getGroupsLs(){
    let roomStr = this.localStorageGet("myRooms");
    if(roomStr){
      let rooms = JSON.parse(roomStr);
      return rooms;
    }
    return [];
  }

  keepScrollBarBottom(){
    var messageBody = document.querySelector('#msgbody');
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }

  onDomChange($event: Event): void {
    this.keepScrollBarBottom();
  }



}
