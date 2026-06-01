// --- APLICANDO DIP: Abstracción compartida ---
interface SwitchableDevice {
    turnOn(): void;
    turnOff(): void;
}

// Los dispositivos de bajo nivel dependen de la abstracción
class TraditionalBulb implements SwitchableDevice {
    turnOn() { console.log("Bombilla tradicional encendida... consumiendo mucha energía."); }
    turnOff() { console.log("Bombilla tradicional apagada."); }
}

class SmartLight implements SwitchableDevice {
    turnOn() { console.log("Luz inteligente encendida en color blanco frío."); }
    turnOff() { console.log("Luz inteligente apagada suavemente."); }
}

// El módulo de alto nivel (Switch) ahora depende de la abstracción, no de la implementación concreta
class Switch {
    device: SwitchableDevice;

    // Inyección de dependencias a través del constructor (Adaptado para Node 24)
    constructor(device: SwitchableDevice) {
        this.device = device;
    }

    operate(action: string) {
        if (action === "on") {
            this.device.turnOn();
        } else if (action === "off") {
            this.device.turnOff();
        } else {
            console.log("Acción no reconocida.");
        }
    }
}

// --- EJEMPLO DE USO ---
console.log("\n=== EJECUCIÓN PROBLEMA 3 ===");

const myBulb = new TraditionalBulb();
const livingRoomSwitch = new Switch(myBulb);
console.log("Interruptor de la Sala:");
livingRoomSwitch.operate("on");
livingRoomSwitch.operate("off");

console.log("\nInterruptor de la Habitación:");
const mySmartLight = new SmartLight();
const bedroomSwitch = new Switch(mySmartLight);
bedroomSwitch.operate("on");
bedroomSwitch.operate("off");