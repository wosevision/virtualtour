import { ConnectionProfile } from './connection-profile';

export const CONNECTION_PROFILES: {
	[key: string]: ConnectionProfile
} = {
	conserve: new ConnectionProfile(true, 5, 0, 0),
	balanced: new ConnectionProfile(true, 3, 1, 1),
	mobile3g: new ConnectionProfile(true, 4, 1, 0),
	mobileWifi: new ConnectionProfile(true, 2, 1, 0),
	desktopSlow: new ConnectionProfile(true, 5, 2, 1),
	desktopFast: new ConnectionProfile(true, 1, 2, 1),
};