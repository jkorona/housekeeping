import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: {
    callbackUrl?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <main>
      <h1>Login</h1>
      <form
        action={async () => {
          "use server";
          try {
            await signIn('google', {
              redirectTo: searchParams?.callbackUrl ?? "",
            });
          } catch (error) {
            // Signin can fail for a number of reasons, such as the user
            // not existing, or the user not having the correct role.
            // In some cases, you may want to redirect to a custom error
            if (error instanceof AuthError) {
              return redirect(`/login?error=${error.type}`);
            }

            // Otherwise if a redirects happens Next.js can handle it
            // so you can just re-thrown the error and let Next.js handle it.
            // Docs:
            // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
            throw error;
          }
        }}
      >
        <button type="submit">
          <span>Sign in with Google</span>
        </button>
      </form>
    </main>
  );
}
