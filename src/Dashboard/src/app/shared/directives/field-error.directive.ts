import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

export type ValidationError =
  | 'required'
  | 'minlength'
  | 'maxlength'
  | 'invalid';

export type ValidationErrorTuple = {
  error: ValidationError;
  message: string;
};

@Directive({
  standalone: true,
  selector: '[appFieldError]',
})
export class FieldErrorDirective implements OnDestroy, OnChanges {
  @Input() appFieldError!:
    | ValidationError
    | ValidationError[]
    | ValidationErrorTuple
    | ValidationErrorTuple[];

  @Input() group!: FormGroup;
  @Input() input: HTMLInputElement | undefined;
  @Input() fieldLabel: string | undefined;
  @Input() fieldControl!: AbstractControl | null;

  readonly nativeElement: HTMLElement;
  private controlSubscription: Subscription | undefined;

  constructor(private el: ElementRef) {
    this.nativeElement = this.el.nativeElement;
  }

  ngOnDestroy(): void {
      this.controlSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
      
  }

  renderErrors(errors: string) {
    this.nativeElement.innerText = errors;
  }

  getStandardErrorMessage(error: ValidationError): string {
    const label = this.fieldLabel ?? '';
    switch (error) {
      case 'required':
        return `${label} is required`;
      case 'minlength':
        return `${label} must be at least ${
          this.fieldControl?.getError(error)?.requiredLength ?? 2
        }`;
      case 'maxlength':
        return `${label} can't exceed ${
          this.fieldControl?.getError(error)?.requiredLength ?? 50
        } characters`;
      case 'invalid':
        return `A valid ${label} is reuired`;
    }
  }

  updateErrorMessage() {
    const errorsToDisplay: string[] = [];

    const errors = Array.isArray(this.appFieldError)
      ? this.appFieldError
      : [this.appFieldError];

    errors.forEach(
      (
        error: ValidationError | { error: ValidationError; message: string }
      ) => {
        const errorCode = typeof error === 'object' ? error.error : error;
        
        const message =
          typeof error === 'object' // why use it
            ? () => error.message
            : () => this.getStandardErrorMessage(error);

        const errorChecker =
          errorCode === 'invalid' // why use it
            ? () => this.fieldControl?.invalid
            : () => this.fieldControl?.hasError(errorCode);

        if (errorChecker()) {
          errorsToDisplay.push(message());
        }
      }
    );

    this.renderErrors(errorsToDisplay.join('<br>'))
  }
}
