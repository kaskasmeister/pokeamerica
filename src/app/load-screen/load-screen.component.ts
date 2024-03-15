import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { LoadScreenService } from "../services/loads-screen.service";

@Component({
    selector: "app-load-screen",
    template: ` <div class="loading" *ngIf="show">
                    <div class=" flex flex-col justify-center items-center" >
                        <img src="../../assets/img/pokebola.gif" class="w-[50%]"/>
                        <div>
                            <h1>Cargando perfil...</h1>
                        </div>
                    </div>
                </div>
               `
})
export class LoadScreenComponent implements OnDestroy {

    show = false;
    subscription!: Subscription;

    constructor (private loadScreenService: LoadScreenService) {
        this.subscription = this.loadScreenService.requireScreen$.subscribe((show) => {
            this.show = show
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.show = false;
    }
}