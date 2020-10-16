import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/Category.model';
import { CategoriesService } from 'src/app/services/Impl/categories.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  public categories: ICategory[] = [];
  public loading: boolean = false;
  
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.loadCategories();
  }

  public loadCategories() {
    this.categoriesService.getCategories().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((resp : ICategory[]) => {
      this.loading = true;
      console.log(resp);
      this.categories = resp;
    });
  }
}
