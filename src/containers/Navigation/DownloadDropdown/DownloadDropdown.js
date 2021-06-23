import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import styles from './DownloadDropdown.module.css';
import AppContext from '../../../contexts/AppContext';
import Spinner from '../../../components/Spinner/Spinner';
import { fabric } from 'fabric';
import { jsPDF } from 'jspdf';

const DownloadDropdown = ({ canvasArr }) => {
  const { appDispatch } = useContext(AppContext);
  const donwloadRef = useRef(null);
  const [canvasArrToDownload, setCanvasArrToDownload] = useState(null);
  const [downloadType, setDownloadType] = useState(null);

  const downloadStartHandler = (pxRatio) => {
    let arr = canvasArr.map((el) => {
      let newCanvas = new fabric.Canvas();
      let jsonCanvas = JSON.stringify(el);
      newCanvas.loadFromJSON(jsonCanvas);
      newCanvas.setZoom((el.getZoom() / el.zoom) * pxRatio);
      newCanvas.setDimensions({
        width: (el.getWidth() / el.zoom) * pxRatio,
        height: (el.getHeight() / el.zoom) * pxRatio,
      });
      return newCanvas;
    });
    setCanvasArrToDownload(arr);
  };

  const imageDownloadHandler = useCallback((cArr, dispatch) => {
    for (let i = 0; i < cArr.length; i++) {
      let c = cArr[i];
      c.getElement().toBlob((blob) => {
        donwloadRef.current.href = URL.createObjectURL(blob);
        donwloadRef.current.download = `design${i + 1}.png`;
        donwloadRef.current.click();
        if (i === cArr.length - 1) {
          dispatch({ type: 'setIsDownloadDropdown', data: false });
        }
      });
    }
    setDownloadType(null);
    setCanvasArrToDownload(null);
  }, []);

  const pdfDownloadHandler = useCallback((cArr, dispatch) => {
    let pdf = new jsPDF('l', 'mm', 'a4');
    pdf.deletePage(1);
    for (let i = 0; i < cArr.length; i++) {
      let c = cArr[i];
      let width = Math.floor(c.getWidth() * 0.264583);
      let height = Math.floor(c.getHeight() * 0.264583);
      let orientation = height >= width ? 'p' : 'l';
      pdf.addPage([width, height], orientation);
      let imgData = c.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0);
    }
    pdf.save('design.pdf');

    dispatch({ type: 'setIsDownloadDropdown', data: false });
    setDownloadType(null);
    setCanvasArrToDownload(null);
  }, []);

  useEffect(() => {
    if (canvasArrToDownload && downloadType) {
      if (downloadType === 'image') {
        imageDownloadHandler(canvasArrToDownload, appDispatch);
      } else if (downloadType === 'pdf') {
        pdfDownloadHandler(canvasArrToDownload, appDispatch);
      }
    }
  }, [
    downloadType,
    canvasArrToDownload,
    imageDownloadHandler,
    pdfDownloadHandler,
    appDispatch,
  ]);

  const clickHandler = (e) => {
    let id = e.currentTarget.id;
    if (id === 'downloadImage') {
      downloadStartHandler(1);
      setDownloadType('image');
    } else if (id === 'downloadHQImage') {
      downloadStartHandler(2);
      setDownloadType('image');
    } else if (id === 'downloadPDF') {
      downloadStartHandler(1);
      setDownloadType('pdf');
    } else if (id === 'downloadHQPDF') {
      downloadStartHandler(2);
      setDownloadType('pdf');
    }
  };

  const content = (
    <>
      <div className={styles.Option} id='downloadImage' onClick={clickHandler}>
        <p>Download as image</p>
      </div>
      <div
        className={styles.Option}
        id='downloadHQImage'
        onClick={clickHandler}
      >
        <p>Download as high quality image</p>
      </div>
      <div className={styles.Option} id='downloadPDF' onClick={clickHandler}>
        <p>Download as PDF</p>
      </div>
      <div className={styles.Option} id='downloadHQPDF' onClick={clickHandler}>
        <p>Download as high quality PDF</p>
      </div>
    </>
  );

  return (
    <div className={styles.Dropdown}>
      {downloadType ? <Spinner /> : content}
      <a className={styles.DownloadLink} ref={donwloadRef} href='/'>
        Download
      </a>
    </div>
  );
};

export default DownloadDropdown;
