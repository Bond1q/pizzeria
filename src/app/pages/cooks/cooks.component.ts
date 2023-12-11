import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { EnumToStrPipe } from '../orders/pipes/enum-to-string.pipe';
import { Cook, CookState } from '../../types/types';
import { ApiService } from '../../api-gateway/api.service';
import { RouterModule } from '@angular/router';
import { mergeMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-cooks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EnumToStrPipe, RouterModule],
  templateUrl: './cooks.component.html',
})
export class CooksComponent implements OnInit, OnDestroy {
  cooks: Cook[] = [];
  CookState = CookState;
  interval!: NodeJS.Timeout;
  loading = false;

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
    this.loading = true;

    this.apiService
      .stopCook(id)
      .pipe(
        mergeMap(() => this.apiService.getCooks()),
        untilDestroyed(this)
      )
      .subscribe((cooks) => {
        this.cooks = cooks;
        this.loading = false;
      });
  }

  resumeCook(id: string) {
    this.loading = true;
    this.apiService
      .resumeCook(id)
      .pipe(
        mergeMap(() => this.apiService.getCooks()),
        untilDestroyed(this)
      )
      .subscribe((cooks) => {
        this.cooks = cooks;
        this.loading = false;
      });
  }
}
