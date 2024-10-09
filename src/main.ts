import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {HttpClient, provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideRouter, withRouterConfig} from "@angular/router";
import {routes} from "./app/app.routes";
import {LoggingInterceptor} from "./app/consts";

bootstrapApplication(AppComponent,{
  providers:[provideHttpClient(withInterceptors([LoggingInterceptor])),provideRouter(routes)]
}).catch((err) => console.error(err));
