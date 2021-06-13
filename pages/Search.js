import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import Title from '../components/Title';
import Row from '../components/Row';
import ListItem from '../components/ListItem';
import MovieName from '../components/MovieName';

import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import {set} from 'lodash';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Input = styled.TextInput`
  flex: 1;
  border: 1px solid #e5e5e5;
  margin-left: 12px;
  padding: 0px 12px;
`;
const Button = styled.Button``;
const NoData = styled.View`
  margin-top: 28px;
  align-items: center;
`;
const Search = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [noData, setNoData] = useState(false);

  const search = useCallback(() => {
    let url =
      'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=44b818915a512b775f1986399059f4d4';
    url += '&movieNm=' + keyword;
    setIsLoading(true);
    axios
      .get(url)
      .then(response => {
        setList(response.data.movieListResult.movieList);
        if (response.data.movieListResult.movieList.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
        }
        setIsLoading(false);
      })
      .catch(err => alert(err));
    setKeyword('');
  }, [keyword]);

  return (
    <Container>
      <Title>Search</Title>
      <Row>
        <Input
          autoCorrect={false}
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />
        <Button title="Search" onPress={search} />
      </Row>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : noData ? (
        <NoData>
          <MovieName>No Result</MovieName>
        </NoData>
      ) : (
        list.map(movie => {
          return (
            <ListItem
              onPress={() => {
                navigation.navigate('Details', {
                  movieCd: movie.movieCd,
                });
              }}
              key={movie.movieCd}>
              <MovieName>{movie.movieNm}</MovieName>
            </ListItem>
          );
        })
      )}
    </Container>
  );
};

export default Search;
