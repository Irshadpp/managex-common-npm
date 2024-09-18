import { Queues } from "./queues";
import { Role } from "./types/user-role";

export interface ProjectUserCreatedEvent {
  queue: Queues.ProjectUserCreated;
  data: {
    id: string;
    fName?: string;
    lName?: string;
    email?: string;
    username?: string;
    phone?: number;
    role?: Role;
    profileURL?: string;
    isActive?: boolean;
    organizationId?: string;
  };
}
