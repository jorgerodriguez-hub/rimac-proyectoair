export async function sendExcel(base64) {

    const url = `https://z16vwhmxyf.execute-api.us-east-1.amazonaws.com/dev/excel`;

    // console.log(base64);
    // console.log(base64[1]);

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
            console.log(err);
        });
};