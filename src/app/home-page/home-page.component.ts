import { Component, ContentChild, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { parser } from 'src/app/parser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  fileValue: any;
  className: string;
  listOfAttributs: any = [];
  listOfMethods: any = [];

  constructor() { }

  public handleFiles(data: FileList) {
    if (data.length !== 1) { throw new Error('can not use multiple files'); }

    const file = data[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      this.fileValue = event.target
      const file = this.fileValue.result;
      const allLines = file.split(/\r\n|\n/);

      console.log("d", allLines[0]);

      if (allLines[0].includes("class")) {
        this.className = allLines[0].split(" ")[1];
        console.log("This file is a class with name:", this.className);
        // TODO: add regex control for the className (begin by capital letter, ...)

        this.listOfAttributs = this.getAttributs(allLines);
        console.log("This file is a class with name:", this.className, " and attributs: ", this.listOfAttributs);
        // TODO: may be improved with control for the attribut (const, ...)

        this.listOfMethods = this.getMethods(allLines);
        console.log("This file is a class with name:", this.className, ", attributs: ", this.listOfAttributs, " and methods: ", this.listOfMethods);
        // TODO: may be improved with control for the methos (...)
      }
    };

    reader.onerror = (event) => {
      alert(event);
    };

    reader.readAsText(file);
  }

  getAttributs(lines) {
    let attributs = [];
    lines.forEach((line) => {
      if (!line.includes("{") && !line.includes("}") && (line.includes("private") || line.includes("protected") || line.includes("public"))) {
        line = line.trim();
        attributs.push(new Object({
          visibility: line.split(" ")[0],
          name: line.split(" ")[1].slice(0, -1),
          type: line.split(" ")[2].slice(0, -1),
        }));
      }
    });
    return attributs;
  }

  getMethods(lines) {
    let methods = [];
    lines.forEach((line) => {
      if (line.includes("{") && line.includes("(") && line.includes(")") && (line.includes("private") || line.includes("protected") || line.includes("public"))) {
        line = line.trim();
        if (!line.includes("static")) {
          methods.push(new Object({
            visibility: line.split(" ")[0],
            name: line.split(" ")[1].split("(")[0],
            type: line.substring(line.lastIndexOf(":") + 1, line.lastIndexOf("{")).trim()
          }));
        } 
        else {
          methods.push(new Object({
            visibility: line.split(" ")[0],
            name: line.split(" ")[2].split("(")[0],
            type: line.substring(line.lastIndexOf(":") + 1, line.lastIndexOf("{")).trim()
          }));
        }
      }
    });
    return methods;
  }
}