import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-iniscreen',
  templateUrl: './iniscreen.page.html',
  styleUrls: ['./iniscreen.page.scss'],
})
export class IniscreenPage implements OnInit {

  constructor(
    private router: Router,
    private menu: MenuController
  ) {
    this.menu.enable(false, 'custom');
    console.log(localStorage.getItem('client'));
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

  signup() {
    this.router.navigate(['register']);
  }

  skip() {
    this.router.navigate(['select-location']);
  }

}
