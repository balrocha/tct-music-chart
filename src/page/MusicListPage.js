import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import MusicItem from '../component/MusicItem';
import { Input } from '@material-ui/core'


const MusicListPage = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [chartType, setChartType] = useState('domestic');
  const [sortType, setSortType] = useState('');
  const [chartList, setChartList] = useState([]);
  const [totalChartList, SetTotalChartList] = useState([]);
  const [searchText, setSearchText] = useState('');


  const handleSortType = (sortType) => {
    console.log('handleSortType: ' + sortType);
    let sortResult;

    setSortType(sortType);

    if(sortType === 'rank') {
      sortResult = totalChartList.sort((a, b) => {
        return a.rank - b.rank;
      });

      setChartList(sortResult);
    }

    if(sortType === 'title') {
      sortResult = totalChartList.sort((a, b) => {
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();
        if(x < y) { return -1;}
        if(x > y) { return 1;}
        return 0;
      });

      setChartList(sortResult);
    }

    if(sortType === 'singer') {
      sortResult = totalChartList.sort((a, b) => {
        const x = a.singer.toLowerCase();
        const y = b.singer.toLowerCase();
        if(x < y) { return -1;}
        if(x > y) { return 1;}
        return 0;
      });

      setChartList(sortResult);
    }
  }

  const handleChange = (value) => {
    console.log('handleChange text:' + value);
    setSearchText(value);
  };

  const handleSearch = () => {
    console.log('handleSearch');

    if(searchText.trim().length > 1) {
      const newChartList = [];
      totalChartList.map((item) => {
        console.log(item.singer);
        console.log(searchText);
        if(item.singer.includes(searchText.trim())) {
          newChartList.push(item);
        }
      });

      setChartList(newChartList);
    }
  };

  const handleSelectChart = (chartType) => {
    console.log('handleSelectChart');

    setChartType(chartType);
    setSearchText('');
    setSortType('');
  };

  const loadItemList = (chartType) => {
    console.log('loadItemList');

    axios.get('http://localhost:3300/v1/chart/' + chartType)
      .then((response) => {
        console.log(response.data.chartList);
        setChartList(response.data.chartList);
        SetTotalChartList(response.data.chartList);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const drawList = useCallback(() => {
    console.log('drawList');

    const musicList = chartList.map((item) => {
      return (<MusicItem key={item.id} music={item}></MusicItem>);
    });

    return musicList;
  }, [chartList]);

  useEffect(() => {
    console.log('MusicListPage useEffect [chartType]: ' + chartType);

    const now = new Date();
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const currentTimeStr = 
      now.getFullYear() + '년 ' + (now.getMonth() + 1) + '월 ' + now.getDate() + '일 ' + hour + ':' + min;

    setCurrentTime(currentTimeStr);

    if (chartType.length > 0) {
      loadItemList(chartType);
    }
  }, [chartType]);

  return (
    <table width='600px' border='0px'>
      <thead>
        <tr><td align='center' colSpan='4'><h1>음악 차트</h1></td></tr>
        <tr><td align='center' colSpan='4'>{currentTime}</td></tr>
        <tr>
          <td align='center' colSpan='4'>
            <Input id='searchText' type='text' placeholder='가수명' value={searchText} onChange={(event) => handleChange(event.target.value)}></Input>
            <button align='left' onClick={() => handleSearch()}>검색</button>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan='4'>
            <button 
              style={chartType === 'domestic' ? {fontWeight: 'bold', color: 'red', cursor: 'pointer'} : { cursor: 'pointer' }}
              onClick={() => handleSelectChart('domestic')}>
              국내
            </button>
            <button 
              style={chartType === 'overseas' ? {fontWeight: 'bold', color: 'red', cursor: 'pointer'} : { cursor: 'pointer' }}
              onClick={() => handleSelectChart('overseas')}>
              해외
            </button>
            <button 
              style={sortType === 'rank' ? {fontWeight: 'bold', color: 'red', cursor: 'pointer'} : { cursor: 'pointer' }}
              onClick={() => handleSortType('rank')}>
              순위정렬
            </button>            
            <button 
              style={sortType === 'title' ? {fontWeight: 'bold', color: 'red', cursor: 'pointer'} : { cursor: 'pointer' }}
              onClick={() => handleSortType('title')}>
              제목정렬
            </button>
            <button 
              style={sortType === 'singer' ? {fontWeight: 'bold', color: 'red', cursor: 'pointer'} : { cursor: 'pointer' }}
              onClick={() => handleSortType('singer')}>
              가수정렬
            </button>

          </td>
        </tr>
        {chartList.length > 0  && drawList()}
      </tbody>
    </table>
  );
}

export default MusicListPage;