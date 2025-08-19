import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container" [class.centered]="centered">
      <div class="error-icon">⚠️</div>
      <div class="error-content">
        <h3 class="error-title">{{ title }}</h3>
        <p class="error-message">{{ message }}</p>
        <div class="error-actions" *ngIf="showRetry">
          <button class="retry-btn" (click)="onRetry.emit()">
            Try Again
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      padding: 1.5rem;
      border: 1px solid #f56565;
      border-radius: 8px;
      background: #fef2f2;
      color: #c53030;
    }

    .error-container.centered {
      text-align: center;
      max-width: 400px;
      margin: 2rem auto;
    }

    .error-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .error-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .error-message {
      margin: 0 0 1rem 0;
      line-height: 1.5;
    }

    .error-actions {
      margin-top: 1rem;
    }

    .retry-btn {
      background: #e53e3e;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background-color 0.2s;
    }

    .retry-btn:hover {
      background: #c53030;
    }
  `]
})
export class ErrorDisplayComponent {
  @Input() title: string = 'Something went wrong';
  @Input() message: string = 'An error occurred while loading the data.';
  @Input() showRetry: boolean = true;
  @Input() centered: boolean = false;
  
  @Output() onRetry = new EventEmitter<void>();
} 