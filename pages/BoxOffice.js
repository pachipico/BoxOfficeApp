import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';

import Title from '../components/Title';
import ListItem from '../components/ListItem';
import MovieName from '../components/MovieName';
import fetch from '../net/fetch';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Contents = styled.ScrollView`
  flex: 1;
`;

const Rank = styled.Text`
  font-size: 14px;
  color: #999999;
  margin-right: 12px;
`;
const Check = styled.Button``;

const BoxOffice = ({navigation}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(
      'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=44b818915a512b775f1986399059f4d4&targetDt=20210610&',
    ).then(data => {
      setList(data.boxOfficeResult.dailyBoxOfficeList);
    });
  }, []);

  return (
    <Container>
      <Contents>
        <Title>Box Office</Title>
        {list.length === 0 && <ActivityIndicator size="large" />}
        {list?.map(movie => {
          return (
            <ListItem
              onPress={() => {
                navigation.navigate('Details', {
                  movieCd: movie.movieCd,
                });
              }}
              key={movie.movieCd}>
              <Rank>{movie.rank}</Rank>
              <MovieName>{movie.movieNm}</MovieName>
            </ListItem>
          );
        })}
      </Contents>
    </Container>
  );
};

export default BoxOffice;
