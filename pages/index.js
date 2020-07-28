import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'

import { useQuery } from "@apollo/react-hooks";

// import Query from "../components/query";
import POSTS_QUERY from "../apollo/queries/posts/posts";
import withApollo from "../utils/apollo"
import { getSortedPostsData } from '../lib/posts'



function Home({ allPostsData }) {
  const { loading, data } = useQuery(POSTS_QUERY)
  if (loading || !data) {
    return <h1>loading...</h1>;
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        { data.posts.map(d => <h1>{d.Title}</h1>)}
        {console.log(data)}

        {/* <Query query={POSTS_QUERY}>
              {({ data: { posts } }) => {
                console.log({posts})
                return (
                  <h1>
                    
                    {posts[0].Title}
                  </h1>
                )
              }}
              </Query> */}
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <div>
              <li className={utilStyles.listItem} key={id}>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            </div>
            
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default withApollo(Home)