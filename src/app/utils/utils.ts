export class utils {

  private static instance: utils;
  static getInstance(): utils {
    if (this.instance == null)
      this.instance = new utils();
    return this.instance;
  }

  capitalLetter(texto: string) {
    if (texto.charAt(texto.length - 1) != " ") {
      let arrPalabras = texto.split(" ");
      let textoFormateado: string = "";
      let contador = 1;

      for (let w of arrPalabras) {
        if (arrPalabras.length == 1) {
          textoFormateado += w.charAt(0).toUpperCase() + w.slice(1);
        }
        else if (arrPalabras.length > 1) {
          if (contador == 1) {
            textoFormateado += w.charAt(0).toUpperCase() + w.slice(1);
          }
          else {
            textoFormateado += " " + w.charAt(0).toUpperCase() + w.slice(1);
          }
        }
        contador++;
      }
      return textoFormateado;
    }
    else {
      return texto;
    }
  }

}
