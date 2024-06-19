import { Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MsgErrorComponent } from '../../../shared/components/msg-error.component';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MsgErrorComponent],
})
export class ProductSearchComponent {
  // @Output() searchEvent = new EventEmitter<string | null>();
  searchEvent = output<string | null>({alias: 'onValueChange'});

  search = new FormControl('');

  constructor() {
    this.search.valueChanges
      .pipe(
        takeUntilDestroyed(),
        filter(() => this.search.valid),
        debounceTime(1000),
        tap((searchValue: string | null) => this.doSearch(searchValue))
      )
      .subscribe();
  }

  doSearch(searchValue: string | null) {
    this.searchEvent.emit(searchValue);
  }
}
