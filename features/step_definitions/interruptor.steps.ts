import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'node:assert';

// Importamos la abstracción y el Switch del Problema 3
import { SwitchableDevice, Switch } from '../../Problema3';

// Creamos un dispositivo espía genérico que cumpla con el contrato
class DispositivoEspia implements SwitchableDevice {
    estado: 'encendido' | 'apagado' | 'desconocido' = 'desconocido';
    ciclosCompletados = 0;

    turnOn() {
        this.estado = 'encendido';
    }
    turnOff() {
        if (this.estado === 'encendido') {
            this.ciclosCompletados++;
        }
        this.estado = 'apagado';
    }
}

let interruptor: Switch;
let bombillaPrueba: DispositivoEspia;
let luzInteligentePrueba: DispositivoEspia;

Given('instalo un interruptor conectado a una bombilla tradicional', function () {
    bombillaPrueba = new DispositivoEspia();
    interruptor = new Switch(bombillaPrueba);
});

Given('instalo un interruptor conectado a una luz inteligente', function () {
    luzInteligentePrueba = new DispositivoEspia();
    interruptor = new Switch(luzInteligentePrueba);
});

When('presiono el interruptor en "on" y luego en "off"', function () {
    interruptor.operate("on");
    interruptor.operate("off");
});

Then('la bombilla debe registrar el ciclo de encendido y apagado', function () {
    assert.strictEqual(bombillaPrueba.estado, 'apagado');
    assert.strictEqual(bombillaPrueba.ciclosCompletados, 1);
});

Then('la luz inteligente debe registrar el ciclo de encendido y apagado', function () {
    assert.strictEqual(luzInteligentePrueba.estado, 'apagado');
    assert.strictEqual(luzInteligentePrueba.ciclosCompletados, 1);
});