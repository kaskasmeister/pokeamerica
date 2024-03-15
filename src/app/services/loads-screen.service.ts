import { Injectable } from "@angular/core";
import { LoadScreenComponent } from "../load-screen/load-screen.component";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoadScreenService {
    private _loadScreenComponent!: LoadScreenComponent

    private requireLoadScreen = new Subject<boolean>();
    
    requireScreen$ = this.requireLoadScreen.asObservable();

    init (loadScreenComponent: LoadScreenComponent) {
        this._loadScreenComponent = loadScreenComponent;
    }

    show() {
        this.requireLoadScreen.next(true)
    }

    hide() {
        this.requireLoadScreen.next(false)
    }
}