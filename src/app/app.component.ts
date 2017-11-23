import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loadedFeature = 'recipe';

    ngOnInit() {
        firebase.initializeApp({
            apiKey: 'AIzaSyB2398r5QcIXA_hE9JHVoa7_hq6K-eDIUw',
            authDomain: 'ng-recipe-book-b67bb.firebaseapp.com'
        });
    }

    onNavigate(feature: string): void {
        this.loadedFeature = feature;
    }
}
