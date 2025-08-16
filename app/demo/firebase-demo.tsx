"use client";
import { useState, useEffect } from 'react';
import { auth, safeSignInWithEmail, safeSignInWithGoogle, monitorAuthState } from '../../lib/firebase';
import { Button } from '../../components/Button';

export default function FirebaseDemo() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = monitorAuthState(setUser);
    return unsubscribe;
  }, []);

  async function handleEmailSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await safeSignInWithEmail(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    setError('');
    try {
      await safeSignInWithGoogle();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6 mt-8">
      <h2 className="font-heading text-2xl mb-4 text-primary">Firebase Auth Demo</h2>
      {user ? (
        <div>
          <p className="mb-2">Signed in as <span className="font-bold">{user.email}</span></p>
          <Button variant="error" onClick={() => auth.signOut()}>Sign Out</Button>
        </div>
      ) : (
        <form onSubmit={handleEmailSignIn} className="flex flex-col gap-3">
          <input
            className="border px-3 py-2 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="border px-3 py-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" disabled={loading}>Sign In</Button>
          <Button type="button" variant="accent" onClick={handleGoogleSignIn} disabled={loading}>
            Sign In with Google
          </Button>
          {error && <p className="text-error mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
}
