# _Patrones de Diseño_

## _Integrantes: Roman Acuña, Santiago Marranti, Oriana Moyano, Ariadna Santillan_


## Problema 1: El Sistema de Envíos Todopoderoso
Principios a aplicar: Single Responsibility Principle (SRP) y Open/Closed Principle (OCP).
El Escenario
Tienes una clase OrderService que se encarga de procesar un pedido. El problema es que hace de todo: calcula el envío, procesa el pago y envía notificaciones. Además, si mañana queremos agregar un nuevo método de envío (como "Entrega con Drones"), tendríamos que modificar la clase existente.
Código Acoplado (A refactorizar)
TypeScript


class Order {
    constructor(public id: string, public totalAmount: number) {}
}

class OrderService {
    processOrder(order: Order, shippingMethod: string, paymentType: string) {
        // 1. Calcular envío
        let shippingCost = 0;
        if (shippingMethod === "standard") {
            shippingCost = 10;
        } else if (shippingMethod === "express") {
            shippingCost = 25;
        }
        console.log(`Calculando envío para ${shippingMethod}: $${shippingCost}`);

        // 2. Procesar Pago
        if (paymentType === "paypal") {
            console.log(`Procesando pago de $${order.totalAmount + shippingCost} vía PayPal...`);
        } else if (paymentType === "credit_card") {
            console.log(`Cargando $${order.totalAmount + shippingCost} a la tarjeta de crédito...`);
        }

        // 3. Enviar Notificación
        console.log(`Email enviado: Su pedido ${order.id} ha sido procesado.`);
    }
}

Tu Reto
Separa las responsabilidades en clases independientes (SRP).
Haz que el sistema de envíos y el de pagos sean extensibles sin modificar el código existente, utilizando interfaces o clases abstractas (OCP).

## Problema 2: El Procesador de Documentos Rebelde
Principios a aplicar: Liskov Substitution Principle (LSP) y Interface Segregation Principle (ISP).
El Escenario
Estamos construyendo un sistema de gestión de archivos. Creamos una interfaz general DocumentHandler para todos los documentos. El problema surge cuando agregamos un archivo de tipo ReadonlyDocument (como un PDF protegido); este tipo de documento no puede ser editado ni guardado, lo que obliga a lanzar errores inesperados que rompen el programa.
Código Acoplado (A refactorizar)
TypeScript
interface DocumentHandler {
    open(): void;
    edit(): void;
    save(): void;
}

class WordDocument implements DocumentHandler {
    open() { console.log("Abriendo documento Word..."); }
    edit() { console.log("Editando texto..."); }
    save() { console.log("Guardando cambios en disco..."); }
}

class PDFDocument implements DocumentHandler {
    open() { console.log("Abriendo PDF protegido..."); }
    
    edit() {
        // ¡Violación de LSP! Este objeto no puede hacer lo que la interfaz promete
        throw new Error("Error: No se puede editar un PDF protegido.");
    }
    
    save() {
        // Otra violación
        throw new Error("Error: No se puede guardar un PDF protegido.");
    }
}

// Un cliente que confía en la interfaz se romperá aquí
激活Procesador(doc: DocumentHandler) {
    doc.open();
    doc.edit(); // ¡Crash si es un PDF!
    doc.save();
}

Tu Reto
Divide la interfaz DocumentHandler en interfaces más pequeñas y específicas para que las clases no dependan de métodos que no usan (ISP).
Asegúrate de que cualquier subclase o implementación pueda sustituir a su firma base sin romper el programa (LSP).

## Problema 3: El Interruptor Rígido
Principio a aplicar: Dependency Inversion Principle (DIP).
El Escenario
Tienes un sistema de automatización para el hogar. La clase Switch (Interruptor) está fuertemente acoplada a una clase concreta TraditionalBulb (Bombilla tradicional). Si mañana decides cambiar la bombilla por una SmartLight o un Fan (Ventilador), tendrías que reescribir la clase Switch. Los módulos de alto nivel no deben depender de los de bajo nivel; ambos deben depender de abstracciones.
Código Acoplado (A refactorizar)
TypeScript
class TraditionalBulb {
    turnOn() { console.log("Bombilla tradicional encendida... consumiendo mucha energía."); }
    turnOff() { console.log("Bombilla tradicional apagada."); }
}

class Switch {
    private bulb: TraditionalBulb;

    constructor() {
        // Alto acoplamiento: Instanciación directa dentro de la clase
        this.bulb = new TraditionalBulb(); 
    }

    operate(action: string) {
        if (action === "on") {
            this.bulb.turnOn();
        } else {
            this.bulb.turnOff();
        }
    }
}

Tu Reto
Crea una abstracción (interface) que defina el comportamiento de cualquier dispositivo que se pueda encender/apagar.
Aplica Inyección de Dependencias para que el Switch reciba el dispositivo desde el exterior, logrando que dependa de la abstracción y no de la implementación concreta (DIP).

