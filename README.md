# Demo PDF Loading

This sample application uses PDF.js to load and display a PDF file in an Ionic application.

In the case of this application, the PDF file is first loaded as a blob and stored in a local storage mechanism. This is done to simulate downloading and caching the PDF document. The PDF.js `getDocument()` call could have just as easily been given a URL and loaded the PDF file directly from that URL. It all depends on your use case.

## Using the App

Tab1 has two buttons. One loads a PDF file from disk into a local storage mechanism for later retrieval. This application uses a local hard coded PDF file, but you could use whatever you want so long as it is a valid PDF file.

Tab 2 determines if a PDF file exists, and if it id does loads the first pge. This could be changed to do whatever it is you want to do. The basics are all there.

## Implementation Notes

- `ionic start demo-pdf tabs --type=angular --cordova`
- `npm i pdfjs-dist @types/pdfjs-dist`
- `npm i @ionic/storage`

The PdfService does what little "heavy lifting" there is. In reality this is all very simple and basic stuff, so there is not much there.

It is _highly_ likely you will need to extend the functionallity that is here based on your own needs. In order to do that:

- Read the [PDF.js documentation](https://mozilla.github.io/pdf.js/)
- Read the [FileReader documentation](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) on MDN

**Note:** this sample just reads a local file. If you are downloading PDF files from online you may need to make sure that you have CORS properly implemented on whatever server you are getting the PDF from.
