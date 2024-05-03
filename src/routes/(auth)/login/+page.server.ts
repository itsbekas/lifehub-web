import { api_url } from '$lib/api';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export function load({ cookies }) {
    const token = cookies.get('token');
    if (!token) redirect(302, '/welcome');
}

/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({ cookies, request }) => {
        const formData = await request.formData();
        const response = await fetch(api_url('/user/login'), {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (!response.ok) {
            redirect(302, `/login?error=${data.detail}`);
        }
        // store the token in a cookie
        cookies.set(
            'token',
            data.access_token,
            {
                path: '/',
                // maxAge: data.expires_at,
                httpOnly: true,
                sameSite: 'lax',
                secure: false //TODO: Change to secure when using HTTPS
            }
        );
        cookies.set(
            'display_name',
            data.name,
            {
                path: '/',
                sameSite: 'lax',
                secure: false //TODO: Change to secure when using HTTPS
            }
        )
        let next = formData.get('next')?.toString() || '/';
        redirect(302, next);
    }
}