"use client";

import { useActionState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="admin-login-form">
      <label>
        Email address
        <input
          autoComplete="username"
          autoCapitalize="none"
          type="email"
          name="email"
          required
          maxLength={254}
          placeholder="you@company.com"
        />
      </label>

      <label>
        Password
        <input
          autoComplete="current-password"
          type="password"
          name="password"
          required
          maxLength={256}
          placeholder="Enter your password"
        />
      </label>

      {state.error && (
        <p className="admin-form-error" role="alert">
          {state.error}
        </p>
      )}

      <button className="admin-primary-button" disabled={pending}>
        <LockKeyhole size={16} aria-hidden="true" />
        {pending ? "Signing in…" : "Sign in securely"}
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
