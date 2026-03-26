import { AuthContextProvider } from "./_utils/auth-context";

export default function Week8Layout({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
