import {View, ElementRef, Renderer, EventEmitter, onChange, onInit} from 'angular2/angular2';
import {isPresent} from 'angular2/src/facade/lang';
import {setProperty} from 'angular2/src/forms/directives/shared'

//pretty sure this has changed in the latest angular
import {NgControl} from 'angular2/forms';

import {Ion} from '../ion';
import {IonicConfig} from '../../config/config';
import {IonicComponent} from '../../config/annotations';
import {Icon} from '../icon/icon';


@IonicComponent({
  selector: 'ion-checkbox',
  properties: [
    'checked',
    'disabled',
    'value'
  ],
  defaultProperties: {
    'iconOff': 'ion-ios-circle-outline',
    'iconOn': 'ion-ios-checkmark'
  },
  //events: ['change'],
  host: {
    '(^click)': 'onClick($event)',
    //'(change)': 'onChange($event.checked)',
    '(blur)': 'onTouched()',
    //'[checked]': 'checked',
    '[attr.aria-checked]': 'checked',
    '[attr.aria-disabled]': 'disabled',
    '[attr.value]': 'value',
    'role': 'checkbox',
    'class': 'item',
    '[class.ng-untouched]': 'ngClassUntouched',
    '[class.ng-touched]': 'ngClassTouched',
    '[class.ng-pristine]': 'ngClassPristine',
    '[class.ng-dirty]': 'ngClassDirty',
    '[class.ng-valid]': 'ngClassValid',
    '[class.ng-invalid]': 'ngClassInvalid'
  },
  appInjector: [ NgControl ]
  //lifecycle: [onChange]
})
@View({
  template: `
  <div class="item-media media-checkbox">
    <icon [name]="iconOff" class="checkbox-off"></icon>
    <icon [name]="iconOn" class="checkbox-on"></icon>
  </div>
  <div class="item-content">
    <div class="item-label">
      <content></content>
    </div>
  </div>`,
  directives: [Icon]
})
export class Checkbox extends Ion {
  constructor(
    ngControl: NgControl,
    renderer: Renderer,
    elementRef: ElementRef,
    ionicConfig: IonicConfig
  ) {
    super(elementRef, ionicConfig);

    this.ngControl = ngControl;
    this.renderer = renderer;
    this.elementRef = elementRef;
    this.ngControl.valueAccessor = this;

    //this.change = new EventEmitter("change");
  }

  /**
   * Much like ngModel, this is called from our valueAccessor for the attached
   * ControlDirective to update the value internally.
   */
  writeValue(value) {
    // Convert it to a boolean
    this.checked = !!value;
  }

  set checked(checked) {
    this._checked = checked;
    // doesn't trigger change/validation for control?
    setProperty(this.renderer, this.elementRef, "checked", checked);
    //this.ngControl.control.checked = checked;
    //this.change.next(checked);
  }
  get checked() {
    return this._checked
  }
  onClick() {
    this.checked = !this.checked;
  }

  get ngClassUntouched() {
    return isPresent(this.ngControl.control) ? this.ngControl.control.untouched : false;
  }
  get ngClassTouched() {
    return isPresent(this.ngControl.control) ? this.ngControl.control.touched : false;
  }
  get ngClassPristine() {
    return isPresent(this.ngControl.control) ? this.ngControl.control.pristine : false;
  }
  get ngClassDirty() { return isPresent(this.ngControl.control) ? this.ngControl.control.dirty : false; }
  get ngClassValid() { return isPresent(this.ngControl.control) ? this.ngControl.control.valid : false; }
  get ngClassInvalid() {
    return isPresent(this.ngControl.control) ? !this.ngControl.control.valid : false;
  }

  registerOnChange(fn): void { this.onChange = fn; }
  registerOnTouched(fn): void { this.onTouched = fn; }

}
