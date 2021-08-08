import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-listing',
  templateUrl: './orders-listing.page.html',
  styleUrls: ['./orders-listing.page.scss'],
})
export class OrdersListingPage implements OnInit {
  private ordersList: any = [];
  constructor() {
    this.ordersList = [
      { date_added: '20 June 2020', order_id: '1010', status: 'Pending', color: 'tertiary', total: '$99' },
      { date_added: '14 April 2020', order_id: '1009', status: 'Cancelled', color: 'danger', total: '$75' },
      { date_added: '18 March 2020', order_id: '1008', status: 'Delivered', color: 'success', total: '$99' },
      { date_added: '08 January 2020', order_id: '1006', status: 'Delivered', color: 'success', total: '$90' },
    ];
  }

  ngOnInit() {
  }

}
