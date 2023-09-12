import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FirstSignalComponent } from "./pages/first-signal/first-page.component";
import { SecondSignalComponent } from "./pages/second-signal/second-signal.component";
import { ThirdSignalComponent } from "./pages/third-signal/third-signal.component";
import { FirstProjectionComponent } from "./pages/first-projection/first-projection.component";
import { SecondProjectionComponent } from "./pages/second-projection/second-projection.component";
import { ThirdProjectionComponent } from "./pages/third-projection/third-projection.component";

const routes: Routes = [
    { path: '', redirectTo: '1', pathMatch: 'full' },
    { path: '1', component: FirstSignalComponent },
    { path: '2', component: SecondSignalComponent },
    { path: '3', component: ThirdSignalComponent },
    { path: '4', component: FirstProjectionComponent },
    { path: '5', component: SecondProjectionComponent },
    { path: '6', component: ThirdProjectionComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }