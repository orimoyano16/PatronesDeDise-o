Feature: Procesamiento de Documentos Seguros
  Como usuario del sistema
  Quiero que el procesador diferencie entre documentos editables y de solo lectura
  Para evitar que el programa colapse al intentar editar un PDF

  Scenario: Procesar un documento Word editable
    Given tengo un documento Word listo para procesar
    When el procesador lee y edita el documento
    Then el documento debe registrarse como abierto, editado y guardado

  Scenario: Procesar un documento PDF de solo lectura
    Given tengo un documento PDF de solo lectura
    When el procesador lee el documento
    Then el documento debe registrarse solo como abierto