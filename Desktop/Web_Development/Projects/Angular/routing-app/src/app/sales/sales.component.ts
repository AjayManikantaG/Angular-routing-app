import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  sales = [];
  salesCopy = [];

  constructor(private service: HttpService) {}

  ngOnInit(): void {
    this.service.getSales().subscribe((data) => {
      const length = data.length;
      this.sales = data.splice(length - 10, length + 1);
      this.salesCopy = this.sales;
    });
  }
}
