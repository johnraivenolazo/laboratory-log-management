import { Auth, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ hd: 'neu.edu.ph' });

export async function signInWithGoogle(auth: Auth, loginHint?: string): Promise<User> {
    if (loginHint) {
        googleProvider.setCustomParameters({ hd: 'neu.edu.ph', login_hint: loginHint });
    }

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Defense-in-depth: verify domain even after Google restricts it
    if (!user.email?.endsWith('@neu.edu.ph')) {
        await signOut(auth);
        throw new Error('Only @neu.edu.ph institutional emails are allowed.');
    }

    return user;
}

export async function signOutUser(auth: Auth): Promise<void> {
    await signOut(auth);
}
