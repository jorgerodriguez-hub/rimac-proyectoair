export async function sendExcel(base64) {

    console.log('wasson', base64[1]);

    const url = `https://z16vwhmxyf.execute-api.us-east-1.amazonaws.com/dev/excel`;

    const params = {
        method: 'POST',
        headers: { 
            'Content-Type': 'text/plain' 
        },
        body: base64[1]
    };

    return await fetch(url, params)
        .then(response => {
            return response.json(); 
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
};

export async function registroApi(solicitud) {

    const url = `https://z16vwhmxyf.execute-api.us-east-1.amazonaws.com/dev/crearSolicitud`;

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({"cod_cliente":"202109","ruc":"20131373237","asegurado":"SOCIEDAD AGRICOLA RAPEL S.A","tipo_suma_asegurada":"B","moneda":"USD","suma_asegurada":"90585388.12","fecha_inicio":"13/01/2020 00:00:00","fecha_expiracion":"13/01/2020 00:00:00","segmento":"01","tipo_modelamiento":"01","direcciones":{"0":{"pais":"PE","departamento":"010101","provincia":"010101","distrito":"010101","direccion":"Av. REPÚBLICA DE COLOMBIA NRO. 791 OF. 903 LIMA, San Isidro","latitud":"-12.1220737","longitud":"-77.0329272","nro_piso":"9","anio_construccion":"2017","codigo_construccion":"2210","codigo_uso":"300","valor_edificio":"20000000","valor_contenido":"20000000","valor_lucro_cesante":"20000000","dias_cubiertos":"12","tipo_deducible":"C","per_deducible_edificio":"%16","deducible_edificio":"20000000","per_deducible_contenido":"%16","deducible_contenido":"20000000","cantidad_dias_lucro":"12","deducible_lucro_cesante":"20000000","tipo_suma_asegurada_ubicacion":"C","suma_asegurada_edificio":"20000000","suma_asegurada_contenido":"20000000","suma_asegurada_lucro":"20000000"},"1":{"pais":"PE","departamento":"010101","provincia":"010101","distrito":"010101","direccion":"Av. REPÚBLICA DE COLOMBIA NRO. 791 OF. 903 LIMA, San Isidro","latitud":"-12.1220737","longitud":"-77.0329272","nro_piso":"9","anio_construccion":"2017","codigo_construccion":"2210","codigo_uso":"300","valor_edificio":"20000000","valor_contenido":"20000000","valor_lucro_cesante":"20000000","dias_cubiertos":"12","tipo_deducible":"C","per_deducible_edificio":"%16","deducible_edificio":"20000000","per_deducible_contenido":"%16","deducible_contenido":"20000000","cantidad_dias_lucro":"12","deducible_lucro_cesante":"20000000","tipo_suma_asegurada_ubicacion":"C","suma_asegurada_edificio":"20000000","suma_asegurada_contenido":"20000000","suma_asegurada_lucro":"20000000"}}})
        body: JSON.stringify(solicitud)
    };

    console.log('params', params);

    return await fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        });
};

export function getSolicitudes() {

    const url = `https://z16vwhmxyf.execute-api.us-east-1.amazonaws.com/dev/consultarSolicitud`;
    
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err.message;
        });
};