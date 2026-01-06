"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/trpc/react";
import {
  ArrowLeft,
  UserPlus,
  Trash2,
  Mail,
  Phone,
  Crown,
  Eye,
  Users,
  Search,
  X,
} from "lucide-react";

export default function GalleryClientsPage() {
  const params = useParams();
  const galleryId = params.galleryId as string;

  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<"VIEWER" | "COLLABORATOR" | "OWNER">("VIEWER");

  const { data: gallery, isLoading, refetch } = api.gallery.getById.useQuery({
    id: galleryId,
  });

  const { data: allClients } = api.client.list.useQuery();

  const grantAccess = api.client.grantAccess.useMutation({
    onSuccess: () => {
      refetch();
      setShowAddModal(false);
    },
  });

  const revokeAccess = api.client.revokeAccess.useMutation({
    onSuccess: () => refetch(),
  });

  const filteredClients = allClients?.filter(
    (client) =>
      !gallery?.clientAccess.some((a) => a.client.id === client.id) &&
      (client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddClient = (clientId: string) => {
    grantAccess.mutate({
      clientId,
      galleryId,
      role: selectedRole,
    });
  };

  const handleRemoveClient = (clientId: string) => {
    if (confirm("Retirer l'accès de ce client ?")) {
      revokeAccess.mutate({ clientId, galleryId });
    }
  };

  const handleChangeRole = (clientId: string, role: "VIEWER" | "COLLABORATOR" | "OWNER") => {
    grantAccess.mutate({ clientId, galleryId, role });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-white rounded-xl w-48" />
            <div className="h-64 bg-white rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen bg-[#ECEEDF] p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#6B5B47]">Galerie non trouvée</h1>
          <Link
            href="/admin/galleries"
            className="text-[#CFAB8D] hover:underline mt-4 inline-block"
          >
            Retour aux galeries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECEEDF] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href={`/admin/galleries/${galleryId}`}
              className="p-2 text-[#6B5B47] hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#6B5B47]">
                Gestion des clients
              </h1>
              <p className="text-[#8B7355] mt-1">{gallery.title}</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#CFAB8D] text-white rounded-xl hover:bg-[#B8967A] transition-colors"
          >
            <UserPlus size={20} />
            Ajouter un client
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#ECEEDF] rounded-lg flex items-center justify-center">
              <Users size={24} className="text-[#CFAB8D]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#6B5B47]">
                {gallery.clientAccess.length}
              </p>
              <p className="text-[#8B7355]">clients ont accès à cette galerie</p>
            </div>
          </div>
        </div>

        {/* Roles Explanation */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-blue-800 mb-2">Niveaux d&apos;accès</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Eye size={16} className="text-blue-600 mt-0.5" />
              <div>
                <span className="font-medium text-blue-800">Viewer</span>
                <p className="text-blue-600">Peut voir les photos</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users size={16} className="text-blue-600 mt-0.5" />
              <div>
                <span className="font-medium text-blue-800">Collaborator</span>
                <p className="text-blue-600">Peut ajouter favoris/commentaires</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Crown size={16} className="text-blue-600 mt-0.5" />
              <div>
                <span className="font-medium text-blue-800">Owner</span>
                <p className="text-blue-600">Accès complet (client principal)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Client List */}
        {gallery.clientAccess.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Users size={48} className="mx-auto text-[#CFAB8D] mb-4" />
            <h2 className="text-xl font-semibold text-[#6B5B47] mb-2">
              Aucun client
            </h2>
            <p className="text-[#8B7355] mb-6">
              Ajoutez des clients pour leur donner accès à cette galerie
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#CFAB8D] text-white rounded-xl hover:bg-[#B8967A] transition-colors"
            >
              <UserPlus size={20} />
              Ajouter un client
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl divide-y">
            {gallery.clientAccess.map((access) => (
              <div
                key={access.id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-[#CFAB8D] flex items-center justify-center text-white font-bold text-lg">
                    {access.client.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-semibold text-[#6B5B47]">
                      {access.client.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#8B7355]">
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {access.client.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {/* Role Selector */}
                  <select
                    value={access.role}
                    onChange={(e) =>
                      handleChangeRole(
                        access.client.id,
                        e.target.value as "VIEWER" | "COLLABORATOR" | "OWNER"
                      )
                    }
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-[#6B5B47] focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none"
                  >
                    <option value="VIEWER">Viewer</option>
                    <option value="COLLABORATOR">Collaborator</option>
                    <option value="OWNER">Owner</option>
                  </select>

                  {/* Remove */}
                  <button
                    onClick={() => handleRemoveClient(access.client.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Retirer l'accès"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Client Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#6B5B47]">
                  Ajouter un client
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-[#8B7355] hover:text-[#6B5B47] hover:bg-[#ECEEDF] rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Search */}
                <div className="relative mb-4">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un client..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none transition-all"
                  />
                </div>

                {/* Role Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#6B5B47] mb-2">
                    Niveau d&apos;accès
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) =>
                      setSelectedRole(e.target.value as "VIEWER" | "COLLABORATOR" | "OWNER")
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#CFAB8D] focus:ring-2 focus:ring-[#CFAB8D]/20 outline-none"
                  >
                    <option value="VIEWER">Viewer - Peut voir les photos</option>
                    <option value="COLLABORATOR">
                      Collaborator - Peut ajouter favoris/commentaires
                    </option>
                    <option value="OWNER">Owner - Client principal</option>
                  </select>
                </div>

                {/* Client List */}
                <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-xl">
                  {!filteredClients || filteredClients.length === 0 ? (
                    <div className="p-4 text-center text-[#8B7355]">
                      {allClients?.length === 0
                        ? "Aucun client créé"
                        : "Aucun client trouvé"}
                    </div>
                  ) : (
                    filteredClients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => handleAddClient(client.id)}
                        disabled={grantAccess.isPending}
                        className="w-full p-3 flex items-center gap-3 hover:bg-[#ECEEDF] transition-colors border-b last:border-b-0 disabled:opacity-50"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#CFAB8D] flex items-center justify-center text-white font-medium">
                          {client.name.charAt(0)}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-[#6B5B47]">
                            {client.name}
                          </p>
                          <p className="text-sm text-[#8B7355]">
                            {client.email}
                          </p>
                        </div>
                        <UserPlus size={18} className="text-[#CFAB8D]" />
                      </button>
                    ))
                  )}
                </div>

                {/* Create New Client Link */}
                <div className="mt-4 text-center">
                  <Link
                    href="/admin/clients/new"
                    className="text-[#CFAB8D] hover:underline text-sm"
                  >
                    Créer un nouveau client
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
