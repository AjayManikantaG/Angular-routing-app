import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-post-dealers',
  templateUrl: './post-dealers.component.html',
  styleUrls: ['./post-dealers.component.css'],
})
export class PostDealersComponent implements OnInit {
  ngOnInit(): void {}

  title = 'tdf';
  districts = ['Chennai', 'Tirupathi', 'Madhurai', 'California'];
  userModel = new User( 0 , '', '', '');

  log(event) {
    console.log(event)
  }
}
