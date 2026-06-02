Feature: Procesamiento de Órdenes
  Como dueño de la tienda
  Quiero que el sistema calcule correctamente los costos de envío y totales
  Para asegurar que los clientes paguen el monto exacto

  Scenario: Procesar una orden con envío Express
    Given un cliente crea una orden con id "ORD-123" y un subtotal de 100 pesos
    When el sistema procesa la orden usando envío express
    Then el monto final enviado a la pasarela de pago debe ser 125 pesos

  Scenario: Procesar una orden con envío Estándar
    Given un cliente crea una orden con id "ORD-999" y un subtotal de 50 pesos
    When el sistema procesa la orden usando envío estándar
    Then el monto final enviado a la pasarela de pago debe ser 60 pesos