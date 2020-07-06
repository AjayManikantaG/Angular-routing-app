import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sales',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.css'],
})
export class DealersComponent implements OnInit {
  dealers = [];
  foundDealer = [];
  dealerCopy = [];
  dealersExists: boolean = false;

  constructor(private service: HttpService) {}

  ngOnInit(): void {
    this.service.getDealers().subscribe((data) => {
      this.dealers = [...data];
      this.dealerCopy = [...data];
    }); 
  }

  changeDealers(event) {
    const value = event.target.value;
    this.dealers = [...this.dealerCopy];
    this.dealersExists = false;
    if (value !== '') {
      this.foundDealer = this.dealers.find((data) => {
        return data.dealer == value;
      });
      this.dealers = [];

      if (this.foundDealer !== undefined) {
        this.dealers.push(this.foundDealer);
        this.dealersExists = false;
      } else {
        this.dealersExists = true;
      }
    }
  }
}
