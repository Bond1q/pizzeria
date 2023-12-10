import { CommonModule } from '@angular/common';
import {  Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ApiService } from '../../api-gateway/api.service';


@UntilDestroy()
@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './configuration.component.html',
})
export class ConfigurationComponent {
  form = this.formBuilder.group({
    cooksNumber: [
      6,
      [Validators.required, Validators.min(5), Validators.max(19)],
    ],
    pizzasNumber: [
      5,
      [Validators.required, Validators.min(1), Validators.max(9)],
    ],
    minimalPizzaCreationTime: [
      20,
      [Validators.required, Validators.min(11), Validators.max(99)],
    ],
    strategy: ['randomGenerationStrategy', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  configure() {
    const cooksNumber = this.form.controls.cooksNumber.value;
    const pizzasNumber = this.form.controls.pizzasNumber.value;
    const minimalPizzaCreationTime =
      this.form.controls.minimalPizzaCreationTime.value;
    const strategy = this.form.controls.strategy.value;

    if (cooksNumber && pizzasNumber && minimalPizzaCreationTime && strategy) {
      this.apiService
        .configurePizzeria({
          cooksNumber,
          pizzasNumber,
          minimalPizzaCreationTime,
          intervalGenerationStrategy: strategy === 'intervalGenerationStrategy',
          randomGenerationStrategy: strategy === 'randomGenerationStrategy',
        })
        .pipe(untilDestroyed(this))
        .subscribe();
    }
  }
}
