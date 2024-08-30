import amqp from 'amqplib'

interface Event{
    queue: string;
    data: any;
}

export abstract class Publisher<T extends Event>{
    abstract queue: T['queue'];

    constructor(protected channel: amqp.Channel){}

    async publish(data: T['data']): Promise<void>{
        try {
            await this.channel.assertQueue(this.queue, {durable: true});
            this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)), {
                persistent: true
            });
            console.log(`Message published to queue: ${this.queue}`)
        } catch (error) {
            console.error("Failed to publish message", error);
        }
    }
}