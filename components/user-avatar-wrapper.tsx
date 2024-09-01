"use client";

import { Profile } from "@prisma/client";
import UserAvatar from "./user-avatar";

interface UserAvatarWrapperProps {
	profile: Profile;
}

const UserAvatarWrapper = ({ profile }: UserAvatarWrapperProps) => {
	return <UserAvatar src={profile?.imageUrl}/>;
};

export default UserAvatarWrapper;
