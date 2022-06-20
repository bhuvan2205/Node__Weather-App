
document.querySelector('form').addEventListener('submit', (e)=> {

    e.preventDefault();
    const input = document.querySelector('input').value.trim();
    console.log(input);

    document.querySelector('.spinner').style.display= 'block';

    setTimeout(()=> {

        document.querySelector('.spinner').style.display= 'none';

        if(input.length === 0){

            document.querySelector('#error-message').innerHTML = "Please provide valid Address..";
        }
        
        fetch(`/weather?address=${input}`).then((response)=> {
    
            response.json().then(data => {
    
                if(data.error){
    
                    console.log(data.error);
                    document.querySelector('#weather').innerHTML= "";
                    document.querySelector('#location').innerHTML= "";
                    document.querySelector('#error-message').innerHTML = "<span>Error</span>: " + data.error;
    
                }
    
                else{
    
                    document.querySelector('#error-message').innerHTML = "";
    
                    console.log(data.location);
                    document.querySelector('#weather').innerHTML = "<span>Location</span>: " + data.location;
                    console.log(data.foreCast);
                    document.querySelector('#location').innerHTML = "<span>Weather</span>: " +data.foreCast.desc;
    
                }
            })
        });
    
        document.querySelector('input').value ="";

    }, 2000);

});