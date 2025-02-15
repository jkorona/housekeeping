import { auth, signOut } from "@/auth";
import { neon } from "@neondatabase/serverless";

async function getData() {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`SELECT version()`;
  return response[0].version;
}

export default async function Page() {
  const data = await getData();
  const session = await auth();

  return (
    <main>
      <h1>{data}</h1>
      {session?.user && (
        <div style={{ display: "flex", flexDirection: "column", padding: '2rem', gap: '1rem', alignItems: 'flex-start' }}>
          <span>{session.user.id}</span>
          <span>{session.user.name}</span>
          <span>{session.user.email}</span>
          <img alt="user" src={session.user.image!} width={100} height={100} />
          <button
            onClick={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}
