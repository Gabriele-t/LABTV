import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {
  purchases: Purchase[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    const loggedUser = this.authService.getLoggedUser();
    if (loggedUser) {
      this.authService.getPurchases(loggedUser.user.id)
        .subscribe(
          purchases => {
            this.purchases = purchases;
          },
          error => {
            this.errorMessage = 'Errore durante il caricamento degli acquisti.';
            console.error('Errore durante il caricamento degli acquisti:', error);
          }
        );
    }
  }

  returnPurchase(movieId: number): void {
    this.authService.returnMovie(movieId)
      .subscribe(
        () => {
          this.loadPurchases();
        },
        error => {
          this.errorMessage = 'Errore durante la restituzione dell\'acquisto.';
          console.error('Errore durante la restituzione dell\'acquisto:', error);
        }
      );
  }
}