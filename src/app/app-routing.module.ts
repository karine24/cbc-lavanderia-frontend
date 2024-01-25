import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CompanyComponent } from './components/company/company.component';
import { StoresComponent } from './components/stores/stores.component';
import { PricesComponent } from './components/prices/prices.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { secureInnerPageGuard } from './shared/guard/secure-inner-page.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PricesDetailsComponent } from './components/prices-details/prices-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: SignInComponent },
  {path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'company', component: CompanyComponent},
  {path: 'stores', component: StoresComponent},
  {path: 'prices', component: PricesComponent},
  {path: 'prices/details', component: PricesDetailsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'internal', component: HomeComponent, canActivate: [secureInnerPageGuard]},
  {path: 'internal/company', component: CompanyComponent, canActivate: [secureInnerPageGuard]},
  {path: 'internal/stores', component: StoresComponent, canActivate: [secureInnerPageGuard]},
  {path: 'internal/prices', component: PricesComponent, canActivate: [secureInnerPageGuard]},
  {path: 'internal/prices/details', component: PricesDetailsComponent, canActivate: [secureInnerPageGuard]},
  {path: 'internal/contact', component: ContactComponent, canActivate: [secureInnerPageGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
