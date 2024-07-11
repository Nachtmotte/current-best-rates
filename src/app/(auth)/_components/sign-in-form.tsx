import { signInWithCredentials } from "@/auth/actions";

export default function SignInForm() {
  return (
    <form action={signInWithCredentials}>
      <label>
        Email
        <input name="email" type="email" autoComplete="username" />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
        />
      </label>

      <button type="submit">Sign In</button>
    </form>
  );
}
