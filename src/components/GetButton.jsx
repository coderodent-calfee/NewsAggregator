import '../index.css'
const SERVER_PORT      = 3035;

function GetButton() {
    
    function makeGetRequest(){
        const requestOptions = {
            method: 'GET'
        };

        const searchUrl = `http://localhost:${SERVER_PORT}/search`;
        let params = { searchText: `Hello?` };
        let url = searchUrl + '?' + (new URLSearchParams(params)).toString();

        fetch(url, requestOptions)
            .then((response) => {
                return response.json();
            }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });
        
    }
    
    return (
        <button onClick={makeGetRequest}>Get Something
        </button>
    );
}
export default GetButton;