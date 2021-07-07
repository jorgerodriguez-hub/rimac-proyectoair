export const getCombos = async () => {

    const url = `https://z16vwhmxyf.execute-api.us-east-1.amazonaws.com/dev/moneda`;
    const resp = await fetch(url);
    const { lista } = await resp.json();

    const moneda = lista.map(lista => {
        return {
            id: lista.id,
            abreviatura: lista.abreviatura,
            descripcion: lista.descripcion
        }
    })

    return moneda;

}