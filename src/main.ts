import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ConnexionVigileComponent } from './app/connexion-vigile/connexion-vigile.component';
import { DashboardVigileComponent } from './app/dashboard-vigile/dashboard-vigile.component';
import { DashboardAdminComponent } from './app/dashboard-admin/dashboard-admin.component';

import { ListeVigileComponent } from './app/liste-vigile/liste-vigile.component'; // Importer le composant ListeVigile
import { provideHttpClient } from '@angular/common/http';  // Importation pour HttpClient

bootstrapApplication(AppComponent, {
  providers: [
    // Fournir HttpClient pour l'application entière
    provideHttpClient(),

    // Configuration des routes
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection par défaut
      { path: 'login', component: ConnexionVigileComponent }, // Route vers ConnexionVigile
      { path: 'dashboard-vigile', component: DashboardVigileComponent }, // Route vers DashboardVigile
      { path: 'liste-vigile', component: ListeVigileComponent }, // Route vers ListeVigile
      { path: 'dashboard-admin', component: DashboardAdminComponent }, // Route vers DashboardAdmin
    ], withComponentInputBinding()),
  ],
}).catch(err => console.error(err));
