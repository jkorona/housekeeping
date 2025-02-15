import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  return (
    <main>
      <h1>Login</h1>
      <form
        action={async () => {
          "use server";
          try {
            await signIn("google", {
              redirectTo: callbackUrl ?? "",
            });
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`/login?error=${error.type}`);
            }
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
