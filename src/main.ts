import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {provideRouter, withRouterConfig} from "@angular/router";
import {routes} from "./app/app.routes";

bootstrapApplication(AppComponent,{
  providers:[provideHttpClient(),provideRouter(routes)]
}).catch((err) => console.error(err));
