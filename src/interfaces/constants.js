// Sabit değerler ve etiket eşlemeleri (Türkçe UI için)

export const EVENT_STATUS = {
  SCHEDULED: "scheduled",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const EVENT_STATUS_LABELS = {
  [EVENT_STATUS.SCHEDULED]: "Planlandı",
  [EVENT_STATUS.COMPLETED]: "Tamamlandı",
  [EVENT_STATUS.CANCELLED]: "İptal Edildi",
};

export const ATTENDANCE_STATUS = {
  REGISTERED: "registered",
  ATTENDED: "attended",
  NO_SHOW: "no_show",
  CANCELLED: "cancelled",
};

export const ATTENDANCE_STATUS_LABELS = {
  [ATTENDANCE_STATUS.REGISTERED]: "Kayıtlı",
  [ATTENDANCE_STATUS.ATTENDED]: "Katıldı",
  [ATTENDANCE_STATUS.NO_SHOW]: "Gelmedi",
  [ATTENDANCE_STATUS.CANCELLED]: "İptal",
};

export const EVENT_CATEGORIES = [
  "Eğitim",
  "Proje Sunumu",
  "Oryantasyon",
  "Mülakat",
  "Sosyal Etkinlik",
];