import { Type } from '@angular/core';
import { AModal } from './weaponslist-modal/modal.abstract';

export interface ModalRequest {
  type: Type<AModal>;
  modalData: any;
}
