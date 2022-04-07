import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-render-form',
  templateUrl: './render-form.component.html',
  styleUrls: ['./render-form.component.scss']
})
export class RenderFormComponent implements OnInit {

  @Input() model: any;

  constructor() { }

  ngOnInit() {
  }

}