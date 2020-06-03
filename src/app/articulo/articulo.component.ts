import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'articulo',
  templateUrl: './articulo.component.html'
})
export class ArticuloComponent {
  public ArticleID = 0;
  public ArticleURL: SafeResourceUrl;

  public article = {
    paragraphs: [],
    title: "",
  }

  public decklist = {
    cards: [],
    title: "",
  }

  constructor(private route: ActivatedRoute, public  sanitizer: DomSanitizer, public http: HttpClient) { }

  ngOnInit() {

    this.ArticleID = parseInt(this.route.snapshot.paramMap.get('id'));

    const response = this.http.get("\\assets\\articles\\" + this.ArticleID + ".json");
    const responseDecklist = this.http.get("\\assets\\decklists\\" + this.ArticleID + ".json");

    response.toPromise().then((data) => {
      console.log(data);
      this.article.title = (data as any).title;
      this.article.paragraphs = (data as any).paragraphs;
    })

    responseDecklist.toPromise().then((data) => {
      console.log(data);
      this.decklist.title = (data as any).title;
      this.decklist.cards = (data as any).cards;
    })

    .catch((err) => {
      console.log(err);
    })
    console.log(response);
  }
}
