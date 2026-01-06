"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/trpc/react";
import { Mail, Lock, Eye, EyeOff, Camera } from "lucide-react";

export default function ClientLoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const login = api.client.login.useMutation({
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem("clientToken", data.token);
      localStorage.setItem("clientData", JSON.stringify(data.client));
      router.push("/client/galleries");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const register = api.client.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("clientToken", data.token);
      localStorage.setItem("clientData", JSON.stringify(data.client));
      router.push("/client/galleries");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      await login.mutateAsync({
        email: formData.email,
        password: formData.password,
      });
    } else {
      if (!formData.name) {
        setError("Le nom est requis");
        return;
      }
      await register.mutateAsync({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
    }
  };

  const isLoading = login.isPending || register.isPending;

  return (
    <div className="min-h-screen bg-[#ECEEDF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Camera size={40} className="text-[#CFAB8D]" />
            <span className="text-2xl font-bold text-[#6B5B47]">ElGato Photo</span>
          </Link>
          <p className="text-[#8B7355] mt-2">
            {isLogin ? "Accédez à vos galeries privées" : "Créez votre compte client"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name (register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                  Votre nom
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="votre@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7355] hover:text-[#6B5B47]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-[#8B7355] mt-1">
                  Minimum 8 caractères
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#CFAB8D] text-white rounded-xl font-medium hover:bg-[#B8967A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Chargement..."
                : isLogin
                ? "Se connecter"
                : "Créer mon compte"}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-[#CFAB8D] hover:underline"
            >
              {isLogin
                ? "Pas encore de compte ? Inscrivez-vous"
                : "Déjà un compte ? Connectez-vous"}
            </button>
          </div>
        </div>

        {/* Guest Access */}
        <p className="text-center text-[#8B7355] mt-6">
          Vous avez reçu un code d&apos;accès ?{" "}
          <Link href="/gallery" className="text-[#CFAB8D] hover:underline">
            Accédez à votre galerie
          </Link>
        </p>
      </div>
    </div>
  );
}
