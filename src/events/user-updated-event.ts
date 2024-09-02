import { Queues } from "./queues";
import { Role } from "./types/user-role";

interface Address{
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

export interface UserUpdatedEvent{
    queue: Queues.UserUpdated;
    data:{
        fName?: string;
        lName?: string;
        email?: string;
        username?: string;
        phone?: number;
        role?: Role;
        profileURL?: string;
        dob?: Date;
        address?: Address;
    }
}