import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PokeServeService {

  constructor(private http: HttpClient) { }

  getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  getDataSync(url: string) {
    let finished = false;
    let returnValue = null;
    let error = null;

    this.http.get(url).subscribe({
      next(response) { returnValue = response },
      error(err) { 
        console.error(err);
        error = err;
        finished = true;
      },
      complete() { 
        console.log('Completed'); 
        finished = true;
      }
    });

    while (finished) {
      console.log("wait")
    }
    if(error != null){
      throw error;
    }
    console.log(returnValue)
    return returnValue;
  }

  getDataPromise(url: string): Promise<any> {
    console.log("Consultando")
    return new Promise(
      (resolve) => this.http.get(url).subscribe({
          next(response) { resolve(response) },
          error(err) { console.error(err) },
          complete() { console.info('Completed'); }
        }
      )
    );
  }

  getPokemon(pokemon: string): Promise<any> {
    console.log("Consultando")
    return new Promise(
      (resolve) => this.http.get("https://pokeapi.co/api/v2/pokemon/"+pokemon).subscribe({
          next(response) { resolve(response) },
          error(err) { console.error(err) },
          complete() { console.info('Completed'); }
        }
      )
    );
  }


  receiveData(url: string, callback: any) {
    this.http.get(url).subscribe({
      next(response) { callback(response) },
      error(err) { console.error(err) },
      complete() { console.log('Completed'); }
    });
  }
}