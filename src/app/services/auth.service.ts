import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {signInWithEmailAndPassword} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private auth: Auth, private router: Router) {  
   }

   loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   isLoggedInGuard: boolean = false;
  login(email:any, password: any){
    signInWithEmailAndPassword(this.auth,email, password).then(ref=>{
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGuard=true;
      this.router.navigate(['/']);
    }
      
      ).catch((err)=>{
        alert("Invalid user credentials");
      });
  }
  loadUser(){
    localStorage.setItem('user', this.auth.currentUser?.email || '');
  }

  logout(){
    this.auth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard=false;
      this.router.navigate(['/login']);
    })
  }
  isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  }

