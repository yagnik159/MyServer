async function getLoggedData(){
    let responseData = [];
    const response = await fetch('./logs.json');
    responseData = await response.json();
    return responseData;
}


window.addEventListener("DOMContentLoaded", tableLoad);

async function tableLoad(){
    let responseData = await getLoggedData();

    for (let i = 0; i < responseData.length; i++) {
        const labelurl = document.createElement('label');
        labelurl.textContent = responseData[i].url;
        
        const labelRequestData = document.createElement('label');
        labelRequestData.textContent = responseData[i].raw_data;

        const verifyButton = document.createElement('button');
        verifyButton.id = `button${i}`;
        verifyButton.textContent = 'run script';

        verifyButton.addEventListener('click', async function() {
            console.log("responsedata--------------",responseData);
        
            const url = responseData[i].url;
            const data = JSON.parse(responseData[i].raw_data);
            const options = {   
                method: responseData[i].method,
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            try {
                const responseData = await fetch(url, options);
                let status;
                if(responseData.json()){
                    status = responseData.status;
                }
                console.log("status..................",status);
            } catch (error) {
                console.error("error while trying request",error);
            }
        });

        

        const tr = document.createElement('tr');

        const urlTd = document.createElement('td');
        const dataTd = document.createElement('td');
        const buttonTd = document.createElement('td');
        
        urlTd.appendChild(labelurl);
        dataTd.appendChild(labelRequestData);
        buttonTd.appendChild(verifyButton);

        tr.appendChild(urlTd);
        tr.appendChild(dataTd);
        tr.appendChild(buttonTd);
        
        document.getElementById('request-raw').appendChild(tr);
      }
}




document.getElementById('click-me').addEventListener('click',onclick);


//   {
//     id: '22932',
//     url: 'https://api.filswan.com/auth/login',
//     method: 'POST',
//     response_code: 200,
//     headers: {
//       'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
//       'sec-ch-ua-mobile': '?0',
//       Authorization: 'Bearer',
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
//       'Content-Type': 'application/json;charset=UTF-8',
//       Accept: 'application/json, text/plain, */*',
//       lang: 'en',
//       'sec-ch-ua-platform': '"Windows"'
//     },
//     form_data: '',
//     raw_data: '{"email":"test@pentest.com","password":"Test@pentest12"}'
//     query_params: ''
//   }
async function onclick(){
    let responseData = await getLoggedData();
    console.log("responsedata--------------",responseData);

    const url = responseData[0].url;
    const data = JSON.parse(responseData[0].raw_data);
    const options = {   
        method: responseData[0].method,
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}