export class parser {

  public classname: string;

  // TODO
   public analyze(fileContent: string) {

     //tableau pour parcourir ligne par ligne

     const contentTab = fileContent.split('\n');

     console.log(contentTab);

    for(let i =0; i< fileContent.length; i++ ) {
      if (this.classname = 'Person') {
      // appel a la fonction qui permet de recuperer le contenu
      }
      let Vregex = new RegExp ('%(<\w+>\s+){0,3}')     //visibility
      let Tregex = new RegExp ('%(\w|[<>[\]])+\s+')    //return type
      let Mregex = new RegExp ('\w+\s*')               //method name
      let Bregex = new RegExp ('\([^\)]*\)')           //method parameters

    }
  }

  pu

}
