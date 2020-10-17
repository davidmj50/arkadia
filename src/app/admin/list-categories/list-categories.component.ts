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

  constructor(private categoriesService: CategoriesService, private messageService: MessageService) { }

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
      console.log(resp);
      this.categories = resp;
    });
  }

  public DeleteCategories(category: ICategory) {
    this.categoriesService.delete(category.id.toString()).subscribe(data => {
      alert('Se elimino con exito....');
    });
  }
}
