import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";

jest.mock("../src/repository");


describe("Event Service", () => {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => fakeEvents.slice()
            }
        });
    });

    let fakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'), new Date('2019-12-17T13:24:00'), "Hello World", "Campus Numerique", "This is an hello world.."),
        new Event(new Date('2018-12-17T03:24:00'), new Date('1995-12-17T03:24:00'), "First event", "Campus Numerique", "This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'), new Date('2020-04-01T17:00:00'), "Unit test againt", "Campus Numerique", "This is an hello world.."),
        new Event(new Date('2023-04-01T09:00:00'), new Date('2023-05-01T17:00:00'), "EVENT A VENIR", "France", "Bientôt!.."),
        new Event(new Date('2024-04-01T09:00:00'), new Date('2025-05-01T17:00:00'), "EVENT A VENIR", "France", "Bientôt!.."),
        new Event(new Date('2022-04-01T09:00:00'), new Date('2023-05-01T17:00:00'), "EVENT A VENIR", "France", "Bientôt!.."),
        new Event(new Date('2022-01-01T09:00:00'), new Date('2022-06-01T17:00:00'), "EVENT", "France", "Bientôt!..")
    ];

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 4 result', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(7);
    })

    test('getFirstEvent shall return first upcomming event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent(
            new Date()
        )).toStrictEqual(fakeEvents[5])
    })

    test('getFirstEvent shall return undefined if there is none', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent(
            Date.now = jest.fn(() => Date.parse('2025-02-14'))
        )).toStrictEqual(undefined)
    })

    test('getLastEvent shall return last upcomming event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent(
           new Date()
        )).toStrictEqual(fakeEvents[4])
    })

    // test('getLongest shall return longest event', async () => {
    //     let eventService = new EventService(new EventRepository());
    //     expect(eventService.getLongestEvent()).toStrictEqual(fakeEvents[4])
    // })
});