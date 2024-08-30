import amqp from 'amqplib';

let connection: amqp.Connection | null;

export const connectToRabbitMQ = async (): Promise<amqp.Channel> =>{
    if(!connection){
        connection = await amqp.connect('amqp://localhost');
    }
    return await connection.createChannel();
}