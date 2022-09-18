import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CurrentBankService {
    public currentId: string = 'home';

    // public currentBank: Observable<string> = new Observable<string>((subscriber) => {
    //     subscriber.next(this.currentId)
    //     console.log(subscriber)
    // })

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    getRoute(): void {
        this.router.events.subscribe((val) => {
            // see also
            if (val instanceof ActivationEnd) {
                this.currentId = val.snapshot.paramMap.get('bank') as string
                console.log(this.currentId)
            }
        });
    }
}
