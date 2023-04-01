import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoiComponent } from './poi/poi.component';
import { ResultpoiComponent } from './resultpoi/resultpoi.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ContactComponent } from './contact/contact.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalConnexionComponent } from './modal-connexion/modal-connexion.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'POI',component:PoiComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    PoiComponent,
    ResultpoiComponent,
    MapComponent,
    HomeComponent,
    ContactComponent,
    ModalConnexionComponent,
  ],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
