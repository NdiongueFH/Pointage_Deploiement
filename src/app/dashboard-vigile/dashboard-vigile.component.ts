import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from '../services/websocket.service';  // Import du service WebSocket
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pointage',
  templateUrl: './dashboard-vigile.component.html',
  styleUrls: ['./dashboard-vigile.component.css']
})
export class DashboardVigileComponent implements OnInit, OnDestroy {
  // Stocke les données de l'utilisateur à afficher
  employeeData = {
    matricule: 'en attente...',
    nom: 'en attente...',
    prenom: 'en attente...',
    statut: 'en attente...',
    premierPointage: 'en attente...',
    dernierPointage: 'en attente...',
    photo: 'images/inconnu.png'  // Ajouter l'URL de la photo
  };

  private messageSubscription!: Subscription;  // Pour stocker l'abonnement aux messages

  constructor(private router: Router, private http: HttpClient, private websocketService: WebSocketService) {}

  ngOnInit() {
    // S'abonner aux messages WebSocket
    this.messageSubscription = this.websocketService.message$.subscribe((data: any) => {
      if (data.type === 'card-data' && data.found) {
        // Mise à jour des informations utilisateur reçues via WebSocket
        this.employeeData = {
          matricule: data.userData.matricule || 'en attente...',
          nom: data.userData.nom || 'en attente...',
          prenom: data.userData.prenom || 'en attente...',
          statut: data.userData.statut || 'en attente...',
          premierPointage: 'en attente...',  // À remplir si tu as un premier pointage
          dernierPointage: 'en attente...',  // À remplir si tu as un dernier pointage
          photo: data.userData.photo || 'images/inconnu.png'  // Ajoute la photo de l'utilisateur (ou une chaîne vide par défaut)
        };

        // Réinitialiser après 10 secondes
        setTimeout(() => {
          this.resetEmployeeData();
        }, 10000);  // 10000 ms = 10 secondes
      } else if (data.type === 'card-data' && !data.found) {
        // Si l'utilisateur n'est pas trouvé
        console.log('Utilisateur non trouvé:', data.message);
        this.employeeData = {
          matricule: 'Non trouvé',
          nom: 'Non trouvé',
          prenom: 'Non trouvé',
          statut: 'Non trouvé',
          premierPointage: 'en attente...',
          dernierPointage: 'en attente...',
          photo: 'images/inconnu.png'  // Pas de photo si l'utilisateur n'est pas trouvé
        };

        // Réinitialiser après 10 secondes
        setTimeout(() => {
          this.resetEmployeeData();
        }, 10000);  // 10000 ms = 10 secondes
      }
    });
  }

  ngOnDestroy() {
    // Désabonnement pour éviter les fuites de mémoire
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  ouvrirPorte() {
    console.log('Ouverture porte');
    this.websocketService.sendMessage('control-door', { action: 'open' });
  }

  fermerPorte() {
    console.log('Fermeture porte');
    this.websocketService.sendMessage('control-door', { action: 'close' });
  }

  consulterListe() {
    console.log('Consultation liste');
    this.router.navigate(['/liste-vigile']);
  }

  deconnexion() {
    console.log('Déconnexion');
    this.http.post('http://localhost:8000/api/logout', {}, { 
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } 
    }).subscribe(
      (response: any) => {
        console.log('Déconnexion réussie', response);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de la déconnexion', error);
      }
    );
  }

  // Méthode pour valider le Checkin
  validerCheckin() {
    const cardID = 'ID_de_la_carte';  // Récupérer le cardID de l'utilisateur (à implémenter selon ton flux)
    if (cardID) {
      this.websocketService.sendMessage('checkin', { cardID });
    } else {
      console.error('Aucun cardID trouvé pour valider le checkin');
    }
  }

  // Réinitialiser les données utilisateur
  private resetEmployeeData() {
    this.employeeData = {
      matricule: 'en attente...',
      nom: 'en attente...',
      prenom: 'en attente...',
      statut: 'en attente...',
      premierPointage: 'en attente...',
      dernierPointage: 'en attente...',
      photo: 'images/inconnu.png'  // Réinitialiser à l'image par défaut
    };
  }
}
