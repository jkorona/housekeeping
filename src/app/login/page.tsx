import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Button, Center, Fieldset, Stack } from "@chakra-ui/react";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  return (
    <Center w="full" h="100vh">
      <Fieldset.Root size="lg" maxW="sm" p="4" borderRadius="lg" boxShadow="lg">
        <Stack>
          <Fieldset.Legend>Login</Fieldset.Legend>
          <Fieldset.HelperText>
            Press button below to sign in with Google
          </Fieldset.HelperText>
        </Stack>
        <Fieldset.Content>
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
            <Button variant="solid" type="submit" alignSelf="center">
              <FcGoogle />
              Sign in with Google
            </Button>
          </form>
        </Fieldset.Content>
      </Fieldset.Root>
    </Center>
  );
}
