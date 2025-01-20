import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './highlight.directive';
import { AlternatingCasePipe } from './alternating-case.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective, AlternatingCasePipe],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl mb-4">Color Manager</h1>
      
      <div class="mb-4">
        <input 
          [(ngModel)]="newColor" 
          placeholder="Enter color name" 
          class="border p-2 mr-2"
        >
        <button 
          (click)="addColor()" 
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Color
        </button>
      </div>

      <div *ngIf="errorMessage" class="text-red-500 mb-4">
        {{ errorMessage }}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          *ngFor="let color of colors" 
          class="p-4 rounded shadow-lg"
          [style.backgroundColor]="color"
          appHighlight
        >
          <p class="text-center" [style.color]="getContrastColor(color)">
            {{ color | alternatingCase }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  colors: string[] = ['Red', 'Green', 'Blue'];
  newColor: string = '';
  errorMessage: string = '';

  addColor() {
    if (!this.newColor.trim()) {
      return;
    }

    const colorName = this.newColor.trim();
    if (this.colors.some(c => c.toLowerCase() === colorName.toLowerCase())) {
      this.errorMessage = 'Color already exists!';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    this.colors.push(colorName);
    this.newColor = '';
    this.errorMessage = '';
  }

  getContrastColor(backgroundColor: string): string {
    // Simple contrast calculation
    const color = backgroundColor.toLowerCase();
    const darkColors = ['black', 'dark', 'blue', 'purple', 'brown'];
    return darkColors.some(dc => color.includes(dc)) ? 'white' : 'black';
  }
}