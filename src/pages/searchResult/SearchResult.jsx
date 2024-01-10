import React, { useEffect, useState } from 'react'
import './style.scss'
import { fetchDataFromApi } from '../../utils/api';
import Spinner from '../../components/spinner/Spinner'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/movieCard/MovieCard'
import { useParams } from 'react-router-dom';
import PageNotFound from '../404/PageNotFound';

const SearchResult = () => {
  const [data,setData] = useState(null);
  const [pageNum,setPasgeNum] = useState(1);
  const [loading,setLoading] = useState(false);
  const {query} = useParams()

  const fetchInitialData = () => {
      setLoading(true);
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
          .then((res)=>{
            setData(res)
            setPasgeNum((prev)=> prev + 1)
            setLoading(false)
          })
  }

  const fetchNextPageData = () =>{
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res)=>{
          if(data?.results){
            setData({
              ...data,results:[...data.results,...res.results]
            })
          }else{
            setData(res)
          }
          setPasgeNum((prev)=> prev + 1)
      })
  }

  useEffect(()=>{
    setPasgeNum(1)
      fetchInitialData();
  },[query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      { !loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
            <div className="pageTitle">{`Search ${data.total_results>1 ? "results":"result"} for ${query}`}</div>
            <InfiniteScroll className='content' dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={data?.total_pages} loader={<Spinner/>}>
              {data?.results?.map((item,index)=>{
                  if(item.media_type === 'pearson') return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
              })}
            </InfiniteScroll>
            </>
          ):(
            <span> 
              <PageNotFound />
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult
