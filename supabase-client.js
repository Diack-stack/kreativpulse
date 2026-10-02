/**
 * KREATIV'PULSE — CLIENT SUPABASE POSTGRESQL (supabase-client.js)
 * Architecture Jamstack Haute Performance & Zero-Bundle Overhead
 * Utilise l'API native PostgREST de Supabase (0 dépendance externe)
 * Synchronisation automatique bidirectionnelle avec LocalStorage en fallback
 */

(function (window) {
  'use strict';

  const SUPABASE_CONFIG = {
    url: 'https://rknazaqjvlwxbdactggf.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrbmF6YXFqdmx3eGJkYWN0Z2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5Mzc0NjQsImV4cCI6MjEwNjUxMzQ2NH0.8BHHHevvYQjzwv-cTufZ7ujj10wyZTf5NhkjMRROfMw',
    storageKeyLeads: 'kp_leads',
    storageKeyProjects: 'kp_custom_projects'
  };

  const headers = {
    'apikey': SUPABASE_CONFIG.anonKey,
    'Authorization': 'Bearer ' + SUPABASE_CONFIG.anonKey,
    'Content-Type': 'application/json'
  };

  const KreativDB = {
    config: SUPABASE_CONFIG,
    isConnected: true,

    /**
     * Enregistrer un Lead (Devis, Brief Studio, Contact)
     * Envoi asynchrone à Supabase + persistance immédiate dans LocalStorage
     */
    async saveLead(leadData) {
      const now = new Date().toISOString();
      const localId = 'lead-' + Date.now();

      // 1. Sauvegarde immédiate dans LocalStorage (zéro latence UI)
      try {
        const stored = localStorage.getItem(SUPABASE_CONFIG.storageKeyLeads);
        const leads = stored ? JSON.parse(stored) : [];
        const localEntry = {
          id: localId,
          created_at: now,
          status: 'nouveau',
          ...leadData
        };
        leads.unshift(localEntry);
        localStorage.setItem(SUPABASE_CONFIG.storageKeyLeads, JSON.stringify(leads));
      } catch (err) {
        console.warn('[KreativDB] Erreur écriture locale:', err);
      }

      // 2. Envoi asynchrone dans Supabase PostgreSQL
      const payload = {
        type: leadData.type || 'brief',
        name: leadData.name || 'Prospect Anonyme',
        email: leadData.email || 'non-specifie@kreativpulse.net',
        phone: leadData.phone || leadData.whatsapp || null,
        company: leadData.company || null,
        services: Array.isArray(leadData.services) ? leadData.services : (leadData.poles ? leadData.poles : (leadData.service ? [leadData.service] : [])),
        budget: leadData.budget || null,
        timeline: leadData.timeline || leadData.delay || null,
        message: leadData.message || (leadData.summary ? leadData.summary : null),
        items: leadData.items ? leadData.items : (leadData.cart ? leadData.cart : null),
        status: 'nouveau',
        source_page: leadData.source || window.location.pathname
      };

      try {
        const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/kp_leads`, {
          method: 'POST',
          headers: {
            ...headers,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const inserted = await res.json();
          // Mettre à jour l'ID local avec l'UUID Supabase
          if (Array.isArray(inserted) && inserted[0] && inserted[0].id) {
            try {
              const stored = localStorage.getItem(SUPABASE_CONFIG.storageKeyLeads);
              if (stored) {
                const list = JSON.parse(stored);
                const target = list.find(l => l.id === localId);
                if (target) target.supabase_id = inserted[0].id;
                localStorage.setItem(SUPABASE_CONFIG.storageKeyLeads, JSON.stringify(list));
              }
            } catch (e) {}
          }
          return { success: true, data: inserted[0] };
        } else {
          console.warn('[KreativDB] Erreur HTTP Supabase:', res.status);
        }
      } catch (networkErr) {
        console.warn('[KreativDB] Réseau indisponible, conservé en local:', networkErr);
      }

      return { success: true, localOnly: true };
    },

    /**
     * Récupérer tous les leads (avec fusion intelligente Supabase + LocalStorage)
     */
    async getLeads() {
      try {
        const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/kp_leads?order=created_at.desc`, {
          method: 'GET',
          headers: headers
        });

        if (res.ok) {
          const remoteLeads = await res.json();
          if (Array.isArray(remoteLeads) && remoteLeads.length > 0) {
            // Normaliser pour l'affichage de l'Admin
            const normalized = remoteLeads.map(r => ({
              id: r.id,
              date: r.created_at,
              status: r.status || 'nouveau',
              type: r.type,
              name: r.name,
              email: r.email,
              phone: r.phone,
              company: r.company,
              services: r.services,
              budget: r.budget,
              timeline: r.timeline,
              message: r.message,
              items: r.items,
              source: r.source_page
            }));
            // Mettre à jour le cache local
            localStorage.setItem(SUPABASE_CONFIG.storageKeyLeads, JSON.stringify(normalized));
            return normalized;
          }
        }
      } catch (err) {
        console.warn('[KreativDB] Connexion Supabase impossible, bascule LocalStorage:', err);
      }

      // Fallback LocalStorage
      try {
        const stored = localStorage.getItem(SUPABASE_CONFIG.storageKeyLeads);
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    },

    /**
     * Mettre à jour le statut d'un lead (nouveau -> en_cours -> traite)
     */
    async updateLeadStatus(id, newStatus) {
      // 1. Mise à jour locale
      try {
        const stored = localStorage.getItem(SUPABASE_CONFIG.storageKeyLeads);
        if (stored) {
          const list = JSON.parse(stored);
          const item = list.find(l => l.id === id || l.supabase_id === id);
          if (item) {
            item.status = newStatus;
            localStorage.setItem(SUPABASE_CONFIG.storageKeyLeads, JSON.stringify(list));
          }
        }
      } catch (e) {}

      // 2. Mise à jour Supabase si ID UUID valide
      if (id && id.includes('-') && !id.startsWith('lead-')) {
        try {
          await fetch(`${SUPABASE_CONFIG.url}/rest/v1/kp_leads?id=eq.${id}`, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify({ status: newStatus })
          });
        } catch (e) {
          console.warn('[KreativDB] Erreur mise à jour statut distant:', e);
        }
      }
    },

    /**
     * Supprimer un lead
     */
    async deleteLead(id) {
      // 1. Suppression locale
      try {
        const stored = localStorage.getItem(SUPABASE_CONFIG.storageKeyLeads);
        if (stored) {
          const list = JSON.parse(stored).filter(l => l.id !== id && l.supabase_id !== id);
          localStorage.setItem(SUPABASE_CONFIG.storageKeyLeads, JSON.stringify(list));
        }
      } catch (e) {}

      // 2. Suppression Supabase
      if (id && id.includes('-') && !id.startsWith('lead-')) {
        try {
          await fetch(`${SUPABASE_CONFIG.url}/rest/v1/kp_leads?id=eq.${id}`, {
            method: 'DELETE',
            headers: headers
          });
        } catch (e) {
          console.warn('[KreativDB] Erreur suppression distante:', e);
        }
      }
    },

    /**
     * Enregistrer ou mettre à jour un projet dans Supabase kp_projects
     */
    async saveProject(proj) {
      const payload = {
        title: proj.title || 'Projet Kreativ Pulse',
        category: proj.category || 'digital',
        client: proj.client || "Kreativ'Pulse Studio",
        year: proj.year || String(new Date().getFullYear()),
        description: proj.desc || proj.tagline || '',
        image_url: proj.cover || 'assets/portfolio/sentrak.png',
        gallery_urls: Array.isArray(proj.images) && proj.images.length > 0 ? proj.images : [proj.cover || 'assets/portfolio/sentrak.png']
      };

      try {
        // 1. Vérifier si un projet avec ce titre existe déjà pour faire une mise à jour
        const checkRes = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/kp_projects?title=eq.${encodeURIComponent(payload.title)}&select=id`, {
          method: 'GET',
          headers: headers
        });

        if (checkRes.ok) {
          const existing = await checkRes.json();
          if (Array.isArray(existing) && existing.length > 0) {
            const updateId = existing[0].id;
            const updateRes = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/kp_projects?id=eq.${updateId}`, {
              method: 'PATCH',
              headers: {
                ...headers,
                'Prefer': 'return=representation'
              },
              body: JSON.stringify(payload)
            });
            if (updateRes.ok) {
              const updated = await updateRes.json();
              return { success: true, data: updated[0] };
            }
          }
        }

        // 2. Sinon nouvel enregistrement
        const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/kp_projects`, {
          method: 'POST',
          headers: {
            ...headers,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const inserted = await res.json();
          return { success: true, data: inserted[0] };
        }
      } catch (err) {
        console.warn('[KreativDB] Erreur enregistrement projet distant:', err);
      }
      return { success: true, localOnly: true };
    },

    /**
     * Supprimer un projet dans Supabase kp_projects
     */
    async deleteProject(idOrTitle) {
      if (!idOrTitle) return { success: false };
      try {
        let url = `${SUPABASE_CONFIG.url}/rest/v1/kp_projects?id=eq.${encodeURIComponent(idOrTitle)}`;
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(idOrTitle))) {
          url = `${SUPABASE_CONFIG.url}/rest/v1/kp_projects?title=eq.${encodeURIComponent(String(idOrTitle))}`;
        }
        const res = await fetch(url, {
          method: 'DELETE',
          headers: headers
        });
        return { success: res.ok };
      } catch (err) {
        console.warn('[KreativDB] Erreur suppression projet distant:', err);
        return { success: false, error: err };
      }
    },

    /**
     * Récupérer les projets depuis Supabase
     */
    async getProjects() {
      try {
        const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/kp_projects?order=created_at.desc`, {
          method: 'GET',
          headers: headers
        });
        if (res.ok) {
          return await res.json();
        }
      } catch (err) {}
      return [];
    },

    /**
     * Test de santé / statut de connexion
     */
    async checkHealth() {
      try {
        const t0 = performance.now();
        const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/kp_leads?select=id&limit=1`, {
          method: 'GET',
          headers: headers
        });
        const latency = Math.round(performance.now() - t0);
        return {
          connected: res.ok,
          latency: latency + ' ms',
          url: SUPABASE_CONFIG.url
        };
      } catch (e) {
        return { connected: false, error: e.message };
      }
    }
  };

  // Exposer dans la portée globale
  window.KreativDB = KreativDB;

})(window);
