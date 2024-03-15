import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LoadScreenComponent } from './load-screen/load-screen.component';
import { LoadScreenService } from './services/loads-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild("loadScreen")
  loadScreen!: LoadScreenComponent;

  constructor(private loadScreenService: LoadScreenService) {

  }

  ngAfterViewInit(): void {
    this.loadScreenService.init(this.loadScreen);
  }


}
