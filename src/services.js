import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent(today) {
        let allUpcomingEvents = this.getEvents().filter(evt => evt.startTime > today)
        allUpcomingEvents.sort(function (a, b) {
            return new Date(a.startTime) - new Date(b.startTime)
        });
        return allUpcomingEvents[0]
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent(today) {
        let allUpcomingEvents = this.getEvents().filter(evt => evt.startTime > today)
        allUpcomingEvents.sort(function (a, b) {
            return new Date(b.startTime) - new Date(a.startTime)
        });
        return allUpcomingEvents[0]
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
        let longestEvent = {}
        this.getEvents().forEach((evt => {
            const diffTime = Math.abs(evt.endTime - evt.startTime);
            const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
            console.log(diffHours)
        }))
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        return null; //TODO
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return null
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }

}