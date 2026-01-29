export class Subscriber {

    constructor(
        public readonly id: string,
        public email: string,
        public subscribedAt: Date,
        public active: boolean = true
    ) {}

    deactivate(): void {
        this.active = false;
    }

    reactivate(): void {
        this.active = true;
    }
}
