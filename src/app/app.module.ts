import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ThemeBtnComponent} from './theme-btn/theme-btn.component';
import {HttpClientModule} from "@angular/common/http";
import { CalculatorComponent } from './calculator/calculator.component';

@NgModule({
    declarations: [
        AppComponent,
        ThemeBtnComponent,
        CalculatorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
