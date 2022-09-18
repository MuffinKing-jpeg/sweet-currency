import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BriefComponent} from "./calculator-wrapper/brief/brief.component";
import {CalculatorComponent} from "./calculator-wrapper/calculator/calculator.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
    {path: 'home', component: BriefComponent},
    {path: 'calculator', component: CalculatorComponent},
    {path: 'calculator/:bank', component: CalculatorComponent},


    //Default route
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    //404 route
    {path: '404', component: NotFoundComponent},
    {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
