export interface EventPublisher {
    publish<T>(
        eventName: string,
        payload: T
    ): Promise<void>;
}
