// Definir un objeto EventEmitter personalizado
import { useCounterStore } from "../../store/events.store";
export default class EventEmitter {
    constructor() {
        window.eventsNoificarions ||= {};
    }
    on(event, callback) {
        
        window.eventsNoificarions[event] ||= []
        window.eventsNoificarions[event].push(callback);
    }
    emit(event, data) {
        console.log(event, data);
        const eventListeners = window.eventsNoificarions[event];
        console.log(eventListeners, data);
        if (eventListeners) {
            eventListeners.forEach(callback => {
                callback(data);
            });
        }
    }
}
