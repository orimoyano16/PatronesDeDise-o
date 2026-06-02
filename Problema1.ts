// 1. Entidad Básica (Adaptada para Node 24)
export class Order {
    id: string;
    totalAmount: number;

    constructor(id: string, totalAmount: number) {
        this.id = id;
        this.totalAmount = totalAmount;
    }
}

// --- APLICANDO OCP: Interfaces para Envíos y Pagos ---

export interface ShippingMethod {
    calculateCost(): number;
}

export class StandardShipping implements ShippingMethod {
    calculateCost(): number {
        const cost = 10;
        console.log(`Calculando envío para standard: $${cost}`);
        return cost;
    }
}

export class ExpressShipping implements ShippingMethod {
    calculateCost(): number {
        const cost = 25;
        console.log(`Calculando envío para express: $${cost}`);
        return cost;
    }
}

export class DroneShipping implements ShippingMethod {
    calculateCost(): number {
        const cost = 50;
        console.log(`Calculando envío para drones: $${cost}`);
        return cost;
    }
}

export interface PaymentMethod {
    process(amount: number): void;
}

export class PayPalPayment implements PaymentMethod {
    process(amount: number): void {
        console.log(`Procesando pago de $${amount} vía PayPal...`);
    }
}

export class CreditCardPayment implements PaymentMethod {
    process(amount: number): void {
        console.log(`Cargando $${amount} a la tarjeta de crédito...`);
    }
}

// --- APLICANDO SRP: Separación de Responsabilidades ---

export class NotificationService {
    sendOrderConfirmation(orderId: string): void {
        console.log(`Email enviado: Su pedido ${orderId} ha sido procesado.`);
    }
}

export class OrderService {
    notificationService: NotificationService;

    // Constructor adaptado para Node 24
    constructor(notificationService: NotificationService) {
        this.notificationService = notificationService;
    }

    processOrder(order: Order, shipping: ShippingMethod, payment: PaymentMethod): void {
        const shippingCost = shipping.calculateCost();
        const totalToPay = order.totalAmount + shippingCost;

        payment.process(totalToPay);

        this.notificationService.sendOrderConfirmation(order.id);
    }
}

// --- EJEMPLO DE USO ---
/* console.log("=== EJECUCIÓN PROBLEMA 1 ===");
const myOrder = new Order("ORD-001", 100);
const notificationService = new NotificationService();
const orderService = new OrderService(notificationService);

orderService.processOrder(myOrder, new ExpressShipping(), new CreditCardPayment());
console.log("---");
orderService.processOrder(myOrder, new DroneShipping(), new PayPalPayment());
*/