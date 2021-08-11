import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { regexValidators } from '../../services/validator.service';
import {  MenuController } from '@ionic/angular';
import {ApiProvider} from '../../providers/api/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private signupForm: FormGroup;
  private villes: any = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiProvider,
    private menu: MenuController
  ) {
    this.menu.enable(false, 'custom');
    this.getVilles();

    this.signupForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.name)
      ])
      ),
      last_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.name)
      ])
      ),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.phone)
      ])
      ),
      location: new FormControl('', Validators.compose([
        Validators.required
      ])
      ),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.email)
      ])
      ),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.password)
      ])
      ),

      confirm_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(regexValidators.password)
      ])
      )
    });
  }

  ngOnInit() {
  }

  getVilles() {
    this.api.Villes.getList({should_paginate: false, _sort: 'nom', _sortDir: 'asc'}).subscribe((result: any) => {
      this.villes = result;
    });
  }

  async register() {
    console.log(this.signupForm);

  }

}
