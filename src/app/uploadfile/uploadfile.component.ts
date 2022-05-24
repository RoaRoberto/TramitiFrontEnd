import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css'],
})
export class UploadfileComponent implements OnInit {
  @Output() uploadDataEvent = new EventEmitter<any>();
  @Input() path:string='';
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  exceltoJson: {};

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: [''],
    });
  }

  onFileSelect(event) {
    try {
      let af = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
      ];
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        // console.log(file);

        if (!_.includes(af, file.type)) {
          this.toastService.show('Only EXCEL Docs Allowed!', {
            classname: 'bg-danger text-light',
            delay: 5000,
          });
          return;
        }
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);

        this.exceltoJson = {};
        let headerJson = {};
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>event.target;
        // if (target.files.length !== 1) {
        //   throw new Error('Cannot use multiple files');
        // }
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(target.files[0]);
        console.log('filename', target.files[0].name);
        this.exceltoJson['filename'] = target.files[0].name;
        reader.onload = (e: any) => {
          /* create workbook */
          const binarystr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
          for (var i = 0; i < wb.SheetNames.length; ++i) {
            const wsname: string = wb.SheetNames[i];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
            this.exceltoJson[`sheet${i + 1}`] = data;
            const headers = this.get_header_row(ws);
            headerJson[`header${i + 1}`] = headers;
            //  console.log("json",headers)
          }
          this.exceltoJson['headers'] = headerJson;
          this.uploadDataEvent.emit(this.exceltoJson[`sheet${1}`]);
          console.log(this.exceltoJson);
        };

        this.toastService.show(
          'Se han cargado los datos correctamente, por favor mire los diferentes menus',
          {
            classname: 'bg-success text-light',
            delay: 2000,
          }
        );
      }
    } catch (error) {
      this.toastService.show(
        'Se ha presentado un error cargando los datos del archivo excel',
        {
          classname: 'bg-danger text-light',
          delay: 2000,
        }
      );
    }
  }

  get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C,
      R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell =
        sheet[
          XLSX.utils.encode_cell({ c: C, r: R })
        ]; /* find the cell in the first row */
      // console.log("cell",cell)
      var hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
      if (cell && cell.t) {
        hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
    }
    return headers;
  }

  download() {

    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = this.path;
    document.body.appendChild(link);
    link.click();
    link.remove();
    //window.open(this.path, '_blank');
  }
}
