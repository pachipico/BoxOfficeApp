import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';

import axios from 'axios';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Contents = styled.ScrollView`
  flex: 1;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 12px;
`;
const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;

  align-items: center;
`;
const MovieTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
const Rank = styled.Text`
  font-size: 14px;
  color: #999999;
  margin-right: 12px;
`;

const BoxOffice = ({navigation}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get(
        'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=44b818915a512b775f1986399059f4d4&targetDt=20210610&',
      )
      .then(response => {
        setList(response.data.boxOfficeResult.dailyBoxOfficeList);
      })
      .catch(err => alert(err.message));
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
              <MovieTitle>{movie.movieNm}</MovieTitle>
            </ListItem>
          );
        })}
      </Contents>
    </Container>
  );
};

export default BoxOffice;
