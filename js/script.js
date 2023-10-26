'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const opts = {
  articleSelector: '.post',
  titleSelector:'.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors.list'
};


function titleClickHandler(event) {
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
  for(const article of activeArticles) {
    article.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

}

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */

  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(opts.articleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {max: 0, min: 999999};
for(let tag in tags){
  console.log(tag + 'is used' + tags[tag] + 'times');
  if(tags[tag] > params.max){
    params.max = tags[tag];
  }
  if(tags[tag] < params.min){
    params.min = tags[tag];
  }
}
  return params;
}

function calculateTagClass(count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentege = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentege * (opts.cloudClassCount - 1) + 1 );
 return opts.cloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  const allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {


    /* find tags wrapper */

    const tagList = article.querySelector(opts.articleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log('articletagsarray:', articleTagsArray)

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray) {

      /* generate HTML of the link */

      const tagHTMLData = {id: 'tag-' + tag, title: tag};
      const tagHTML = templates.articleLink(tagHTMLData);



      /* add generated code to html variable */

      html = html + tagHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
      /* [NEW] add tag to allTags objecty */
         allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */

    tagList.innerHTML = html;

  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);
  const tagsParams = calculateTagsParams(allTags);

  console.log('tagsParams:', tagsParams)

  /* [NEW] create variable for all links HTML code */
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    const tagLinkHTML ='<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"> ' + tag + '</a></li>';

    console.log('taglinkHTML:', tagLinkHTML);

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  /* [NEW] add html form allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);

  console.log(tagList);
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href)
  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', ''); //#tag-sport -> sport

  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagLinks)
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for(const link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function calculateAuthorsParams(authors) {
  const params = {max: 0, min: 999999};
for(let author in authors){
  console.log(author + 'is used' + authors[author] + 'times');

  if(authors[author] > params.max){
    params.max = authors[author];
  }
  if(authors[author] < params.min){
    params.min = authors[author];
  }
}
  return params;
}

function calculateAuthorClass(count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentege = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentege * (opts.cloudClassCount - 1) + 1 );
 return opts.cloudClassPrefix + classNumber;
}
function generateAuthors(){
  let allAuthors = {};

  const articles = document.querySelectorAll(opts.articleSelector);

  for(let article of articles){

    const authorWrapper = article.querySelector(opts.articleAuthorSelector);

    let html = '';

    const authorName =  article.getAttribute('data-author');
    console.log('authorName:', authorName);

    const linkHTMLData = {id: 'data-author-' + authorName, title: authorName};
    const linkHTML = templates.articleLink(linkHTMLData);

    html = html + linkHTML;

    if(!allAuthors.hasOwnProperty(authorName)){

      allAuthors[authorName] = 1;
    } else {
      allAuthors[authorName]++;
    }
    authorWrapper.innerHTML = html;
  }

  const authorList = document.querySelector(opts.authorsListSelector);
  console.log('AuthorList:', authorList);

  const authorParams = calculateAuthorsParams(allAuthors);
  console.log('authorTagsParams:', authorParams);

  const allAuthorsData = {authors: []};



  for(let author in allAuthors){
    const authorLinkHTML = '<li><a href="#data-author-' + author + '"><span>' + author + ' (' + allAuthors[author] + ')' + '</span></a></li>';
    console.log('authorLinkHTML:', authorLinkHTML);

    allAuthorsData.authors.push({
      authorName: author,
      count: allAuthors[author],
      className: calculateAuthorClass(allAuthors[author], authorParams)
    });


  }

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

  generateAuthors();

  /**/ function authorClickHandler(event){
    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const author = href.replace('#data-author-', '');
    console.log(author);
    //#data-author-sport -> sport

    /* find all tag links with class active */

    /* START LOOP: for each active tag link */

      /* remove class active */

    /* END LOOP: for each active tag link */

    const activeAuthors = document.querySelectorAll('a.active[href^="#data-author-"]');

    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorNames = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorName of authorNames) {
      authorName.classList.add('active');
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    /* find all links to tags */
    const authors = document.querySelectorAll('a[href^="#data-author-"]');

    /* START LOOP: for each link */
    for(let author of authors) {
      /* add tagClickHandler as event listener for that link */
      author.addEventListener('click', authorClickHandler);
    }
    /* END LOOP: for each link */
  }

  addClickListenersToAuthors();


