import { ElementRef, Renderer2 } from '@angular/core';

declare var M: any

export interface MaterialInstance {
    open?(): void
    close?(): void
    destroy?(): void
    getSelectedValues?(): void
}

  
export interface MaterialDatepicker extends MaterialInstance {
    date?: Date
}

export class MaterialService {
    static toast(message: string) {
        M.toast({html: message})
    }

    static initModal(ref: ElementRef): MaterialInstance {
        return M.Modal.init(ref.nativeElement)
    }

    static initDropdown(ref: ElementRef): MaterialInstance {
        return M.Dropdown.init(ref.nativeElement)
    }

}