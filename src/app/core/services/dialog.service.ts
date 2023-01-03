import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor() {
    }

    configureDialog(data): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.panelClass = 'app-full-bleed-dialog';
        dialogConfig.data = data;
        return dialogConfig;
    }

    configureFullDialog(data): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.height = '100vh';
        dialogConfig.width = '100vw';
        dialogConfig.maxWidth = '100vw';
        dialogConfig.maxHeight = '100vh';
        dialogConfig.panelClass = 'full-screen-modal';
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;
        dialogConfig.data = data;
        return dialogConfig;
    }
}
