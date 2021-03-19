import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthComponent } from './pages/month/month.component';
import { DayComponent } from './pages/month/day/day.component';
import { appReducers } from './app.reducer';
import { environment } from 'src/environments/environment';
import { SchedulersComponent } from './pages/schedulers/schedulers.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    DayComponent,
    SchedulersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
