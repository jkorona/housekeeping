import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Center,
  Container,
  Heading,
  Image,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { Sigmar } from "next/font/google";

const sigmar = Sigmar({
  weight: "400",
  subsets: ["latin"],
});

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  return (
    <Center w="full" h="100dvh">
      <Container maxW="sm" p="4" borderRadius="lg" boxShadow={{ md: "lg" }}>
        <Stack mb="4">
          <Image src="/housekeeping.png" alt="Logo" rounded="md"/>
          <Heading
            textStyle="4xl"
            color="green.600"
            textAlign="center"
            className={sigmar.className}
          >
            Housekeeping
          </Heading>
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
      </Container>
    </Center>
  );
}
