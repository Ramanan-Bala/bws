import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../_models';
import { bwsMenus } from './bws-menu';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
})
export class DefaultLayoutComponent implements OnInit {
  isCollapsed = false;
  theme = true;
  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
  };
  menus: Menu[] = bwsMenus;

  constructor() {}

  ngOnInit(): void {}

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  setTheme() {
    console.log('Theme');
    localStorage.setItem('theme', this.theme.toString());
    this.theme = /true/i.test(localStorage.getItem('theme'));
  }
}
