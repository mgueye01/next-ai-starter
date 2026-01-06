"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/trpc/react";
import {
  UserPlus,
  Search,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Image as ImageIcon,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function AdminClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const { data: clients, isLoading, refetch } = api.client.list.useQuery();

  const createClient = api.client.create.useMutation({
    onSuccess: () => {
      refetch();
      setShowCreateModal(false);
      setNewClient({ name: "", email: "", phone: "", password: "" });
    },
  });

  const deleteClient = api.client.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const filteredClients = clients?.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    await createClient.mutateAsync(newClient);
  };

  const handleDeleteClient = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      await deleteClient.mutateAsync({ id });
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#6B5B47]">Clients</h1>
            <p className="text-[#8B7355] mt-1">Gérez vos clients</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-[#CFAB8D] text-white px-6 py-3 rounded-xl hover:bg-[#B8967A] transition-colors"
          >
            <UserPlus size={20} />
            Nouveau client
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un client..."
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
          />
        </div>

        {/* Client List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl h-24 animate-pulse" />
            ))}
          </div>
        ) : !filteredClients || filteredClients.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <UserPlus size={48} className="mx-auto text-[#CFAB8D] mb-4" />
            <h2 className="text-xl font-semibold text-[#6B5B47] mb-2">
              {searchQuery ? "Aucun résultat" : "Aucun client"}
            </h2>
            <p className="text-[#8B7355] mb-6">
              {searchQuery
                ? "Essayez avec d'autres termes"
                : "Créez votre premier client pour commencer"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 bg-[#CFAB8D] text-white px-6 py-3 rounded-xl hover:bg-[#B8967A] transition-colors"
              >
                <UserPlus size={20} />
                Créer un client
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl divide-y">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="p-4 flex items-center justify-between hover:bg-[#ECEEDF]/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-[#CFAB8D] flex items-center justify-center text-white font-bold text-xl">
                    {client.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-semibold text-[#6B5B47] text-lg">
                      {client.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#8B7355]">
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {client.email}
                      </span>
                      {client.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={14} />
                          {client.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center gap-6">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-[#8B7355]">
                    <span className="flex items-center gap-1">
                      <ImageIcon size={16} />
                      {client.galleryCount} galeries
                    </span>
                    {client.lastLoginAt && (
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {format(new Date(client.lastLoginAt), "d MMM", {
                          locale: fr,
                        })}
                      </span>
                    )}
                  </div>

                  {/* Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === client.id ? null : client.id)
                      }
                      className="p-2 text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {menuOpen === client.id && (
                      <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-40 z-10">
                        <Link
                          href={`/admin/clients/${client.id}`}
                          className="w-full px-4 py-2 text-left text-sm text-[#6B5B47] hover:bg-[#ECEEDF] flex items-center gap-2"
                        >
                          <Edit size={16} />
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Client Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#6B5B47]">
                  Nouveau client
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 text-[#8B7355] hover:text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateClient} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) =>
                      setNewClient({ ...newClient, name: e.target.value })
                    }
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) =>
                      setNewClient({ ...newClient, email: e.target.value })
                    }
                    placeholder="jean@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) =>
                      setNewClient({ ...newClient, phone: e.target.value })
                    }
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newClient.password}
                      onChange={(e) =>
                        setNewClient({ ...newClient, password: e.target.value })
                      }
                      placeholder="Minimum 8 caractères"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
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
                </div>

                {createClient.isError && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    {createClient.error.message}
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 text-[#6B5B47] hover:bg-[#ECEEDF] rounded-xl transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={createClient.isPending}
                    className="px-6 py-3 bg-[#CFAB8D] text-white rounded-xl hover:bg-[#B8967A] transition-colors disabled:opacity-50"
                  >
                    {createClient.isPending ? "Création..." : "Créer le client"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
