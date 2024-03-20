import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import {useNavigate,useParams} from 'react-router-dom';

const EditBook = () => {

  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setPublishYear] = useState('');
  const [loading,setLoading] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    axios
      .get(`http://localhost:8080/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occurred. Please check console.");
        console.log(error);
      })
  },[]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios
      .put(`http://localhost:8080/books/${id}`,data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check console.');
        console.log(error);
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
              <label className='text-xl mr-4 text-grey-500'>Title</label>
              <input 
                  type='text'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className='border-2 border-grey-500 px-4 py-2 w-full'
              />
          </div>
          <div className='my-4'>
              <label className='text-xl mr-4 text-grey-500'>Author</label>
              <input 
                  type='text'
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className='border-2 border-grey-500 px-4 py-2 w-full'
              />
          </div>
          <div className='my-4'>
              <label className='text-xl mr-4 text-grey-500'>Publish Year</label>
              <input 
                  type='text'
                  value={publishYear}
                  onChange={e => setPublishYear(e.target.value)}
                  className='border-2 border-grey-500 px-4 py-2 w-full'
              />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
            Save
          </button>
      </div>
    </div>
  )
}

export default EditBook;