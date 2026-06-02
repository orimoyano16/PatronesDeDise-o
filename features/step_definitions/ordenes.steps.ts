import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'node:assert';

// Importamos nuestro código de producción
import { 
    Order, 
    OrderService, 
    ExpressShipping, 
    StandardShipping, 
    NotificationService, 
    PaymentMethod 
} from '../../Problema1';

// ¡EL PODER DE SOLID! 
// Creamos un pago de mentira solo para el test que implementa nuestra interfaz.
// En lugar de cobrar de verdad, solo anota cuánto le pidieron cobrar.
class PagoEspia implements PaymentMethod {
    montoCobrado: number = 0;
    
    process(amount: number): void {
        this.montoCobrado = amount; // Guardamos el valor para revisarlo en el 'Then'
    }
}

// Variables compartidas entre los pasos
let orden: Order;
let servicioOrden: OrderService;
let pagoEspia: PagoEspia;

Given('un cliente crea una orden con id {string} y un subtotal de {int} pesos', function (idOrden: string, subtotal: number) {
    orden = new Order(idOrden, subtotal);
    pagoEspia = new PagoEspia();
    
    // Inyectamos las dependencias
    const notificacion = new NotificationService();
    servicioOrden = new OrderService(notificacion);
});

When('el sistema procesa la orden usando envío express', function () {
    servicioOrden.processOrder(orden, new ExpressShipping(), pagoEspia);
});

When('el sistema procesa la orden usando envío estándar', function () {
    servicioOrden.processOrder(orden, new StandardShipping(), pagoEspia);
});

Then('el monto final enviado a la pasarela de pago debe ser {int} pesos', function (montoEsperado: number) {
    // Verificamos que el pago espía haya recibido la suma correcta (Subtotal + Costo de Envío)
    assert.strictEqual(
        pagoEspia.montoCobrado, 
        montoEsperado, 
        `Se esperaba cobrar ${montoEsperado} pero se intentó cobrar ${pagoEspia.montoCobrado}`
    );
});