import { NgModule } from "@angular/core";
import { HomePage } from "./home";
import { IonicPageModule, IonicPage } from "ionic-angular";

@IonicPage()
@NgModule({
    declarations : [HomePage],
    imports : [IonicPageModule.forChild(HomePage)]
})

export class HomeModule{

}

