import { Component, ElementRef, ViewChild } from '@angular/core';
import * as PDFJS from 'pdfjs-dist/webpack.js';
import { PDFPageProxy, PDFPageViewport, PDFRenderTask, PDFDocumentProxy } from 'pdfjs-dist';

import { PdfService } from '@app/services';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;

  constructor(private pdf: PdfService) {}

  async ionViewDidEnter() {
    const doc = await this.pdf.loadFile();
    this.pdf.renderPage(doc, this.canvasRef.nativeElement, 1);
  }
}
