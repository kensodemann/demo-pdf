import { Injectable } from '@angular/core';
import { getDocument, PDFDocumentProxy, PDFPageViewport, PDFPageProxy } from 'pdfjs-dist/webpack';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {}

  async loadFile(): Promise<PDFDocumentProxy> {
    const doc = await getDocument('/assets/pdfs/ArchitectureReviewMeetingAgenda.pdf').promise;
    return doc;
  }

  async renderPage(doc: PDFDocumentProxy, canvas: HTMLCanvasElement, pageNumber: number = 1): Promise<PDFPageProxy> {
    let canvasContext: CanvasRenderingContext2D;
    const pdfPage = await doc.getPage(pageNumber);

    const viewport = pdfPage.getViewport({ scale: 1 }) as PDFPageViewport;

    canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    return pdfPage.render({
      canvasContext,
      viewport
    }).promise;
  }
}
