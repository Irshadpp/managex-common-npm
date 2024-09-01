import { Queues } from "./queues";
import { Role } from "./types/user-role";

interface Address{
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

export interface EmployeeCreatedEvent{
    queue: Queues.EmployeeCreated;
    data:{
        id: string;
        fName: string;
        lName: string;
        email: string;
        username: string;
        phone: number;
        role: Role;
        profileURL?: string;
        dob: Date;
        isActive: boolean;
        address: Address;
        organizationId: string;
    }
}