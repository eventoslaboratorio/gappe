class Storage {
  set(chave,valor) {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  }
  get(chave) {
    const valor = window.localStorage.getItem(chave);
    if(valor)
      return JSON.parse(valor);
    else 
      return null;
  }
}
const storage = new Storage();
export default storage;