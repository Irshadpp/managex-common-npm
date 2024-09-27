import { Queues } from "./queues";
import { Role } from "./types/user-role";

export interface ChatUserUpdatedEvent {
  queue: Queues.ChatUserUpdated;
  data: {
    id: string;
    fName?: string;
    lName?: string;
    email: string;
    username: string;
    phone: number;
    role: Role;
    profileURL?: string;
    isActive: boolean;
    organizationId: string;
  };
}
