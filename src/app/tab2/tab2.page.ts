import { Component, ElementRef, ViewChild } from '@angular/core';
import { PdfService } from '../core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;

  constructor(private pdf: PdfService) {}

  async ionViewDidEnter() {
    if (await this.pdf.documentExists()) {
      const doc = await this.pdf.getDocument();
      this.pdf.renderPage(doc, this.canvasRef.nativeElement, 1);
    } else {
      this.erase();
    }
  }

  private erase() {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}
