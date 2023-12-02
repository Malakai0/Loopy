import { SnowflakePayload } from "../snowflake";

enum PremiumType {
    None = 0,
    NitroClassic = 1,
    Nitro = 2,
    NitroBasic = 3,
}

enum UserFlags {
    Staff = 1 << 0,
    Partner = 1 << 1,
    HypeSquad = 1 << 2,
    BugHunterLevel1 = 1 << 3,
    HypeSquadOnlineHouse1 = 1 << 6,
    HypeSquadOnlineHouse2 = 1 << 7,
    HypeSquadOnlineHouse3 = 1 << 8,
    PremiumEarlySupporter = 1 << 9,
    TeamPseudoUser = 1 << 10,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    VerifiedDeveloper = 1 << 17,
    CertifiedModerator = 1 << 18,
    BotHTTPInteractions = 1 << 19,
    ActiveDeveloper = 1 << 22,
}

type UserPayload = {
    id: SnowflakePayload;
    username: string;
    discriminator: string;
    global_name: string;
    avatar: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: UserFlags;
    premium_type?: PremiumType;
    public_flags?: UserFlags;
    avatar_decoration?: string;
};

export { PremiumType, UserFlags, UserPayload };
