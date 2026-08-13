/**
 * @typedef {Object} EventItem
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} location
 * @property {string} category
 * @property {string} startDateTime - ISO string
 * @property {string} endDateTime - ISO string
 * @property {number} capacity
 * @property {"scheduled"|"completed"|"cancelled"} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Attendee
 * @property {string} id
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 */

/**
 * @typedef {Object} Registration
 * @property {string} id
 * @property {string} eventId
 * @property {string} attendeeId
 * @property {string} registrationDate - ISO string
 * @property {"registered"|"attended"|"no_show"|"cancelled"} attendanceStatus
 */

export {};