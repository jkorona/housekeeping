import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  Box,
  Button,
  Center,
  Heading,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  return (
    <Center w="full" h="100vh">
      <Box maxW="sm" p="4" borderRadius="lg" boxShadow="lg">
        <Stack mb="4">
          <Heading>Login</Heading>
          <Text textStyle="sm">Press button below to sign in with Google</Text>
        </Stack>
        <Separator />
        <Center p="4">
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
            <Button variant="outline" type="submit" alignSelf="center">
              <FcGoogle />
              Sign in with Google
            </Button>
          </form>
        </Center>
      </Box>
    </Center>
  );
}
