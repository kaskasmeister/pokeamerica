import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { PokeServeService } from "../services/pokeserver.service";
import { LoadScreenService } from "../services/loads-screen.service";

@Component({
  selector: "app-form-pokemon",
  templateUrl: "./app-form-pokemon.component.html"
})
export class FormPokemonComponent {
  title = 'pokeamerica';
  minDate!: Date;
  maxDate!: Date;
  selected!: any;
  image: any | undefined;
  esMayorDeEdad = false;

  name: string | null = "Imágen perfil";

  profileForm = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    pasatiempos: new FormControl(""),
    cumpleannos: new FormControl("", [Validators.required]),
    dui: new FormControl(""),
  });

  constructor(
    private api: PokeServeService,
    private loadScreenService: LoadScreenService,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  mask = {
    guide: true,
    showMask: true,
    // keepCharPositions : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  select(event: any) {
    console.log(event.target.files[0]);

    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
    };
  }

  async onSubmit(form: any) {
    if (this.profileForm.valid && this.image) {
      this.loadScreenService.show();
      setTimeout(() => {
        this.loadScreenService.hide();
      }, 8000);

      this.name = this.profileForm.controls.nombre.value;
      const resp = await this.api.getDataPromise("https://pokeapi.co/api/v2/pokemon");
      const list: { name: string, url: string, spriteUrl?: string }[] = resp.results;

      for (let item of list) {
        const respPkm = await this.api.getPokemon(item.name);
        console.log(item.name, respPkm.sprites.front_shiny, respPkm.types)
      }
    } else {
      alert("Seleccione una imágen")
    }

  }

  verificarFechaNacimiento(event: MatDatepickerInputEvent<Date, string>) {
    const dob = event.value?.getTime();

    if (dob) {
      const diff = Date.now() - dob;
      const ageDate = new Date(diff);
      const year = ageDate.getUTCFullYear();
      const age = Math.abs(year - 1970);
      setTimeout(() => {
        this.esMayorDeEdad = age > 18;
        console.log(this.esMayorDeEdad)
        if (this.esMayorDeEdad) {
          this.profileForm.controls.dui.setValidators([Validators.required]);
          this.profileForm.controls.dui.updateValueAndValidity();
        }
      }, 550);
    }
    this.esMayorDeEdad = false;
  }
}
