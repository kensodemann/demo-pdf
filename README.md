# Demo PDF Loading

This sample application uses PDF.js to load and display a PDF file in an Ionic application.

- `ionic start demo-pdf tabs --type=angular --cordova`
- `npm i pdfjs-dist @types/pdfjs-dist`
- `ionic g service services/pdf/pdf`

https://www.penta.com/penta/Case-Studies-PDF/4-Murphy.pdf

Sep 18 ‪07:45 am‬
I ended up not needing any other plugin, had some misteps along the way but decided to really break this down to SUPER simply pieces and of course things fell in to place pretty nicely. Still having some issues with PDF.js on the device that I'll work out on my own.

In case you care, here's my current process that's mostly tied up

- input element type file gets a file object
- I used FileReady (browser) to readAsDataURL
- PDF.js accepts dataURL
- PDF.js renders pdf on virtual canvas
- HTMLCanvasElement.toDataURL() from virtual canvas to get PNG data
- dataURL -> blob, save blob using ionic File
- file can then be used all over app and sync'd as needed

Thanks so much for your help. I'll consider this closed on my end, but let you close it in case you can think of anything there that might hurt us in the future. Thanks
