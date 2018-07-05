import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export abstract class SubscriptionService {
    public subscribe<T>(next: (val: T) => void): Subscription {
        return this._subscribableState().subscribe(next);
    }

    protected abstract _subscribableState(): BehaviorSubject<any>;
}
