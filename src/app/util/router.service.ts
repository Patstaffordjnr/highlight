import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class RouterService {


  constructor(protected router: Router) {

  }

  toLoginPage() {
    this.router.navigate(['/login']);
  }

}

