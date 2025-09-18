const CockpitSettings = {
  get(key, fallback = null) {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  toggle(key) {
    const current = CockpitSettings.get(key, false);
    CockpitSettings.set(key, !current);
  }
};
