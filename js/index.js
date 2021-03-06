/**
 *  project from {{ https://www.youtube.com/watch?v=w9bVm7VLqTI }}
 */
//api requirment 
 /* Api KEY */
const APIKEY = '<YOUR APIKEY/>';
const PROXYURL = 'https://cors-anywhere.herokuapp.com/'
 /* Api catagory */
let catagory = "";
 /* Api url */
let APIURL = "";
 /* set Api title */
let title = ""

const menuicon = document.getElementById('menu');
let menuitem = document.querySelector('.navbar-menu');
// click function
menuicon.addEventListener('click', function(){
	if(menuitem.style.display == 'none'){
	    menuitem.style.display = 'block';
		
	} else {
	    menuitem.style.display = 'none'
		// menuitem.style.transition = ".3s linear"
	}
})

// window onload event
window.onload = (function(){
	category = "business";
	APIURL = `${PROXYURL}https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${APIKEY}`
	newsapi(APIURL);
	
	return APIURL;
})()


// tabs for news
const data_change = document.querySelector('#data-change').children;
Array.from(data_change).forEach(function(li){
	li.addEventListener('click', function(e){
        
		if(li.classList != "is-active"){
            let ActiveTab = document.querySelector(".tablinks.is-active");
			ActiveTab.classList.remove("is-active")
			li.classList.add("is-active")
			category = e.target.innerText
			APIURL = `${PROXYURL}https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${APIKEY}`  
		}
	    newsapi(APIURL)
	    return APIURL;
	})
})

// xhr data send function
let tabs_data = document.getElementById('tabs_data');
function newsapi(URL){
	const xhr = new XMLHttpRequest();

	// Open the object
	xhr.open('GET', URL, true);
	// What to do when response is ready
	xhr.onload = function () {
		if(this.status == 200){
			let json = JSON.parse(this.responseText)
			let articles = json.articles;
			// console.log(articles)
			let newshtml = "";
			articles.forEach(function(element){
                
				title = element.title
		
				if(element.description == null){
					element.description = element.title
				}
				// https://bulma.io/images/placeholders/256x256.png
				if(element.urlToImage == null){
					element.urlToImage = 'https://bulma.io/images/placeholders/256x256.png'
				}
				let news_card  = `
                    <div class="box">
                		<article class="media">
                			<div class="media-left">
                				<figure class="image is-128x128 ">
                					<img src="${element.urlToImage}" alt="IMAGE NOT FOUND" />
                				</figure>
                			</div>
                			<div class="media-content">
                				<div class="content">
                					<p>
                						<strong>${element.title}</strong><br>

										<small>${element.publishedAt}</small>
                						<br />
                						${element.description}
                					</p>
                				</div>
                				<nav class="level is-mobile">
                					<div class="level-left">
                						<a href="${element.url}"  target="__blank" class="level-item" aria-label="reply">
                							<span class="icon is-small">
                								<i class="fas fa-reply " icon-font-family aria-hidden="true"></i>
                							</span>
                						</a>
                					</div>
                				</nav>
                			</div>
                		</article>
                	</div>
                `;
				newshtml += news_card;
				
				// return title;
			})
			tabs_data.innerHTML = newshtml; 
		} else {
			console.log("new error accured")
		}
	}
	// send the request
	xhr.send();
}


