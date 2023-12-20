import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  errorMessage!: string;

  ngOnInit(): void {
  }
  
  constructor(private authService: AuthService, private router: Router){
    
  }
  
  onSubmit(loginForm:any){
    this.authService.login(loginForm.email, loginForm.password);
  }

}
