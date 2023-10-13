'use strict';

function titleClickHandler(event) {
  console.log('Link was clicked!');
  event.preventDefault();
  const clickedElement = this;

  /* [Done] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active')

  /* [Done] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');



  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector)

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle)

  /* add class 'active' to the correct article */

  console.log('clickedElement:', targetArticle);
  targetArticle.classList.add('active')

}

const links = document.querySelectorAll('.titles a');

console.log(links)

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks() {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelector(optArticleSelector);

  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute("id")

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    console.log(linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;
    console.log(html)
    
    const links = document.querySelectorAll('.titles a');

    console.log(links)

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  titleList.innerHTML = html;
}

generateTitleLinks();