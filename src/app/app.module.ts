import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { IConfig, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { FormPokemonComponent } from './form-pokemon/app-form-pokemon.component';
import { PokeServeService } from './services/pokeserver.service';
import { HttpClientModule } from "@angular/common/http";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    FormPokemonComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule
  ],
  exports: [

  ],
  providers: [
    provideEnvironmentNgxMask(maskConfig),
    { provide: MAT_DATE_LOCALE, useValue: "es-ES" },
    PokeServeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
