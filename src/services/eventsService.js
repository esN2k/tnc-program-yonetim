import { createStore } from "./storage";

const eventsStore = createStore("tnc_events");
const attendeesStore = createStore("tnc_attendees");
const registrationsStore = createStore("tnc_registrations");

export const eventsService = {
  list: () => eventsStore.list().sort((a, b) => a.startDateTime.localeCompare(b.startDateTime)),
  get: eventsStore.get,
  create: eventsStore.create,
  update: eventsStore.update,
  remove: (id) => {
    eventsStore.remove(id);
    registrationsStore.removeWhere((r) => r.eventId === id);
  },
};

export const attendeesService = {
  list: () => attendeesStore.list().sort((a, b) => a.fullName.localeCompare(b.fullName, "tr")),
  get: attendeesStore.get,
  create: attendeesStore.create,
  update: attendeesStore.update,
  remove: (id) => {
    attendeesStore.remove(id);
    registrationsStore.removeWhere((r) => r.attendeeId === id);
  },
};

export const registrationsService = {
  listByEvent: (eventId) => registrationsStore.list().filter((r) => r.eventId === eventId),
  get: registrationsStore.get,
  create: registrationsStore.create,
  update: registrationsStore.update,
  remove: registrationsStore.remove,
};