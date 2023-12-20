import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userEmail!: string;
  isLoggedIn$!: Observable<boolean>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService) {
    if (isPlatformBrowser(this.platformId)) {
      // Code inside this block will only run in the browser
      this.userEmail = localStorage.getItem('user') || '';
    }
   this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
  }
  onLogOut(){
    this.authService.logout();
  }

}
