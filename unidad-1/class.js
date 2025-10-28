class Persona{

  //propiedades
  constructor(edad, nombre, humor){
    this.edad = edad;
    this.nombre = nombre;
    this.humor = humor;
  }

  //metodos
  saludar(){
    return `Hola me llamo ${this.nombre}, y tengo ${this.edad} años.`;
  }

  random(){
    const randomNumber = Math.floor( Math.random() * 2 );
    return randomNumber;
  }

  tormentaElectrica(){
    const randomNumber = this.random();
    let mensaje = "";

    //si es igual a 1 se corta la luz
    if(randomNumber === 1){
      this.humor = this.humor - 50;
      mensaje = `A ${this.nombre} por la tormenta se le corto la luz, su humor disminuyo a ${this.humor}`;
    }else{
      mensaje = `La tormenta electrica paso sin consecuencias`;
    }

    return mensaje;
  }

  trabajar(){
    let mensaje = "";

    if(this.humor <= 60){
      mensaje = `${this.nombre} por su humor, se niega a ir a trabajar`;
    }else{
      this.humor = this.humor - 10;
      mensaje = `${this.nombre} se fue a trabajar`;
    }

    return mensaje;
  }

  dormir(){
    this.humor = 100;
    return `${this.nombre} descanso correctamente y su humor se restablecio`;
  }

}

const persona1 = new Persona( 27, "Gabriel", 100 );
const persona2 = new Persona( 32, "Antonio", 90 );

console.log( persona1.saludar() );
console.log( persona2.saludar() );

console.log( persona1.tormentaElectrica() )
console.log( persona2.tormentaElectrica() )

console.log( persona1.trabajar() )
console.log( persona2.trabajar() )

console.log( persona1.dormir() )
console.log( persona2.dormir() )