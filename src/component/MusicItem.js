import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';

const MusicItem = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(props.music.title);
  const [singer, setSinger] = useState(props.music.singer);

  const getImage = (url) => {
    const baseUrl = "img/";
    return baseUrl + url;
  };

  const imageStyle = {
    width: "80px",
    height: "80px",
  };

  useEffect(() => {
    if (props.music.title.length > 18) {
      setTitle(props.music.title.substring(0, 18) + '...');
    }

    if (props.music.singer.length > 15) {
      setSinger(props.music.singer.substring(0, 15) + '...');
    }

  }, [title, singer]);

  return (
    <tr>
      <td width='20px'>{props.music.rank}</td>
      <td width='50px'>
        <img style={imageStyle} src={getImage(props.music.imageUrl)} />
      </td>
      <td width='250px'>
        <p style={{cursor: 'pointer'}} onClick={() => {
          console.log('title clicked');
          navigate("/detail", {state: {id: props.music.id}})
        }}>
          {title}
        </p>
        {/* <Link to={url}>{title}</Link> */}
      </td>
      <td width='180px' align='right'>{singer}</td>
    </tr>
  )

}

export default MusicItem;