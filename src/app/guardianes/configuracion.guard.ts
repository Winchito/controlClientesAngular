import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { ConfiguracionServicio } from "../servicios/configuracion.services";

@Injectable()
export class ConfiguracionGuard implements CanActivate{

    constructor(private router: Router,
        private configuracionServicio: ConfiguracionServicio){}



        canActivate(): Observable<boolean>{
            return this.configuracionServicio.getConfiguracion().pipe(
                map( configuracion => {
                    if(configuracion.permitirRegistro){
                        return true;
                    }else{
                        this.router.navigate(['/login'])
                        return false;
                    }
                })
            );
    
        }
}


