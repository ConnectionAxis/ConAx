import scroll from 'scroll';
import getDocument from 'scroll-doc';
import { addListener } from './utils/events';

document.addEventListener("DOMContentLoaded", function(e){
	wReady();
});

function wReady(e) {
	addListener(
		document.querySelector('.slide-index-nav'), 'click', 'a[href^="#slide-"]',
	    e => (e.preventDefault(), onSlideNav(e))
	);
	addListener(
		document, 'click', '#scroll-to-top',
	    e => (e.preventDefault(), onScrollToTop(e))
	);
	addListener(
		document.querySelector('#conax-sign'), 'click', '#conax-sign-submit',
	    e => (e.preventDefault(), onSignSubmit(e))
	);
	addListener(
		document.querySelector('#conax-sign'), 'keyup', '.conax-sign-input',
	    e => (e.preventDefault(), onSignInputChange(e))
	);
	document.addEventListener('scroll', onScroll);
}

const doc = getDocument();
const slides = Array.from(document.querySelectorAll('.slide'));

function onSlideNav(e) {
  const slide = document.querySelector(e.target.hash);
  const index = slides.indexOf(slide);
  scrollTo(slide, index+1, { duration: index * 400 });
}

function scrollTo(node, index, ...args) {
  scroll.top(doc, node.getBoundingClientRect().height*index, ...args);
}

function onScroll(e) {
	const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	const slideHeight = slides[0].offsetHeight;
	const toTop = document.getElementById("scroll-to-top");
	const social = document.getElementById("social-float");

	if( toTop ) {
		if( top > slideHeight-2 ) {
			toTop.classList.remove("hide");
		} else {
			toTop.classList.add("hide");
		}
	}

	if( social ) {
		if( top > slideHeight-2 ) {
			social.classList.remove("hide");
		} else {
			social.classList.add("hide");
		}
	}
}

function onScrollToTop(e) {
	scroll.top(doc, 0, { duration: 500 });
}

function onSignSubmit(e) {
	const inputs = document.getElementsByClassName("conax-sign-input");
	const submit = document.getElementById("conax-sign-submit");

	if( submit.classList.contains("ready") )
		return;

	var data = {};
	var valid = true;

	for (var i = 0; i < inputs.length; i++) {
		if( inputs[i].value.length == 0 ) {
			onSignInputChange({ target: inputs[i] });
			valid = false;
		} else {
			switch( inputs[i].name ) {
				case "email":
					if( ValidateEmail(inputs[i].value) ) {
						data[inputs[i].name] = inputs[i].value;
					} else {
						document.getElementById("sign-alert").classList.remove("hide");
						valid = false;
					}
					break;
				default:
					data[inputs[i].name] = inputs[i].value;
					break;
			}
		}
	}

	if( valid ) {
		document.getElementById("sign-alert").classList.add("hide");
		submit.classList.add("ready");
		submit.innerText = "Thank you for request!";
		console.info("[ConAx] Sign Up: email: %s, name: %s", data["email"], data["name"]);
	}
}

function onSignInputChange(e) {
	const trg = e.target;
	const label = trg.previousSibling;

	if( trg.value.length == 0 ) {
		label.classList.remove("hide");
	} else {
		label.classList.add("hide");
	}
}

function ValidateEmail(value) {
	return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
}