import { useState, useTransition } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [zipcode, setZipcode] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [temp, setTemp] = useState('');
  const [warn, setWarn] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const setZipCode = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3100/scrape-website', { zipcode });
      if (response.status === 200) {
        setLoading(false)
        setTitle(response.data.location);
        setTime(response.data.time)
        setTemp(response.data.temp)
        setWarn(response.data.warn)
        switch (response.data.warn) {
          case 'Sunny':
            setImage('sunny.gif');
            break;
          case 'Partly Cloudy':
            setImage('partly-cloudy.gif');
            break;
          case 'Cloudy':
            setImage('cloudy.gif');
            break;
          case 'Rain':
            setImage('rain.gif');
            break;
          default:
            setImage('sunny.gif');
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data');
    }
  };

  return (
    <form onSubmit={setZipCode} className="App">
      <img src='/house.jpeg' className='house' alt='house'></img>
      <div className='overflow'></div>
      <h1 className='title'>Welcome Friend</h1>
      <label className='label'>Please enter the zip code of your location</label>
      <input
        onChange={(e) => setZipcode(e.target.value)}
        className='zipcode'
        placeholder='Enter Zip Code Here'
      ></input>
      <div className='location'>
        <h3>{title}</h3>
        <h3 className='font'>{time}</h3>
      </div>
      <h1 className='degrees'>{temp}</h1>
      <p className='warn'>{warn}</p>
      {image &&     <img src={image} className='raingif' alt=''></img>}
    {loading && 
      <div className='loading'>
      <img className='loading-icon' src='loading.gif'></img>
      </div>
      }
    </form>
  );
}

export default App;
