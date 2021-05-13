import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  //when editing we will need to test if the file is a string
  if (typeof control.value === "string") {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener("loadend", () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
          0,
          4
        );
        let header = "";
        let isValid = false;

        //we need to read a certain pattern
        for (let i = 0; i < arr.length; i++) {
          //header = convert to haxadecimal to compare
          header += arr[i].toString(16);
        }
        switch (header) {
          //pattern png
          case "89504e47":
            isValid = true;
            break;
          //pattern jpeg
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        if (isValid) {
          //null is true
          observer.next(null);
        } else {
          //we create a object for invalid
          observer.next({ invalidMimeType: true });
        }
        //then complete
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};
