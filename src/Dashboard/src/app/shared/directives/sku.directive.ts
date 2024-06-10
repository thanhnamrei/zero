// import { Injectable } from "@angular/core";
// import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
// import { Observable, catchError, of, map } from "rxjs";

// interface ABCService {
//     isSkuTaken: (sku: string) => Observable<boolean>
// }

// @Injectable({providedIn: 'root'})
// export class UniSkuValidator implements AsyncValidator {
//     constructor(private abcService: ABCService) {}

//     validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
//         return this.abcService.isSkuTaken(control.value).pipe(
//             map((isTaken) => isTaken ? {uniqueSku: true} : null),
//             catchError(() => of(null)))    
//     }
//     registerOnValidatorChange?(fn: () => void): void {
//         throw new Error("Method not implemented.");
//     }

// }