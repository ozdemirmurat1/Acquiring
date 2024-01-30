import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navigations } from 'src/app/ui/router/router.navigation';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {

  navigations = Navigations;
  
}
