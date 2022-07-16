import React, {useState, useEffect} from 'react';
import axios from 'axios';
import backArrow from '../images/back_arrow.png';
import { useLocation } from 'react-router-dom';

const MusicDetailPage = () => {
  const [detail, setDetail] = useState(null);
  const location = useLocation();
  const state = location.state;

  const getDetailItem = () => {
    console.log('location id:' + state.id);

    if (state.id > 0) {
      axios.get('http://localhost:3300/v1/chart/detail/' + state.id)
        .then((response) => {
          console.log(response);
          if (response.data.chart.title === undefined) {
            alert('곡 정보가 존재하지 않습니다.');
            window.location.assign('/');
          }
          else {
            console.log(response.data.chart);
            setDetail(response.data.chart);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getDetailItem();
  }, [state]);

  return (
    <div>
      <div align='center'>
        {
          detail && (
            <div>
              <table border='0'>
                <thead>
                  <tr>
                    <td colSpan='2'>
                      <button style={{ cursor: 'pointer'}} onClick={() => window.location.assign('/')}>
                        <img src={backArrow} alt='back-arror'></img> 
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='2' align='center'>
                      <h1>{detail.title}</h1>
                      <h3>{detail.singer}</h3>
                      <br></br>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width='100px' align='left'>
                      <h4>작사</h4>
                    </td>
                    <td width='300px' align='left'>
                      {detail.lyricist}
                    </td>
                  </tr>
                  <tr>
                    <td width='100px' align='left'>
                      <h4>작곡</h4>
                    </td>
                    <td width='300px' align='left'>
                      {detail.melodizer}
                    </td>
                  </tr>
                  <tr>
                    <td width='100px' align='left'>
                      <h4>장르</h4>
                    </td>
                    <td width='300px' align='left'>
                      {detail.genre}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default MusicDetailPage;