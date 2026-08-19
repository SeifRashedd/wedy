import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login — Wedy",
};

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-rose-blush/30 to-cream">
      <LoginForm />
    </div>
  );
}
