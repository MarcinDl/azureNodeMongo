console.log('Client-side code running');

for(var i=1; i<10;i++){
    console.log(i)
}

// alert("działa")
console.log("zewnętrzny plik JS działa!")

const example = () => {
    // alert("ddd")

    fetch('/posts', {
        method: 'GET',  // *GET, POST, PUT, DELETE, etc.
    })
        .then(function(response) {
            if(response) {
                response.json().then(function(data) {  
                    console.log(data);  
                    console.log(data[0]);  
                    document.getElementById("danePobrane1").innerHTML = data[0].name;
                    document.getElementById("danePobrane2").innerHTML = data[0].rank;
                    document.getElementById("danePobrane3").innerHTML = data[0].age;
                });
                console.log('click was recorded');
            return;
            }
            throw new Error('Request failed.');
        })
        .catch(function(error) {
            console.log(error);
        });

}

document.getElementById("btn").addEventListener("click", example)


