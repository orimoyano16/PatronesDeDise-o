import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'node:assert';

// Importamos las interfaces y el procesador de tu Problema 2
import { Openable, Editable, Savable, DocumentProcessor } from '../../Problema2';

// Creamos espías para rastrear el comportamiento
class WordEspia implements Openable, Editable, Savable {
    fueAbierto = false;
    fueEditado = false;
    fueGuardado = false;

    open() { this.fueAbierto = true; }
    edit() { this.fueEditado = true; }
    save() { this.fueGuardado = true; }
}

class PDFEspia implements Openable {
    fueAbierto = false;

    open() { this.fueAbierto = true; }
}

let procesador: DocumentProcessor;
let miWord: WordEspia;
let miPdf: PDFEspia;

Given('tengo un documento Word listo para procesar', function () {
    procesador = new DocumentProcessor();
    miWord = new WordEspia();
});

When('el procesador lee y edita el documento', function () {
    procesador.readDocument(miWord);
    procesador.processEditableDocument(miWord);
});

Then('el documento debe registrarse como abierto, editado y guardado', function () {
    assert.strictEqual(miWord.fueAbierto, true, 'El Word no fue abierto');
    assert.strictEqual(miWord.fueEditado, true, 'El Word no fue editado');
    assert.strictEqual(miWord.fueGuardado, true, 'El Word no fue guardado');
});

Given('tengo un documento PDF de solo lectura', function () {
    procesador = new DocumentProcessor();
    miPdf = new PDFEspia();
});

When('el procesador lee el documento', function () {
    procesador.readDocument(miPdf);
});

Then('el documento debe registrarse solo como abierto', function () {
    assert.strictEqual(miPdf.fueAbierto, true, 'El PDF no fue abierto');
    // Como el PDF no implementa Editable/Savable, es imposible pasarlo a processEditableDocument.
    // Esto demuestra que el principio LSP e ISP funciona a nivel de compilación.
});