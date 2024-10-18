import amqp from 'amqplib';

let connection: amqp.Connection | null;

export const connectToRabbitMQ = async (): Promise<amqp.Channel> =>{
    if(!connection){
        // connection = await amqp.connect('amqp://localhost');
        console.log(process.env.RABBITMQ_URL, "ennnnvvvvvvvvvvvvvvvvvvvv---------------<")
        connection = await amqp.connect('amqp://rabbitmq-srv.default.svc.cluster.local');
    }
    return await connection.createChannel();
}