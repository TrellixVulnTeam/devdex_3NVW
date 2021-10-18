import { ScrollService } from 'src/app/core/services/scroll.service';
import { StarredService } from './core/services/starred.service';
import { VoicesService } from 'src/app/core/services/voices.service';
import { ReposService } from './core/services/repos.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'devdex';
  myForm: FormGroup = new FormGroup({
    user: new FormControl(),
  });

  constructor(
    public userService: UserService,
    private router: Router,
    private reposService: ReposService,
    private voicesService: VoicesService,
    private starredService: StarredService,
    private scrollService: ScrollService
  ) { }

  reset()
  {
    this.userService.reset();
    this.reposService.reset();
    this.voicesService.reset();
    this.starredService.reset();
  }

  ngOnInit()
  {
    this.scrollService.onScroll();
  }

  onEnter()
  {
    document.getElementById('user')?.blur();
    if(this.myForm.value.user === this.userService.user.login)
    {
      location.reload();
    }

    else
    {
      this.reset();
      this.router.navigate(['/user', this.myForm.value.user]);
    }
  }
}
