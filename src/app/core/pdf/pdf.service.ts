import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { getDocument, PDFDocumentProxy, PDFPageViewport, PDFPageProxy } from 'pdfjs-dist/webpack';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private key = 'my-pdf-doc';

  constructor(private storage: Storage, private http: HttpClient) {}

  async documentExists(): Promise<boolean> {
    return !!(await this.storage.get(this.key));
  }

  async storeDocument() {
    const blob = await this.http
      .get('/assets/pdfs/ArchitectureReviewMeetingAgenda.pdf', {
        responseType: 'blob',
      })
      .toPromise();
    return this.storeDocumentAsBase64(blob);
  }

  async getDocument(): Promise<PDFDocumentProxy> {
    const data = await this.storage.get(this.key);
    const pdf = atob(data);
    const doc = await getDocument({ data: pdf }).promise;
    return doc;
  }

  async removeDocument(): Promise<any> {
    return await this.storage.remove(this.key);
  }

  async renderPage(doc: PDFDocumentProxy, canvas: HTMLCanvasElement, pageNumber: number = 1): Promise<PDFPageProxy> {
    const pdfPage = await doc.getPage(pageNumber);
    const viewport = pdfPage.getViewport({ scale: 1 }) as PDFPageViewport;
    const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    return pdfPage.render({
      canvasContext,
      viewport,
    }).promise;
  }

  private storeDocumentAsBase64(blob: Blob): Promise<void> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const res = (evt.target as any).result as string;
        const token = 'base64,';
        const idx = res.indexOf(token) > -1 ? res.indexOf(token) + token.length : 0;
        await this.storage.set(this.key, res.substring(idx));
        resolve();
      };
      reader.readAsDataURL(blob);
    });
  }
}
