import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {
  
  ngAfterViewInit(): void {
    this.navBar.nativeElement.innerHTML;
    
  }

  @ViewChild('navFixed') navBar: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document
    ) { }

    // @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    console.log(window.pageYOffset);
    if (window.pageYOffset > 65) {
      this.navBar.nativeElement.style.position = "fixed"
      this.navBar.nativeElement.style.top = "0";
      this.navBar.nativeElement.style.zIndex = "10";
      this.navBar.nativeElement.style.width = "100%"
    } else {
      this.navBar.nativeElement.style.position = "relative"
      this.navBar.nativeElement.style.width = "100%"
      this.navBar.nativeElement.style.top = "0";
      this.navBar.nativeElement.style.zIndex = "10";
    }
  }
  

  ngOnInit() {
  }

}
