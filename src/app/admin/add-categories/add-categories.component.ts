import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/Impl/categories.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
  providers: [MessageService]
})
export class AddCategoriesComponent implements OnInit {

  public formCategories: FormGroup;
  public loading: boolean = false;

  constructor(
    private router: Router,
    private service: CategoriesService,
    private formbuilder: FormBuilder,
    private messageService: MessageService) { }

  ngOnInit() {
    this.formCategories = this.formbuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  guardar() {
    
    this.service.createCategory(this.formCategories.get('name').value,
    this.formCategories.get('description').value).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((result) => {
      this.loading = true;
      this.messageService.add({severity:'success', key: 'toastAdmin',summary:'Información', detail:'La categoría se ha agregado correctamente!'});
      //this.router.navigate(['/dashboard/admin/categories']);
    }, error => {
      this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Antención', detail:'Ha ocurrido un error al guardar!'});
    });
  }

}
