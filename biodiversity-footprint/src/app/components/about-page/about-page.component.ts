import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  email = "";
  message = "";
  constructor() { }

  ngOnInit() {
  }

  //send an email to address matching email with message matching message
  sendEmail(){
    // let data = {
    //   "email": this.email,
    //   "message": this.message
    // }
    // console.log(data);
    // $.ajax({
    //   type: "POST",
    //   url: "/api/email",
    //   data: data
    // }).done(function(data){
    //   console.log(data);
    //   alert("email sent successfully")
    // });
  }

}
