import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss',
    './../../node_modules/tailwindcss/dist/tailwind.min.css'
  ]
})
export class AppComponent {
  title = 'pruebas';
}
