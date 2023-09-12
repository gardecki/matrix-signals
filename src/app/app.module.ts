import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FirstSignalComponent } from './pages/first-signal/first-page.component';
import { SecondSignalComponent } from './pages/second-signal/second-signal.component';
import { ThirdSignalComponent } from './pages/third-signal/third-signal.component';
import { FirstProjectionComponent } from './pages/first-projection/first-projection.component';
import { SecondProjectionComponent } from './pages/second-projection/second-projection.component';
import { ThirdProjectionComponent } from './pages/third-projection/third-projection.component';
import { SelectorComponent } from './components/selector/selector.component';
import { ViewportComponent } from './components/viewport/viewport.component';
import { PathPipe } from './components/pipes/path.pipe';
import { TranslatePipe } from './components/pipes/translate.pipe';
import { BorderPipe } from './components/pipes/border.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FirstSignalComponent,
    SecondSignalComponent,
    ThirdSignalComponent,
    FirstProjectionComponent,
    SecondProjectionComponent,
    ThirdProjectionComponent,
    SelectorComponent,
    ViewportComponent,
    PathPipe,
    TranslatePipe,
    BorderPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
