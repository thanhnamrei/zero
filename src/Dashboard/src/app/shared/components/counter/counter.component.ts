import { Component, Input, effect, signal } from "@angular/core";

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    standalone: true
})
export class CounterComponent {
    count = signal(0);
    @Input({required: true,transform: trimString}) value = 0;


    update() {
        this.count.update(v => v + 1);
    }

    constructor() {
        effect(() => {
            console.log(`The count is: ${this.count()}`);
          })
    }
}

function trimString(value: string | undefined) {
    return value?.trim()
}