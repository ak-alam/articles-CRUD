import './App.css';
import {useState, useEffect} from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';
// import config from './config';

function App() {

  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticles] = useState(null)
  // const [editedArticle, setEditedArticles] = useState([])


  useEffect(() => {
    // http://127.0.0.1:5000/get
    // fetch(`${config.backendUrl}/get`, {

    fetch(`${process.env.REACT_APP_BACKEND_URL}/get`, {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  }, [])

  const editArticle = (article) => {
    setEditedArticles(article)
  }

  const updatedData = (article) => {
    const new_article = articles.map(my_article =>{
      if (my_article.id === article.id) {
        return article
      } else {
        return my_article
      }
    })
    setArticles(new_article)
  }

  const openForm = () => {
    setEditedArticles({title: '', body: ''})
  }

  const insertedArticle = (article) =>{
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }
  const deleteArticle = (article) => {
    const new_article = articles.filter(myarticle => {
      if(myarticle.id === article.id){
        return false;
      }
      return true
      })
      setArticles(new_article)
  }
  return (
    <div className="App">
      <div className='row'>
        <div className='col'>
          <h1>Home Page</h1>
        </div>
        <div className='col'>
          <button
          className='btn btn-success'
          onClick={openForm}
          >InsertArticle</button>
        </div>
      </div>
     

        <ArticleList articles = {articles} editArticle = {editArticle} deleteArticle = {deleteArticle}/>
       
       
       {editedArticle ? <Form article = {editedArticle} updatedData = {updatedData} insertedArticle = {insertedArticle}/> : null} 
    </div>
  );
}

export default App;
