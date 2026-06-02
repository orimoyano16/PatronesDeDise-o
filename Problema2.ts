// --- APLICANDO ISP: Interfaces segregadas ---
export interface Openable {
    open(): void;
}

export interface Editable {
    edit(): void;
}

export interface Savable {
    save(): void;
}

// WordDocument implementa todas porque soporta todas las operaciones
export class WordDocument implements Openable, Editable, Savable {
    open() { console.log("Abriendo documento Word..."); }
    edit() { console.log("Editando texto en Word..."); }
    save() { console.log("Guardando cambios del Word en disco..."); }
}

// PDFDocument ahora solo implementa lo que realmente puede hacer (Openable)
export class PDFDocument implements Openable {
    open() { console.log("Abriendo PDF protegido (Solo lectura)..."); }
}

// --- APLICANDO LSP: El procesador interactúa de forma segura ---
export class DocumentProcessor {
    
    // Solo pide garantía de que el documento se puede abrir
    readDocument(doc: Openable) {
        doc.open();
    }

    // Pide garantía de que el documento cumple ambos contratos antes de operar
    processEditableDocument(doc: Editable & Savable) {
        doc.edit();
        doc.save();
    }
}

// --- EJEMPLO DE USO ---
/* console.log("\n=== EJECUCIÓN PROBLEMA 2 ===");
const processor = new DocumentProcessor();
const miWord = new WordDocument();
const miPdf = new PDFDocument();

console.log("Procesando Word:");
processor.readDocument(miWord);
processor.processEditableDocument(miWord);

console.log("\nProcesando PDF:");
processor.readDocument(miPdf);
// processor.processEditableDocument(miPdf); // Esto ahora marca un error en tiempo de compilación, previniendo crashes. */