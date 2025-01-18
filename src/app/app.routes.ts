import { Routes } from '@angular/router';
import { DepartementsComponent } from './departements/departements.component';
import { CohortesComponent } from './cohortes/cohortes.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AssignationCarteComponent } from './assignation-carte/assignation-carte.component';
import { DepartementVueComponent } from './departement-vue/departement-vue.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CohorteVueComponent } from './cohorte-vue/cohorte-vue.component';
import { ApprenantDetailsComponent } from './apprenant-details/apprenant-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ConnexionVigileComponent } from './connexion-vigile/connexion-vigile.component';
import { DashboardVigileComponent } from './dashboard-vigile/dashboard-vigile.component';
import { ListeVigileComponent } from './liste-vigile/liste-vigile.component';
import { ApprenantFormComponent } from './apprenant-form/apprenant-form.component';

// Configuration des routes
export const routes: Routes = [
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'departements', component: DepartementsComponent },
  { path: 'cohortes', component: CohortesComponent },
  { path: 'departement/:id', component: DepartementVueComponent, data: { getPrerenderParams: () => [{ id: '1' }, { id: '2' }] } },
  { path: 'cohorte/:id', component: CohorteVueComponent, data: { getPrerenderParams: () => [{ id: '1' }, { id: '2' }] } },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent, data: { getPrerenderParams: () => [{ id: '1' }, { id: '2' }] } },
  { path: 'apprenant-details/:id', component: ApprenantDetailsComponent, data: { getPrerenderParams: () => [{ id: '1' }, { id: '2' }] } },
  { path: 'departement/:id/ajout-utilisateur', component: UserFormComponent, data: { getPrerenderParams: () => [{ id: '1' }] } },
  { path: 'departement/:id/edit-utilisateur/:userId', component: UserFormComponent, data: { getPrerenderParams: () => [{ id: '1', userId: '1' }] } },
  { path: 'cohorte/:id/ajout-apprenant', component: ApprenantFormComponent, data: { getPrerenderParams: () => [{ id: '1' }] } },
  { path: 'cohorte/:id/edit-apprenant/:userId', component: ApprenantFormComponent, data: { getPrerenderParams: () => [{ id: '1', userId: '1' }] } },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: ConnexionVigileComponent },
  { path: 'dashboard-vigile', component: DashboardVigileComponent },
  { path: 'liste-vigile', component: ListeVigileComponent },
  { path: 'assignation-carte/:id', component: AssignationCarteComponent, data: { getPrerenderParams: () => [{ id: '1' }] } },
];
