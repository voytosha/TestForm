import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from './app.service';
import {Form} from './app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup;

  constructor(private service: AppService) {}

  ngOnInit(): void {

    this.form = new FormGroup ({
      valuta: new FormControl('EUR', [Validators.required]),
      tipoCausale: new FormControl('acquisto', [Validators.required]),
      data: new FormControl(null, [Validators.required]),
      strumento: new FormControl(''),
      quantita: new FormControl(null, [Validators.required, Validators.pattern('^(0|[1-9]\\d*)$')]),
      prezzo: new FormControl(null, [Validators.required, Validators.pattern('^(?!0\\d|$)\\d*(\\.\\d{1,4})?$')]),
      importo: new FormControl(null)
    });
  }

  calcTot() {
    return this.form.get('importo').setValue(this.form.get('quantita').value * this.form.get('prezzo').value);
  }

  inserisci() {
    // solo se sblocco il pulsante di submit
    if (this.form.invalid) {
      return console.log('KO');
    }

    const newForm: Form = {
      data: this.form.get('data').value,
      valuta: this.form.get('valuta').value,
      tipoCausale: this.form.get('tipoCausale').value,
      prezzo: this.form.get('prezzo').value,
      quantita: this.form.get('quantita').value,
      importo: this.form.get('importo').value
  };

    this.service.create(newForm).subscribe( () => {
      this.form.reset();
    });
  }

}
