import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/Category.model';
import { CategoriesService } from 'src/app/services/Impl/categories.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
  providers: [MessageService]
})
export class ListCategoriesComponent implements OnInit {

  public categories: ICategory[] = [];

  public loading = false;

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.loadCategories();
  }

  public loadCategories() {
    this.categoriesService.getCategories().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((resp: ICategory[]) => {
      this.loading = true;
      this.categories = resp;
    }, error => {
      this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Antención',
      detail: 'Ha ocurrido un error al cargar las categorias!'});
    });
  }

  Delete (idCategory: string) {
    console.log('Ingrese a eliminar');
    console.log(idCategory);
    this.categoriesService.deleteCategory(idCategory).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(data => {
      this.messageService.add({severity: 'success', key: 'toastAdmin', summary: 'Información',
      detail: 'La categoria se ha eliminado correctamente!'});
      this.loading = true;
      this.ngOnInit();
    },
    error => {
      this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Antención',
      detail: 'Ha ocurrido un error al eliminar!'});
      console.log(error);
    }
    );
  }

}
