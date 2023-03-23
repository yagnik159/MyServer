async function getLoggedData(){
    let responseData = [];
    const response = await fetch('./logs.json');
    responseData = await response.json();
    return responseData;
}

document.getElementById('click-me').addEventListener('click',onclick);

let responseData = getLoggedData().then((responseData) => {
    console.log("Promise resolved!");
    console.log(responseData);
  });


function onclick(){

    const url = responseData[0];

    const options = {
        method: 'POST',
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