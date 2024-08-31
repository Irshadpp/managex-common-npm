import amqp from 'amqplib'

interface Event{
    queue: string;
    data: any;
}

export abstract class Consumer<T extends Event>{
    abstract queue: T['queue']

    constructor(protected channel: amqp.Channel){}

    abstract onMessage(data: T['data'], msg: amqp.Message): void;

    async consume(): Promise<void>{
        try {
            await this.channel.assertQueue(this.queue, {durable: true});
            console.log(`Waiting for messages in queue: ${this.queue}`);

            this.channel.consume(this.queue, (msg)=>{
                if(msg){
                    const data = JSON.parse(msg.content.toString()) as T['data'];
                    this.onMessage(data, msg);
                    this.channel.ack(msg);
                }
            })
        } catch (error) {
            console.error("Failed to consume message", error);
        }
    }
}