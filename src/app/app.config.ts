import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { Routes } from './app-routing.module';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
  ]
};
