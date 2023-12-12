export async function  loginUser () {

    //APPEL DE L'API POUR VERIFIER L'E-MAIL ET LE MOT DE PASSE
   fetch ('http://localhost:8081/login',{
    method: 'POST',
    headers: {
         'Content-Type': 'application/json;charset=utf-8'
     },
      body: JSON.stringify({username: 'test2@test.fr', password: 'testtest'})
    })

    .then(response => {
    if (response.status===200){
        //SI LOGIN OK ON CONVERTI EN JSON 
        return response.json();
    }

    })

    .then(data=>{
    if(data){ //SI LOGIN OK 
        // STOCKAGE DU TOKEN DANS LE SESSION STORAGE
        return data.token;
    }     
    })
}