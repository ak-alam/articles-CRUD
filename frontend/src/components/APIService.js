import config  from '../config';
export default class APIService {
    static UpdateArticle(id, body){
      // `http://127.0.0.1:5000/update/${id}/`
        // return  fetch(`${config.backendUrl}/update/${id}/`, {
        return  fetch(`${process.env.REACT_APP_BACKEND_URL}/update/${id}/`, {
    
            'method': 'PUT',
             headers: {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
          })
          .then(resp => resp.json())
      
    }

    static InsertArticle(body){
      // `http://127.0.0.1:5000/add/`
      // return  fetch(`${config.backendUrl}/add/`, {
      return  fetch(`${process.env.REACT_APP_BACKEND_URL}/add/`, {    
          'method': 'POST',
           headers: {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(body)
        })
        .then(resp => resp.json())
    
  }
  static DeleteArticle(id){
    // http://127.0.0.1:5000/delete/${id}/
    // return  fetch(`${config.backendUrl}/delete/${id}/`, {
    return  fetch(`${process.env.REACT_APP_BACKEND_URL}/delete/${id}/`, {  
        
        'method': 'DELETE',
         headers: {
          'Content-Type': 'application/json'
        },
      })  
  }
}