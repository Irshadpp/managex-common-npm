// import amqp from 'amqplib';

// let connection: amqp.Connection | null;

// export const connectToRabbitMQ = async (): Promise<amqp.Channel> =>{
//     if(!connection){
//         // connection = await amqp.connect('amqp://localhost');
//         console.log(process.env.RABBITMQ_URL, "ennnnvvvvvvvvvvvvvvvvvvvv---------------<")
//         connection = await amqp.connect('amqp://guest:guest@rabbitmq-srv:5672');
//     }
//     return await connection.createChannel();
// }

import amqp from 'amqplib';

let connection: amqp.Connection | null = null;

const RECONNECT_DELAY = 5000; // 5 seconds delay between retries
const MAX_RECONNECT_ATTEMPTS = 10;

export const connectToRabbitMQ = async (): Promise<amqp.Channel> => {
    let attempts = 0;

    while (!connection) {
        try {
            // Connect to RabbitMQ
            connection = await amqp.connect('amqp://guest:guest@rabbitmq-srv:5672');
            console.log('Connected to RabbitMQ successfully!');
        } catch (error) {
            attempts += 1;
            console.log(`RabbitMQ connection failed (attempt ${attempts}). Retrying in ${RECONNECT_DELAY / 1000} seconds...`);
            
            // If maximum reconnection attempts reached, throw an error
            if (attempts >= MAX_RECONNECT_ATTEMPTS) {
                throw new Error('Failed to connect to RabbitMQ after multiple attempts');
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, RECONNECT_DELAY));
        }
    }

    // Setup a listener for connection close events
    connection.on('close', () => {
        console.log('RabbitMQ connection closed. Attempting to reconnect...');
        connection = null;
    });

    // Return the channel
    return await connection.createChannel();
};
