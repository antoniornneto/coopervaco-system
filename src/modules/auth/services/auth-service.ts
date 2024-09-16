import * as jose from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
async function openSessionToken(token: string) {
  const { payload } = await jose.jwtVerify(token, secret);

  return payload;
}

async function createSessionToken(payload = {}) {
  // const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .sign(secret);

  const { exp } = await openSessionToken(session);

  cookies().set("session", session, {
    expires: (exp as number) * 1000,
    path: "/",
  });
}

async function isSessionValid() {
  const sessionCookie = cookies().get("session");

  if (sessionCookie) {
    const { value } = sessionCookie;
    const { exp } = await openSessionToken(value);
    const currentDate = new Date().getDate();

    return (exp as number) * 1000 > currentDate;
  }
  return false;
}

function destroySession() {
  cookies().delete("session");
}

const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid,
  destroySession,
};

export default AuthService;
