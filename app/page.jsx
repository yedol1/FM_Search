'use client'
import styled from 'styled-components'
import Layout from './layout'
import Header from './components/nav'

export default function Home() {
  return (
    <Layout>
      <Header />
      <Banner>
        <h2>
          <strong>P</strong>itch <strong>P</strong>uzzle <strong>P</strong>ick{' '}
          <br />
          Who am I ?
        </h2>
        <h3>
          다양한 선수 정보 중에서 자신이 원하는 선수를 찾아내는 것이 마치 퍼즐을
          풀어나가는 것처럼 <br />
          즐거운 경험이 되었으면 좋겠습니다.
        </h3>
      </Banner>
      <section>
        <h2>Search</h2>
      </section>
    </Layout>
  )
}

const Banner = styled.section`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin-top: 138px;
  h2 {
    margin-top: 44px;
    color: #fff;
    text-align: center;
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    strong {
      color: #238de9;
    }
  }
  h3 {
    margin-top: 40px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150.687%;
  }
`
