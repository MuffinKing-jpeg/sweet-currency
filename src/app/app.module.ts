import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ThemeBtnComponent} from './theme-btn/theme-btn.component';
import {HttpClientModule} from "@angular/common/http";
import {CalculatorWrapperComponent} from './calculator-wrapper/calculator-wrapper.component';
import {CalculatorNavComponent} from './calculator-wrapper/calculator-nav/calculator-nav.component';
import {BriefComponent} from './calculator-wrapper/brief/brief.component';
import {CalculatorComponent} from "./calculator-wrapper/calculator/calculator.component";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        ThemeBtnComponent,
        CalculatorWrapperComponent,
        CalculatorNavComponent,
        CalculatorComponent,
        BriefComponent,
        NotFoundComponent,
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
