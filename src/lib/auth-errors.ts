export function getAuthErrorMessage(error: any): string {
    const code = error?.code || '';

    switch (code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
            return 'Login failed. Make sure your info is correct so we can guide you on the right path.';
        case 'auth/too-many-requests':
            return 'Too many failed login attempts. Please wait a few minutes before trying again.';
        case 'auth/user-disabled':
            return 'This account has been disabled. Please contact support.';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists. Please login instead.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your internet connection.';
        default:
            return error?.message || 'An unexpected error occurred. Please try again.';
    }
}
