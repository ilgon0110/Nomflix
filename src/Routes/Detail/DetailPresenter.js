import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Helmet } from "react-helmet";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(5px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 20px;
`;

const Title = styled.span`
  display: block;
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 14px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const PreView = styled.a`
  font-size: 20px;
`;

const Imdb = styled.a`
  text-decoration: underline;
`;

const Logo = styled.div`
  background-image: url(${(props) => props.bgImage});
  background-position: left;
  background-size: 30%;
  background-repeat: no-repeat;
  height: 30%;
  width: 300px;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}
          {""} | Nomflix
        </title>
      </Helmet>
      <BackDrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../Assets/noPosterSmall.jpg").default
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genres, index) =>
                  index === result.genres.length - 1
                    ? genres.name
                    : `${genres.name} / `
                )}
            </Item>
            <Divider>·</Divider>
            <PreView
              href={`//www.youtube.com/watch?v=${
                result.videos.results.map((url) => url.key)[0]
              }`}
              target="_blank"
            >
              <span role="img" aria-label="video">
                📺
              </span>
            </PreView>
            <Divider>·</Divider>
            <Imdb
              href={
                result.imdb_id
                  ? `//www.imdb.com/title/${result.imdb_id}`
                  : result.homepage
              }
              target="_blank"
            >
              {result.imdb_id ? "IMDB Link" : "Homepage"}
            </Imdb>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Logo
            bgImage={`https://image.tmdb.org/t/p/original${
              result.production_companies.map((logo) => logo.logo_path)[0]
            }`}
          ></Logo>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
