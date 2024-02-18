import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyComponent } from './components/company/company.component';
import { StoresComponent } from './components/stores/stores.component';
import { PricesComponent } from './components/prices/prices.component';
import { ContactComponent } from './components/contact/contact.component';
// Firebase services + environment module
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthService } from './shared/services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AutosizeModule } from 'ngx-autosize';
import { PricesDetailsComponent } from './components/prices-details/prices-details.component';
import { HintsComponent } from './components/hints/hints.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorsInterceptor } from './shared/services/interceptor/cors.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CompanyComponent,
    StoresComponent,
    PricesComponent,
    ContactComponent,
    SignInComponent,
    ForgotPasswordComponent,
    PricesDetailsComponent,
    HintsComponent,
  ],
  imports: [
    AutosizeModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFirestoreModule,
  ],
  providers: [AuthService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
