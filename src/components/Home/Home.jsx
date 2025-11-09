import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { api, endpoints } from 'api';
import { host } from '../../host';
import React, { useEffect, useMemo, useState } from 'react';
import RepoCard from '../Shared/RepoCard';
import { mapToRepo } from 'utilities/objectModels';
import Loading from '../Shared/Loading';
import { useNavigate, createSearchParams } from 'react-router';
import { sortByCriteria } from 'utilities/sortCriteria';
import {
  HOME_POPULAR_PAGE_SIZE,
  HOME_RECENT_PAGE_SIZE,
  HOME_BOOKMARKS_PAGE_SIZE,
  HOME_STARS_PAGE_SIZE
} from 'utilities/paginationConstants';
import { isEmpty } from 'lodash';
import NoDataComponent from 'components/Shared/NoDataComponent';

const GridWrapper = styled(Stack)({
  marginTop: 10,
  marginBottom: '5rem'
});

const SectionHeaderContainer = styled(Stack)(({ theme }) => ({
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  flexDirection: 'row',
  width: '100%',
  paddingTop: '1rem',
  marginBottom: '1rem'
}));

const SectionTitle = styled(Typography)({
  fontWeight: '700',
  color: '#0F2139',
  width: '100%',
  fontSize: '2rem',
  textAlign: 'center',
  lineHeight: '2.375rem',
  letterSpacing: '-0.01rem',
  marginLeft: '0.5rem'
});

const ViewAllText = styled(Typography)({
  color: '#52637A',
  fontWeight: '600',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  cursor: 'pointer',
  marginRight: '0.5rem'
});

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [popularData, setPopularData] = useState([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const [recentData, setRecentData] = useState([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(true);
  const [starData, setStarData] = useState([]);
  const [isLoadingStars, setIsLoadingStars] = useState(true);

  const navigate = useNavigate();
  const abortController = useMemo(() => new AbortController(), []);

  const getPopularData = () => {
    setIsLoadingPopular(true);
    api
      .get(
        `${host()}${endpoints.globalSearch({
          searchQuery: '',
          pageNumber: 1,
          pageSize: HOME_POPULAR_PAGE_SIZE,
          sortBy: sortByCriteria.downloads?.value
        })}`,
        abortController.signal
      )
      .then((response) => {
        if (response.data && response.data.data) {
          let repoList = response.data.data.GlobalSearch.Repos;
          let repoData = repoList.map((responseRepo) => {
            return mapToRepo(responseRepo);
          });
          setPopularData(repoData);
          setIsLoading(false);
          setIsLoadingPopular(false);
        }
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
        setIsLoadingPopular(false);
      });
  };

  const getRecentData = () => {
    setIsLoadingRecent(true);
    api
      .get(
        `${host()}${endpoints.globalSearch({
          searchQuery: '',
          pageNumber: 1,
          pageSize: HOME_RECENT_PAGE_SIZE,
          sortBy: sortByCriteria.updateTime?.value
        })}`,
        abortController.signal
      )
      .then((response) => {
        if (response.data && response.data.data) {
          let repoList = response.data.data.GlobalSearch.Repos;
          let repoData = repoList.map((responseRepo) => {
            return mapToRepo(responseRepo);
          });
          setRecentData(repoData);
          setIsLoading(false);
          setIsLoadingRecent(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setIsLoadingRecent(false);
        console.error(e);
      });
  };

  const getBookmarks = () => {
    setIsLoadingBookmarks(true);
    api
      .get(
        `${host()}${endpoints.globalSearch({
          searchQuery: '',
          pageNumber: 1,
          pageSize: HOME_BOOKMARKS_PAGE_SIZE,
          sortBy: sortByCriteria.relevance?.value,
          filter: { IsBookmarked: true }
        })}`,
        abortController.signal
      )
      .then((response) => {
        if (response.data && response.data.data) {
          let repoList = response.data.data.GlobalSearch.Repos;
          let repoData = repoList.map((responseRepo) => {
            return mapToRepo(responseRepo);
          });
          setBookmarkData(repoData);
          setIsLoading(false);
          setIsLoadingBookmarks(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setIsLoadingBookmarks(false);
        console.error(e);
      });
  };

  const getStars = () => {
    setIsLoadingStars(true);
    api
      .get(
        `${host()}${endpoints.globalSearch({
          searchQuery: '',
          pageNumber: 1,
          pageSize: HOME_STARS_PAGE_SIZE,
          sortBy: sortByCriteria.relevance?.value,
          filter: { IsStarred: true }
        })}`,
        abortController.signal
      )
      .then((response) => {
        if (response.data && response.data.data) {
          let repoList = response.data.data.GlobalSearch.Repos;
          let repoData = repoList.map((responseRepo) => {
            return mapToRepo(responseRepo);
          });
          setStarData(repoData);
          setIsLoading(false);
          setIsLoadingStars(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        setIsLoadingStars(false);
        console.error(e);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    getPopularData();
    getRecentData();
    getBookmarks();
    getStars();
    return () => {
      abortController.abort();
    };
  }, []);

  const handleClickViewAll = (type, value) => {
    navigate({ pathname: `/explore`, search: createSearchParams({ [type]: value }).toString() });
  };

  const isNoData = () =>
    !isLoading &&
    !isLoadingBookmarks &&
    !isLoadingStars &&
    !isLoadingPopular &&
    !isLoadingRecent &&
    bookmarkData.length === 0 &&
    starData.length === 0 &&
    popularData.length === 0 &&
    recentData.length === 0;

  const renderCards = (cardArray) => {
    return (
      cardArray &&
      cardArray.map((item, index) => {
        return (
          <RepoCard
            name={item.name}
            version={item.latestVersion}
            description={item.description}
            downloads={item.downloads}
            stars={item.stars}
            signatureInfo={item.signatureInfo}
            isBookmarked={item.isBookmarked}
            isStarred={item.isStarred}
            vendor={item.vendor}
            platforms={item.platforms}
            key={index}
            vulnerabilityData={{
              vulnerabilitySeverity: item.vulnerabiltySeverity,
              count: item.vulnerabilityCount
            }}
            lastUpdated={item.lastUpdated}
            logo={item.logo}
          />
        );
      })
    );
  };

  const renderContent = () => {
    return isNoData() === true ? (
      <NoDataComponent text="No images" />
    ) : (
      <GridWrapper alignItems="center">
        <SectionHeaderContainer sx={{ paddingTop: '3rem' }}>
          <div>
            <SectionTitle variant="h4" align="left">
              Most popular images
            </SectionTitle>
          </div>
          <div onClick={() => handleClickViewAll('sortby', sortByCriteria.downloads.value)}>
            <ViewAllText variant="body2">View all</ViewAllText>
          </div>
        </SectionHeaderContainer>
        {isLoadingPopular ? <Loading /> : renderCards(popularData, isLoadingPopular)}
        {/* currently most popular will be by downloads until stars are implemented */}
        <SectionHeaderContainer>
          <div>
            <SectionTitle variant="h4" align="left">
              Recently updated images
            </SectionTitle>
          </div>
          <div>
            <ViewAllText variant="body2" onClick={() => handleClickViewAll('sortby', sortByCriteria.updateTime.value)}>
              View all
            </ViewAllText>
          </div>
        </SectionHeaderContainer>
        {isLoadingRecent ? <Loading /> : renderCards(recentData, isLoadingRecent)}
        {!isEmpty(bookmarkData) && (
          <>
            <SectionHeaderContainer>
              <div>
                <SectionTitle variant="h4" align="left">
                  Bookmarks
                </SectionTitle>
              </div>
              <div>
                <ViewAllText variant="body2" onClick={() => handleClickViewAll('filter', 'IsBookmarked')}>
                  View all
                </ViewAllText>
              </div>
            </SectionHeaderContainer>
            {isLoadingBookmarks ? <Loading /> : renderCards(bookmarkData, isLoadingBookmarks)}
          </>
        )}
        {!isEmpty(starData) && (
          <>
            <SectionHeaderContainer>
              <div>
                <SectionTitle variant="h4" align="left">
                  Stars
                </SectionTitle>
              </div>
              <div>
                <ViewAllText variant="body2" onClick={() => handleClickViewAll('filter', 'IsStarred')}>
                  View all
                </ViewAllText>
              </div>
            </SectionHeaderContainer>
            {isLoadingStars ? <Loading /> : renderCards(starData, isLoadingStars)}
          </>
        )}
      </GridWrapper>
    );
  };

  return <>{isLoading ? <Loading /> : renderContent()}</>;
}

export default Home;
