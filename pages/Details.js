import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import moment from 'moment';
import fetch from '../net/fetch';

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
const Discription = styled.Text`
  margin: 4px 12px;
  font-size: 18px;
  line-height: 28px;
`;
const Back = styled.TouchableOpacity`
  height: 50px;
  padding: 12px;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
`;
const BackLabel = styled.Text`
  font-size: 18px;
  color: #0000cc;
`;
const Header = styled.View`
  height: 50px;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 1px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Details = ({route, navigation}) => {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    let url =
      'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=44b818915a512b775f1986399059f4d4';
    url += '&movieCd=' + route.params.movieCd;
    fetch(url)
      .then(data => {
        setInfo(data.movieInfoResult.movieInfo);
      })
      .catch(err => alert(err.message));
  }, []);
  return (
    <Container>
      <Header>
        <Back onPress={() => navigation.goBack()}>
          <BackLabel>Go Back</BackLabel>
        </Back>
        <HeaderTitle>Movie Details</HeaderTitle>
      </Header>
      <Contents>
        {info === null ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <>
            <Title>{info?.movieNm}</Title>
            <Discription>제작 년도: {info.prdtYear}년</Discription>
            <Discription>
              개봉 일:{' '}
              {moment(info.openDt, 'YYYYMMDD').format('YYYY년 MM월 DD일')}
            </Discription>
            <Discription>상영 시간: {info.showTm}분</Discription>
            <Discription>
              국가: {info.nations.map(item => item.nationNm).join(', ')}
            </Discription>
            <Discription>
              감독: {info.directors.map(item => item.peopleNm).join(', ')}
            </Discription>
            <Discription>
              출연진: {info.actors.map(item => item.peopleNm).join(', ')}
            </Discription>
          </>
        )}
      </Contents>
    </Container>
  );
};

export default Details;
