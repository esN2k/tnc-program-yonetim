// Jenerik localStorage tabanlı depolama yardımcıları.
// Gerçek bir REST API'ye geçiş kolay olsun diye CRUD imzaları
// (list/get/create/update/remove) API çağrılarıyla aynı şekilde tutuldu.

const read = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const write = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

const genId = () =>
  crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const createStore = (key) => ({
  list: () => read(key),

  get: (id) => read(key).find((item) => item.id === id) ?? null,

  create: (data) => {
    const now = new Date().toISOString();
    const item = { id: genId(), ...data, createdAt: now, updatedAt: now };
    write(key, [...read(key), item]);
    return item;
  },

  update: (id, patch) => {
    const items = read(key);
    let updated = null;
    const next = items.map((item) => {
      if (item.id !== id) return item;
      updated = { ...item, ...patch, updatedAt: new Date().toISOString() };
      return updated;
    });
    write(key, next);
    return updated;
  },

  remove: (id) => {
    write(key, read(key).filter((item) => item.id !== id));
  },

  removeWhere: (predicate) => {
    write(key, read(key).filter((item) => !predicate(item)));
  },
});