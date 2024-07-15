import { api_url } from '$lib/api';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {

    const pResponse = await fetch(api_url('/providers'));
    const providers = await pResponse.json();

    const upResponse = await fetch(api_url('/user/providers'));
    const userProviders = await upResponse.json();

    return { providers, userProviders };
}

/** @type {import('./$types').Actions} */
export const actions = {

    addOAuthProvider: async ({ fetch, request }) => {
        const formData = await request.formData();

        const response = await fetch(api_url(`/providers/${formData.get('provider_id')}/oauth_url`))
        const data = await response.json();
        if (!response.ok) {
            // TODO: Improve error handling (#7)
            return { error: data.detail };
        }
        const oauth_url = data;

        redirect(301, oauth_url);
        
    },

    addTokenProvider: async ({ fetch, request }) => {
        const formData = await request.formData();

        const response = await fetch(api_url(`/user/providers/${formData.get('provider_id')}/basic_token`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: formData.get('token'),
            }),
        })
        const data = await response.json();
        if (!response.ok) {
            // TODO: Improve error handling (#7)
            return { error: data.detail };
        }
    },

    addBasicProvider: async ({ fetch, request }) => {
        const formData = await request.formData();

        const response = await fetch(api_url(`/user/providers/${formData.get('provider_id')}/basic_login`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.get('username'),
                password: formData.get('password'),
            }),
        })
        const data = await response.json();
        if (!response.ok) {
            // TODO: Improve error handling (#7)
            return { error: data.detail };
        }
    },

    deleteProvider: async ({ fetch, request }) => {
        const formData = await request.formData();

        const response = await fetch(api_url(`/user/providers/${formData.get('provider_id')}`), {
            method: 'DELETE',
        })
        const data = await response.json();
        if (!response.ok) {
            // TODO: Improve error handling (#7)
            return { error: data.detail };
        }
    },

}