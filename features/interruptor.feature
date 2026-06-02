Feature: Control de Dispositivos con Interruptor
  Como usuario de una casa inteligente
  Quiero que mi interruptor funcione con cualquier tipo de dispositivo
  Para no tener que cambiar el interruptor cuando compro bombillas nuevas

  Scenario: Encender y apagar una bombilla tradicional
    Given instalo un interruptor conectado a una bombilla tradicional
    When presiono el interruptor en "on" y luego en "off"
    Then la bombilla debe registrar el ciclo de encendido y apagado

  Scenario: Encender y apagar una luz inteligente
    Given instalo un interruptor conectado a una luz inteligente
    When presiono el interruptor en "on" y luego en "off"
    Then la luz inteligente debe registrar el ciclo de encendido y apagado