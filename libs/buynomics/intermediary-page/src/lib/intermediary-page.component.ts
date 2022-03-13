import { switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { AddFormComponent } from './add-form/add-form.component';
import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  ChangeDetectorRef,
} from '@angular/core';
import {
  TuiAppearance,
  tuiButtonOptionsProvider,
  TuiDialogService,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { IntermediaryDto } from '@buynomics-org/api-interfaces';

//TODO cover all services and components with unit tests
@Component({
  selector: 'buynomics-org-intermediary-page',
  templateUrl: './intermediary-page.component.html',
  styleUrls: ['./intermediary-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiButtonOptionsProvider({
      shape: 'rounded',
      appearance: TuiAppearance.Outline,
      size: 'm',
    }),
  ],
})
export class IntermediaryPageComponent {
  isLoading = true;
  list: IntermediaryDto[] = [];
  form = new FormGroup({});
  constructor(
    private injector: Injector,
    private readonly dialogService: TuiDialogService,
    private readonly httpClient: HttpClient,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //TODO unsubscribe, to prevent memory leak
    this.uploadList().subscribe();
  }

  onEditClick() {}
  onDeleteClick() {}

  onAddClick() {
    this.dialogService
      .open(new PolymorpheusComponent(AddFormComponent, this.injector))
      .pipe(switchMap(() => this.uploadList()))
      .subscribe();
  }

  uploadList() {
    this.isLoading = true;

    return this.httpClient.get<IntermediaryDto[]>('/api/intermediary').pipe(
      tap((response) => {
        this.list = response;
        this.isLoading = false;
        this.cdr.markForCheck();
      })
      //TODO: handle error, maybe show notifications
    );
  }
}
