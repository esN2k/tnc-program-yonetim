// İlk açılışta boş görünmemesi için örnek veri (TNC/Social Office programına referans).
import { eventsService, attendeesService, registrationsService } from "./eventsService";
import { EVENT_STATUS, ATTENDANCE_STATUS } from "../interfaces/constants";

const SEED_FLAG = "tnc_seeded_v1";

export function seedIfEmpty() {
  if (localStorage.getItem(SEED_FLAG)) return;
  if (eventsService.list().length > 0) {
    localStorage.setItem(SEED_FLAG, "1");
    return;
  }

  const alice = attendeesService.create({
    fullName: "Doğukan Balaman",
    email: "dogukan@example.com",
    phone: "0555 000 00 01",
  });
  const bob = attendeesService.create({
    fullName: "Ayşe Yılmaz",
    email: "ayse@example.com",
    phone: "0555 000 00 02",
  });
  const cem = attendeesService.create({
    fullName: "Cem Demir",
    email: "cem@example.com",
    phone: "0555 000 00 03",
  });

  const orientation = eventsService.create({
    title: "Tanışma ve Portfolyo Oryantasyon Toplantısı",
    description: "Program kuralları, portfolyo süreci ve beklentiler hakkında bilgilendirme.",
    location: "Google Meet",
    category: "Oryantasyon",
    startDateTime: "2026-07-17T16:00",
    endDateTime: "2026-07-17T17:30",
    capacity: 150,
    status: EVENT_STATUS.COMPLETED,
  });

  const python = eventsService.create({
    title: "Basitleştirilmiş Python Eğitimi",
    description: "5 günlük Python temelleri ve uçtan uca mini proje eğitimi.",
    location: "Google Meet",
    category: "Eğitim",
    startDateTime: "2026-07-20T20:00",
    endDateTime: "2026-07-24T22:00",
    capacity: 80,
    status: EVENT_STATUS.COMPLETED,
  });

  const projectMeeting = eventsService.create({
    title: "Proje & Uluslararası Program Oryantasyon Toplantısı",
    description: "Proje teslim süreci ve Belgrad programı hakkında detaylı bilgilendirme.",
    location: "Google Meet",
    category: "Proje Sunumu",
    startDateTime: "2026-08-11T18:00",
    endDateTime: "2026-08-11T19:00",
    capacity: 60,
    status: EVENT_STATUS.SCHEDULED,
  });

  registrationsService.create({
    eventId: orientation.id,
    attendeeId: alice.id,
    registrationDate: "2026-07-15T10:00",
    attendanceStatus: ATTENDANCE_STATUS.ATTENDED,
  });
  registrationsService.create({
    eventId: orientation.id,
    attendeeId: bob.id,
    registrationDate: "2026-07-15T11:00",
    attendanceStatus: ATTENDANCE_STATUS.ATTENDED,
  });
  registrationsService.create({
    eventId: python.id,
    attendeeId: alice.id,
    registrationDate: "2026-07-18T09:00",
    attendanceStatus: ATTENDANCE_STATUS.ATTENDED,
  });
  registrationsService.create({
    eventId: python.id,
    attendeeId: cem.id,
    registrationDate: "2026-07-18T09:30",
    attendanceStatus: ATTENDANCE_STATUS.NO_SHOW,
  });
  registrationsService.create({
    eventId: projectMeeting.id,
    attendeeId: alice.id,
    registrationDate: "2026-08-09T12:00",
    attendanceStatus: ATTENDANCE_STATUS.REGISTERED,
  });

  localStorage.setItem(SEED_FLAG, "1");
}