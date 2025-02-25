import { NgxSpinnerService } from 'ngx-spinner';

// BaseComponent özünde bir sınıf olmaktan başka işimize yaramayacağı için gereksiz şeyleri kaldırdık.@Component ibaresini bile.
// bütün componentlerde spinner olmasını istiyorum.

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(spinnerNameType: SpinnerType) {
    this.spinner.show(spinnerNameType);

    setTimeout(() => this.hideSpinner(spinnerNameType), 1000);
  }

  hideSpinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
  }
}

export enum SpinnerType {
  BallAtom = 's1',
  BallScaleMultiple = 's2',
  BallSpinClockwiseFadeRotating = 's3',
}
