import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { EnumToStrPipe } from '../orders/pipes/enum-to-string.pipe';
import { Cook, CookState } from '../../types/types';
import { ApiService } from '../../api-gateway/api.service';

@UntilDestroy()
@Component({
  selector: 'app-cooks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EnumToStrPipe],
  templateUrl: './cooks.component.html',
})
export class CooksComponent implements OnInit, OnDestroy {
  cooks: Cook[] = [];
  CookState = CookState;
  interval!: NodeJS.Timeout;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCooks().subscribe((cooks) => (this.cooks = cooks));

    this.interval = setInterval(() => {
      this.apiService.getCooks().subscribe((cooks) => (this.cooks = cooks));
    }, 6000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  stopCook(id: string) {
    this.apiService.stopCook(id).pipe(untilDestroyed(this)).subscribe();
    this.apiService
      .getCooks()
      .pipe(untilDestroyed(this))
      .subscribe((cooks) => (this.cooks = cooks));
  }

  resumeCook(id: string) {
    this.apiService.resumeCook(id).pipe(untilDestroyed(this)).subscribe();
    this.apiService
      .getCooks()
      .pipe(untilDestroyed(this))
      .subscribe((cooks) => (this.cooks = cooks));
  }
}
