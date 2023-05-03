import { toPng } from 'html-to-image';
export default async function saveElementAsImage(element: any) {
  await toPng(element)
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'my-image.png';
      link.href = dataUrl;
      link.click();
    });
}