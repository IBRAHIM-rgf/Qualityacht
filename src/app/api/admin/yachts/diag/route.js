// src/app/api/admin/yachts/diag/route.js - Diagnostic Ankor (admin uniquement)
//
// Pourquoi : l'admin ne voit que ~185 yachts alors que le compte Ankor en
// donne acces a ~1 950. Cette route interroge `website/search` de plusieurs
// facons et renvoie UNIQUEMENT des comptages et la forme de la reponse (pas
// les donnees des bateaux) pour savoir si l'API pagine, et comment.
//
// Temporaire : a retirer une fois la cause identifiee.

import { NextResponse } from 'next/server';
import { guardAdminRoute } from '@/lib/adminAuth';

const BASE = 'https://api.ankor.io';

async function probe(token, query) {
  const url = `${BASE}/website/search${query ? '?' + query : ''}`;
  const t0 = Date.now();
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
    const ms = Date.now() - t0;
    const text = await res.text();
    let data = null;
    try { data = JSON.parse(text); } catch { /* non JSON */ }
    if (!data || typeof data !== 'object') {
      return { query, status: res.status, ms, note: 'reponse non JSON', head: text.slice(0, 200) };
    }
    const hits = Array.isArray(data.hits) ? data.hits : null;
    const meta = {};
    for (const [k, v] of Object.entries(data)) {
      if (k === 'hits') continue;
      meta[k] = (typeof v === 'object' && v !== null) ? `[${Array.isArray(v) ? 'array' : 'object'}:${JSON.stringify(v).slice(0, 120)}]` : v;
    }
    return {
      query,
      status: res.status,
      ms,
      hitsCount: hits ? hits.length : null,
      firstHitUri: hits && hits[0] ? hits[0].uri : null,
      lastHitUri: hits && hits.length ? hits[hits.length - 1].uri : null,
      hitKeys: hits && hits[0] ? Object.keys(hits[0]) : null,
      responseKeys: Object.keys(data),
      meta,
      responseBytes: text.length,
    };
  } catch (e) {
    return { query, error: String(e && e.message || e) };
  }
}

export async function GET(request) {
  const denied = guardAdminRoute(request);
  if (denied) return denied;

  try {
    const { fetchAnkorBearerToken } = await import('@/lib/utils');
    const token = await fetchAnkorBearerToken();

    // 1. Appel tel que fait par le site (sans filtre).
    const base = await probe(token, '');
    // 2. Tentatives de pagination courantes.
    const tries = await Promise.all([
      probe(token, 'page=2'),
      probe(token, 'page=1&pageSize=500'),
      probe(token, 'size=500'),
      probe(token, 'limit=500'),
      probe(token, 'offset=185'),
      probe(token, 'from=185'),
      probe(token, 'hitsPerPage=500'),
    ]);
    // 3. Un filtre region pour comparer.
    const caribbean = await probe(token, 'region=Caribbean');

    // 4. L'autre endpoint (liste d'entites), si accessible.
    let vesselList = null;
    try {
      const res = await fetch(`${BASE}/entity/vessel/list`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
      const text = await res.text();
      let data = null; try { data = JSON.parse(text); } catch {}
      vesselList = { status: res.status, keys: data && typeof data === 'object' ? Object.keys(data) : null, hitsCount: data && Array.isArray(data.hits) ? data.hits.length : null, head: data ? undefined : text.slice(0, 200) };
    } catch (e) { vesselList = { error: String(e && e.message || e) }; }

    return NextResponse.json({ base, paginationTries: tries, caribbean, vesselList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error && error.message || error) }, { status: 500 });
  }
}
