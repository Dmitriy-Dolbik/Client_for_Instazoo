import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // @ts-ignore
  constructor(private snackbar: MatSnackBar):  { }

  public showSnackBar(message: String): void {
    // @ts-ignore
    this.snackbar.open(message, null, {
      duration: 2000
    })
  }
}

