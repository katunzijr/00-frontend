import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  notifications = signal<any[]>([]);

  createToast(type: string, icon: string, title: string, text: string) {
    const newToast = { type, icon, title, text };
    this.notifications.update((arr) => ([...arr, newToast]));

    setTimeout(() => this.removeToast(newToast), 7000);
  }

  removeToast(toast: any) {
    this.notifications.update((arr) => arr.filter(t => t !== toast));
  }

  showSuccess(text: string) {
    this.createToast('success', 'fe fe-check', 'Success', text);
  }

  showError(text: string) {
    this.createToast('error', 'fe fe-alert-triangle', 'Error', text);
  }

  showWarning(text: string) {
    this.createToast('warning', 'fe fe-alert-triangle', 'Warning', text);
  }

  showInfo(text: string) {
    this.createToast('info', 'fe fe-check', 'Info', text);
  }
}
