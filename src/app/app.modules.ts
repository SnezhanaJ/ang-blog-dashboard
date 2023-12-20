import { NgModule, importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "../environments/environment.prod";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { provideFirebaseApp, getApp, initializeApp} from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { CategoriesService } from "./services/categories.service";
import { RouterModule } from "@angular/router";
import { AllPostComponent } from "./posts/all-post/all-post.component";
import { NewPostComponent } from "./posts/new-post/new-post.component";
import { routes } from "./app.routes";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { provideStorage, getStorage } from '@angular/fire/storage';
import { PostsService } from "./services/posts.service";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { AuthService } from "./services/auth.service";
import { LoginComponent } from "./auth/login/login.component";
@NgModule({
    imports: [
        BrowserModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        provideStorage(()=>getStorage(initializeApp(environment.firebaseConfig))),
       // provideAuth(()=>getAuth(initializeApp(environment.firebaseConfig))),
        provideAuth(()=>getAuth()),
        //AngularFireAuthModule,
        FormsModule,
        RouterModule,
        AppComponent,
        AllPostComponent,
        NewPostComponent,
        AngularEditorModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularFireStorageModule,
        RouterModule.forRoot(routes),
        LoginComponent
    ],
    providers: [
        CategoriesService,
        PostsService,
        AuthService,
        ]
})
export class AppModule{
}