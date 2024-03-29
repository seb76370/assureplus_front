import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ModalConnexionComponent } from '../modal-connexion/modal-connexion.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../services/authentification.service';
import { ModalResetPasswordComponent } from '../modal-reset-password/modal-reset-password.component';
import { Router } from '@angular/router';
import { AuthInterface } from '../interface/auth.interface';
import { SinistreService } from '../services/sinistre.service';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  title = 'Assure Plus';
  csrfToken: string = '';
  is_admin:boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private http: HttpClient,
    public authService: AuthentificationService,
    public sinistreService: SinistreService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.cookieService.get('jwt')) {
      const auth = this.authService.Get_User_info()
     
      auth.then((data: any) => {
        
          this.authService.is_connected = true;
          this.authService.username = data.username;
          this.authService.contract_number = data.contract_number;
          this.authService.is_admin = data.is_admin
      })
      .then(()=> {

        this.authService.visibleSpinner = false
      })
      .catch((err) => {

        console.log('erreur',err);
        this.authService.is_connected = false;
        this.authService.visibleSpinner = false;
        this.cookieService.delete('jwt');
      });
      }else
      {
        this.authService.is_connected = false;
        this.authService.visibleSpinner = false;
        this.cookieService.delete('jwt');
      }
  }


  // @HostListener('window:beforeunload', ['$event'])
  // clearCookie(event: Event) {
  //   this.authService
  //   .Get_User_info()
  //   .then((data)=>{
  //     alert(data);
      
  //   })
  //   .catch((err) => {
  //     alert( err)
  //     this.cookieService.delete('jwt');
  //   });
  // }


  openDialog(): void {

    this.dialog.open(ModalConnexionComponent, {
      width: '350px',
      height: '250px',
    });

  }

  openReset(): void {
    this.dialog.open(ModalResetPasswordComponent, {
      width: '350px',
      height: '250px',
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
