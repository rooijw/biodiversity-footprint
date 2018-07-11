import { Component } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // templateUrl: './home-page.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  selectNav($event) {

    if (window.innerWidth <= 960) {
      this.expand();
    }
  }

  response($event) {
    var x = $(".nav-bar")[0];
    if (event.target["innerWidth"] <= 960) {
      x.className = "nav-bar responsive";
    } else {
      x.className = "nav-bar";
    }
  }
  expand() {
    if (window.innerWidth <= 960) {
      if ($(".nav-item").hasClass('show')) {
        $('.nav-item').removeClass('show');
      } else {
        $(".nav-item").addClass('show');
      }
    }
  }

  onActivate($event) {
    let path = window.location.href.split("/");
    $(".selected").removeClass('selected');
    $("#"+path[path.length - 1]).addClass('selected');
    
  }
}
