import { writable } from 'svelte/store';

export const loggedIn = writable(false);
export const displayName = writable('');