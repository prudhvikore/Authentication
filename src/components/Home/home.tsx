import React from 'react'
import { useContext } from 'react'
import { LoginState } from '../../Context api/State'
import Header from "../Header/header"
import "./home.css"


const Home = () => {

  const user:any=useContext(LoginState)
  const firstLetter=user.user[0].toUpperCase()
  const remLetters=user.user.slice(1,user.user.length)
  const username=firstLetter+remLetters

  return (
    <>
      <Header/>
      <div className='container'>
        <div className='main'>
          <h1 className='home_heading'>Welcome {username}</h1>
          <div className='intro-video-mobile'>
          <iframe className='video' src="https://www.youtube.com/embed/AmMTYvujcJo"></iframe>
        </div>
          <p aria-label='details' className='details'>Pluralsight, LLC is an American privately held online education 
              company that offers a variety of video training courses for software 
              developers, IT administrators, and creative professionals through its 
              website.Founded in 2004 by Aaron Skonnard, Keith Brown, Fritz Onion, and Bill Williams,
              the company has its headquarters in Farmington, Utah. As of July 2018, it uses more than 
              1,400 subject-matter experts as authors, and offers more than 7,000 courses in its catalog. 
              Since first moving its courses online in 2007, the company has expanded, developing a full 
              enterprise platform, and adding skills assessment modules.
          </p>
          <button className="knowmore"><a className='anchor' href='https://www.pluralsight.com/product/skills?utm_term=&pslp=product-skills&aid=701j0000002BGhXAAW&promo=&utm_source=branded&utm_medium=digital_paid_search_google&utm_campaign=INDIA_Brand_E&utm_content=&cq_cmp=223387038&gclid=CjwKCAiAjs2bBhACEiwALTBWZed-3dtyv9OPIKF-Cl0QiFMSdyJSC6Y65YNVqnk4V7P1TjcR7bSeYBoCWTUQAvD_BwE' target="_blank">Know More</a> </button> 
        </div>
        <div className='intro-video'>
          <iframe className='video' src="https://www.youtube.com/embed/AmMTYvujcJo"></iframe>
        </div>
      </div>

    </>
    
  )
}

export default Home
