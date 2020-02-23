import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countrycode-list',
  templateUrl: './countrycode-list.component.html',
  styleUrls: ['./countrycode-list.component.css']
})
export class CountrycodeListComponent {
  @Input() countryCodes: string[];
  @Output() countryCodeClicked: EventEmitter<string> = new EventEmitter();

  constructor() { }

  onCountryCodeClicked(event: Event) {
    try {
      this.countryCodeClicked.emit(event.target['text']);
    } catch (e) {
    }
  }
}
