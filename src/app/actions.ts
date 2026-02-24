"use server"

import { currentUser } from '@clerk/nextjs/server';

export async function checkUser() {
    const user = await currentUser();
    if(!user) return {
        success: false,
        error: 'Utilisateur non connecté'
    };
    return {
        success: true,
        user: user
    };
}