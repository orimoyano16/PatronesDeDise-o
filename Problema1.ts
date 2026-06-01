// 1. Entidad Básica
class Order {
    constructor(public id: string, public totalAmount: number) {}
}

// --- APLICANDO OCP: Interfaces para Envíos y Pagos ---

// Interfaz que define el contrato para cualquier método de envío
interface ShippingMethod {
    calculateCost(): number;
}

class StandardShipping implements ShippingMethod {
    calculateCost(): number {
        const cost = 10;
        console.log(`Calculando envío para standard: $${cost}`);
        return cost;
    }
}

class ExpressShipping implements ShippingMethod {
    calculateCost(): number {
        const cost = 25;
        console.log(`Calculando envío para express: $${cost}`);
        return cost;
    }
}

// ¡NUEVO! Podemos agregar entrega con drones sin modificar el OrderService original
class DroneShipping implements ShippingMethod {
    calculateCost(): number {
        const cost = 50;
        console.log(`Calculando envío para drones: $${cost}`);
        return cost;
    }
}

// Interfaz que define el contrato para cualquier método de pago
interface PaymentMethod {
    process(amount: number): void;
}

class PayPalPayment implements PaymentMethod {
    process(amount: number): void {
        console.log(`Procesando pago de $${amount} vía PayPal...`);
    }
}

class CreditCardPayment implements PaymentMethod {
    process(amount: number): void {
        console.log(`Cargando $${amount} a la tarjeta de crédito...`);
    }
}

// --- APLICANDO SRP: Separación de Responsabilidades ---

// Clase dedicada exclusivamente a las notificaciones
class NotificationService {
    sendOrderConfirmation(orderId: string): void {
        console.log(`Email enviado: Su pedido ${orderId} ha sido procesado.`);
    }
}

// El OrderService ahora solo coordina, no implementa la lógica de negocio profunda
class OrderService {
    // Inyectamos el servicio de notificaciones
    constructor(private notificationService: NotificationService) {}

    // Inyectamos las abstracciones (interfaces), no las implementaciones concretas
    processOrder(order: Order, shipping: ShippingMethod, payment: PaymentMethod): void {
        
        // 1. Delegamos el cálculo del envío
        const shippingCost = shipping.calculateCost();
        const totalToPay = order.totalAmount + shippingCost;

        // 2. Delegamos el procesamiento del pago
        payment.process(totalToPay);

        // 3. Delegamos el envío de la notificación
        this.notificationService.sendOrderConfirmation(order.id);
    }
}

// --- EJEMPLO DE USO ---

const myOrder = new Order("ORD-001", 100);
const notificationService = new NotificationService();
const orderService = new OrderService(notificationService);

// Ejecución con métodos actuales
orderService.processOrder(
    myOrder, 
    new ExpressShipping(), 
    new CreditCardPayment()
);

console.log("--------------------------------------------------");

// Ejecución con el nuevo método de Drones sin haber tocado OrderService
orderService.processOrder(
    myOrder, 
    new DroneShipping(), 
    new PayPalPayment()
);