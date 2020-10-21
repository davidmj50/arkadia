import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/Impl/categories.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/Category.model';
import { finalize } from 'rxjs/operators';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css'],
  providers: [MessageService]
})
export class EditCategoriesComponent implements OnInit {
  public idCategory: string;
  public category: ICategory;
  public loading = false;
  public formCategories: FormGroup;

  constructor(
    private _categoryService: CategoriesService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.formCategories = this.formbuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.idCategory = this.route.snapshot.paramMap.get('id');
    this.getCategory();
  }

  getCategory() {
    this._categoryService
      .getCategory(this.idCategory)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (category: ICategory) => {
          this.loading = true;
          this.category = category;
          this.formCategories.setValue({
            name: this.category.nombre_Categoria,
            description: this.category.descripcion
          });
        },
        error => {
          this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Atención',
          detail: 'Ha ocurrido un error al cargar la categoría!'});
          console.log(error);
        }
      );
  }

  updateCategory() {

    this._categoryService
    .updateCategory(this.formCategories.get('name').value,
    this.formCategories.get('description').value, this.idCategory)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(
      (category: ICategory) => {
        this.loading = true;
        this.category = category;
        this.messageService.add({severity: 'success', key: 'toastAdmin', summary: 'Información',
        detail: 'La categoría se ha editado correctamente!'});
      },
      error => {
        this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Atención',
        detail: 'Ha ocurrido un error al editar!'});
        console.log(error);
      }
    );
  }
}
