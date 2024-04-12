import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export function load({ cookies }) {
    if (cookies.get('token')) redirect(302, '/user/account');
}

/** @type {import('./$types').Actions} */
export const actions = {
    signup: async ({ cookies, request }) => {
        const formData = await request.formData();
        // Check if passwords match
        if (formData.get('password') !== formData.get('password-confirm')) {
            redirect(302, '/signup?error=Passwords do not match');
        }
        const response = await fetch('http://localhost:8000/auth/signup', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        // store the token in a cookie
        cookies.set(
            'token',
            data.access_token,
            {
                path: '/',
                maxAge: data.expires_in,
                httpOnly: true,
                sameSite: 'lax',
                secure: false //TODO: Change to secure when using HTTPS
            }
        );
        redirect(302, '/user/account')
    }
}