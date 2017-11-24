import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(
    private dataStorageService: DataStorageService,
    public authService: AuthService
  ) {}

  onSaveData(): void {
    this.dataStorageService
      .storeRecipes()
      .subscribe((response: Response) => console.log(response));
  }

  onFetchData(): void {
    this.dataStorageService.getRecipes();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
