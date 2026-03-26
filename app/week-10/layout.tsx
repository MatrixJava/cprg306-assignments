import { AuthContextProvider } from "./_utils/auth-context";

export default function Week10Layout({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
