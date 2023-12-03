import { SnowflakePayload } from "../snowflake";
import { UserPayload } from "./user";

enum TeamMemberMembershipState {
    Invited = 1,
    Accepted = 2,
}

type TeamMemberPayload = {
    membership_state: TeamMemberMembershipState;
    permissions: string[];
    team_id: SnowflakePayload;
    user: UserPayload;
};

type TeamPayload = {
    id: SnowflakePayload;
    name: string;
    icon: string;
    owner_user_id: SnowflakePayload;
    members: TeamMemberPayload[];
};

export { TeamPayload, TeamMemberPayload, TeamMemberMembershipState };
